import express from 'express';
import jwt from 'jsonwebtoken';
import db from "../database/connection.js";
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

// Para funcionar com ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const MSGS = {
  camposFaltando: 'Campos obrigatórios faltando',
  erroCadastro: 'Erro ao cadastrar receita',
  erroAtualizar: 'Erro ao atualizar receita',
  erroExcluir: 'Erro ao excluir receita',
  receitaNaoEncontrada: 'Receita não encontrada',
  naoAutorizado: 'Não autorizado a alterar esta receita',
  tokenNaoFornecido: 'Token não fornecido',
  tokenInvalido: 'Token inválido',
  idInvalido: 'ID inválido',
  tempoInvalido: 'Tempo de preparo deve ser um número positivo',
  custoInvalido: 'Custo deve ser um número positivo',
  porcentagemInvalida: 'Porcentagem de lucro deve ser um número positivo'
};

// Middleware de autenticação JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log('Token recebido:', token);

  if (!token) return res.status(401).json({ error: MSGS.tokenNaoFornecido });

  jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
    if (err) {
      console.error('Erro na verificação do token:', err.message);
      return res.status(403).json({ error: MSGS.tokenInvalido });
    }
    if (!decoded || !decoded.ID_Usuario) {
      return res.status(403).json({ error: 'Token malformado - ID_Usuario não encontrado' });
    }
    req.usuario = { ID_Usuario: decoded.ID_Usuario };
    next();
  });
}

// Configuração do multer para salvar em disco, limitando o tamanho e tipos permitidos (exemplo png/jpg)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const nomeArquivo = `${Date.now()}_${file.originalname.replace(/\s+/g, '_')}`;
    cb(null, nomeArquivo);
  }
});
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // limite 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Apenas imagens JPG, JPEG e PNG são permitidas'));
    }
  }
});

// Rota de cadastro de receita
router.post('/', authenticateToken, upload.single('imagem_URL'), async (req, res) => {
  let {
    Nome_Receita,
    Descricao,
    Tempo_Preparo,
    Custo_Total_Ingredientes,
    Porcentagem_De_Lucro,
    Categoria
  } = req.body;

  const ID_Usuario = req.usuario.ID_Usuario;

  // Validação de campos obrigatórios
  if (!Nome_Receita || !Descricao || Tempo_Preparo === undefined || 
      Custo_Total_Ingredientes === undefined || Porcentagem_De_Lucro === undefined) {
    return res.status(400).json({ 
      error: MSGS.camposFaltando,
      details: {
        Nome_Receita: !Nome_Receita ? 'Campo obrigatório' : undefined,
        Descricao: !Descricao ? 'Campo obrigatório' : undefined,
        Tempo_Preparo: Tempo_Preparo === undefined ? 'Campo obrigatório' : undefined,
        Custo_Total_Ingredientes: Custo_Total_Ingredientes === undefined ? 'Campo obrigatório' : undefined,
        Porcentagem_De_Lucro: Porcentagem_De_Lucro === undefined ? 'Campo obrigatório' : undefined
      }
    });
  }

  // Tratamento para custo vazio (string vazia) — converte para '0'
  if (Custo_Total_Ingredientes === '') {
    Custo_Total_Ingredientes = '0';
  }

  // Conversão e validação de valores numéricos
  Tempo_Preparo = parseInt(Tempo_Preparo);
  Custo_Total_Ingredientes = parseFloat(Custo_Total_Ingredientes);
  Porcentagem_De_Lucro = parseFloat(Porcentagem_De_Lucro);

  if (isNaN(Tempo_Preparo) || Tempo_Preparo <= 0) 
    return res.status(400).json({ error: MSGS.tempoInvalido });

  if (isNaN(Custo_Total_Ingredientes) || Custo_Total_Ingredientes < 0) 
    return res.status(400).json({ error: MSGS.custoInvalido });

  if (isNaN(Porcentagem_De_Lucro) || Porcentagem_De_Lucro < 0) 
    return res.status(400).json({ error: MSGS.porcentagemInvalida });

  // Pega o nome do arquivo salvo pelo multer
  let imagem_URL = req.file ? req.file.filename : null;

  try {
    const [result] = await db.query(`
      INSERT INTO receitas (
        ID_Usuario, Nome_Receita, Descricao, Tempo_Preparo,
        Custo_Total_Ingredientes, Porcentagem_De_Lucro, Categoria, imagem_URL, Data_Receita
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `, [
      ID_Usuario,
      Nome_Receita,
      Descricao,
      Tempo_Preparo,
      Custo_Total_Ingredientes,
      Porcentagem_De_Lucro,
      Categoria || null,
      imagem_URL
    ]);

    if (result.affectedRows === 1) {
      return res.status(201).json({
        ID_Receita: result.insertId,
        ID_Usuario,
        Nome_Receita,
        Descricao,
        Tempo_Preparo,
        Custo_Total_Ingredientes,
        Porcentagem_De_Lucro,
        Categoria,
        imagem_URL,
        message: 'Receita cadastrada com sucesso'
      });
    } else {
      return res.status(500).json({ error: MSGS.erroCadastro });
    }
  } catch (error) {
    console.error('Erro ao cadastrar receita:', error);
    return res.status(500).json({ error: MSGS.erroCadastro, details: error.message });
  }
});

// Rota para obter receitas
router.get('/', authenticateToken, async (req, res) => {
  const ID_Usuario = req.usuario.ID_Usuario;

  try {
    const [rows] = await db.query(`
      SELECT ID_Receita, Nome_Receita, Descricao, Tempo_Preparo,
             Custo_Total_Ingredientes, Porcentagem_De_Lucro,
             Categoria, imagem_URL, Data_Receita
      FROM receitas
      WHERE ID_Usuario = ?
      ORDER BY Data_Receita DESC
    `, [ID_Usuario]);

    const receitasComPreco = rows.map(receita => ({
      ...receita,
      Preco_Venda: receita.Custo_Total_Ingredientes * (1 + receita.Porcentagem_De_Lucro / 100)
    }));

    return res.status(200).json(receitasComPreco);
  } catch (error) {
    console.error('Erro ao buscar receitas:', error);
    return res.status(500).json({ error: 'Erro ao buscar receitas', details: error.message });
  }
});

// Rota DELETE para excluir receita
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const ID_Usuario = req.usuario.ID_Usuario;

  const idNum = Number(id);
  if (isNaN(idNum) || idNum <= 0) {
    return res.status(400).json({ error: MSGS.idInvalido });
  }

  try {
    // Verifica se a receita existe e pertence ao usuário
    const [rows] = await db.query(
      `SELECT ID_Usuario FROM receitas WHERE ID_Receita = ?`,
      [idNum]
    );

   if (rows.length === 0) {
  return res.status(404).json({ error: MSGS.receitaNaoEncontrada });
}

if (rows[0].ID_Usuario !== ID_Usuario) {
  return res.status(403).json({ error: MSGS.naoAutorizado });
}

const [result] = await db.query(
  `DELETE FROM receitas WHERE ID_Receita = ?`,
  [idNum]
);

if (result.affectedRows === 1) {
  res.status(200).json({ 
    message: 'Receita excluída com sucesso',
    ID_Receita: idNum
  });
} else {
  res.status(500).json({ error: MSGS.erroExcluir });
}
  } catch (error) {  if (rows.length === 0) {
    return res.status(404).json({ error: MSGS.receitaNaoEncontrada });
  }
  
  if (rows[0].ID_Usuario !== ID_Usuario) {
    return res.status(403).json({ error: MSGS.naoAutorizado });
  }
  
  const [result] = await db.query(
    `DELETE FROM receitas WHERE ID_Receita = ?`,
    [idNum]
  );
  
  if (result.affectedRows === 1) {
    res.status(200).json({ 
      message: 'Receita excluída com sucesso',
      ID_Receita: idNum
    });
  } else {
    res.status(500).json({ error: MSGS.erroExcluir });
  }
    console.error('Erro ao excluir receita:', error);
    res.status(500).json({ 
      error: MSGS.erroExcluir,
      details: error.message 
    });
  }
});

// Rota PUT para atualizar receita (com upload opcional da imagem)
router.put('/:id', authenticateToken, upload.single('imagem_URL'), async (req, res) => {
  const { id } = req.params;
  const ID_Usuario = req.usuario.ID_Usuario;

  const idNum = Number(id);
  if (isNaN(idNum) || idNum <= 0) {
    return res.status(400).json({ error: MSGS.idInvalido });
  }

  let {
    Nome_Receita,
    Descricao,
    Tempo_Preparo,
    Custo_Total_Ingredientes,
    Porcentagem_De_Lucro,
    Categoria
  } = req.body;

  if (!Nome_Receita || !Descricao || Tempo_Preparo === undefined ||
      Custo_Total_Ingredientes === undefined || Porcentagem_De_Lucro === undefined) {
    return res.status(400).json({ error: MSGS.camposFaltando });
  }

  if (Custo_Total_Ingredientes === '') {
    Custo_Total_Ingredientes = '0';
  }

  Tempo_Preparo = parseInt(Tempo_Preparo);
  Custo_Total_Ingredientes = parseFloat(Custo_Total_Ingredientes);
  Porcentagem_De_Lucro = parseFloat(Porcentagem_De_Lucro);

  if (isNaN(Tempo_Preparo) || Tempo_Preparo <= 0) 
    return res.status(400).json({ error: MSGS.tempoInvalido });

  if (isNaN(Custo_Total_Ingredientes) || Custo_Total_Ingredientes < 0) 
    return res.status(400).json({ error: MSGS.custoInvalido });

  if (isNaN(Porcentagem_De_Lucro) || Porcentagem_De_Lucro < 0) 
    return res.status(400).json({ error: MSGS.porcentagemInvalida });

  try {
    // Verificar propriedade e obter imagem antiga
    const [rows] = await db.query('SELECT ID_Usuario, imagem_URL FROM receitas WHERE ID_Receita = ?', [idNum]);
    if (rows.length === 0) return res.status(404).json({ error: MSGS.receitaNaoEncontrada });
    if (rows[0].ID_Usuario !== ID_Usuario) return res.status(403).json({ error: MSGS.naoAutorizado });

    // Se uma nova imagem foi enviada, remover a antiga
    let imagem_URL = rows[0].imagem_URL;
    if (req.file) {
      // Excluir a antiga imagem
      if (imagem_URL) {
        const caminhoImagemAntiga = path.join(__dirname, '../uploads', imagem_URL);
        try {
          await fs.unlink(caminhoImagemAntiga);
          console.log('Imagem antiga excluída:', caminhoImagemAntiga);
        } catch (err) {
          console.warn('Falha ao excluir imagem antiga:', err.message);
        }
      }
      imagem_URL = req.file.filename;
    }

    // Atualizar dados no banco
    const [result] = await db.query(`
      UPDATE receitas
      SET Nome_Receita = ?, Descricao = ?, Tempo_Preparo = ?,
          Custo_Total_Ingredientes = ?, Porcentagem_De_Lucro = ?,
          Categoria = ?, imagem_URL = ?
      WHERE ID_Receita = ?
    `, [
      Nome_Receita,
      Descricao,
      Tempo_Preparo,
      Custo_Total_Ingredientes,
      Porcentagem_De_Lucro,
      Categoria || null,
      imagem_URL,
      idNum
    ]);

    if (result.affectedRows === 1) {
      return res.status(200).json({ message: 'Receita atualizada com sucesso' });
    } else {
      return res.status(500).json({ error: MSGS.erroAtualizar });
    }
  } catch (error) {
    console.error('Erro ao atualizar receita:', error);
    return res.status(500).json({ error: MSGS.erroAtualizar, details: error.message });
  }
});

export default router;
