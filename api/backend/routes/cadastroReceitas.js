import express from 'express';
import jwt from 'jsonwebtoken';
import db from '../database/connection.js';
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
  porcentagemInvalida: 'Porcentagem de lucro deve ser um número positivo',
  arquivoInvalido: 'Apenas imagens JPG, JPEG e PNG são permitidas'
};

// Middleware de autenticação JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: MSGS.tokenNaoFornecido });

  jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
    if (err) return res.status(403).json({ error: MSGS.tokenInvalido });
    if (!decoded || !decoded.ID_Usuario)
      return res.status(403).json({ error: 'Token malformado - ID_Usuario não encontrado' });

    req.usuario = { ID_Usuario: decoded.ID_Usuario };
    next();
  });
}

// Configuração multer para upload de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const nomeArquivo = `${Date.now()}_${file.originalname.replace(/\s+/g, '_')}`;
    cb(null, nomeArquivo);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) cb(null, true);
    else cb(new Error(MSGS.arquivoInvalido));
  }
});

// POST / - Cadastrar receita
router.post('/', authenticateToken, upload.single('imagem_URL'), async (req, res) => {
  try {
    let {
      Nome_Receita,
      Descricao,
      Tempo_Preparo,
      Custo_Total_Ingredientes,
      Porcentagem_De_Lucro,
      Categoria
    } = req.body;

    const ID_Usuario = req.usuario.ID_Usuario;

    // Validação campos obrigatórios
    if (!Nome_Receita || !Descricao || Tempo_Preparo === undefined ||
      Custo_Total_Ingredientes === undefined || Porcentagem_De_Lucro === undefined) {

      const details = {
        Nome_Receita: !Nome_Receita ? 'Campo obrigatório' : undefined,
        Descricao: !Descricao ? 'Campo obrigatório' : undefined,
        Tempo_Preparo: Tempo_Preparo === undefined ? 'Campo obrigatório' : undefined,
        Custo_Total_Ingredientes: Custo_Total_Ingredientes === undefined ? 'Campo obrigatório' : undefined,
        Porcentagem_De_Lucro: Porcentagem_De_Lucro === undefined ? 'Campo obrigatório' : undefined
      };

      // Gera mensagem amigável
      const camposFaltando = Object.entries(details)
        .filter(([_, v]) => v)
        .map(([k, _]) => k)
        .join(', ');

      // LOG NO TERMINAL
      console.error(
        `[ERRO CADASTRO RECEITA] Campos obrigatórios faltando: ${camposFaltando || 'nenhum'}, detalhes:`,
        details
      );

      return res.status(400).json({
        error: MSGS.camposFaltando,
        message: camposFaltando
          ? `Os seguintes campos obrigatórios estão faltando ou inválidos: ${camposFaltando}`
          : MSGS.camposFaltando,
        details
      });
    }

    // Tratar custo vazio string
    if (Custo_Total_Ingredientes === '') Custo_Total_Ingredientes = '0';

    // Conversão e validação numérica
    Tempo_Preparo = parseInt(Tempo_Preparo);
    Custo_Total_Ingredientes = parseFloat(Custo_Total_Ingredientes);
    Porcentagem_De_Lucro = parseFloat(Porcentagem_De_Lucro);

    if (isNaN(Tempo_Preparo) || Tempo_Preparo <= 0) return res.status(400).json({ error: MSGS.tempoInvalido });
    if (isNaN(Custo_Total_Ingredientes) || Custo_Total_Ingredientes < 0) return res.status(400).json({ error: MSGS.custoInvalido });
    if (isNaN(Porcentagem_De_Lucro) || Porcentagem_De_Lucro < 0) return res.status(400).json({ error: MSGS.porcentagemInvalida });

    const imagem_URL = req.file ? req.file.filename : '';

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
    }
    return res.status(500).json({ error: MSGS.erroCadastro });
  } catch (error) {
    console.error('Erro ao cadastrar receita:', error);
    return res.status(500).json({ error: MSGS.erroCadastro, details: error.message });
  }
});

// GET /?search= - Buscar receitas do usuário com filtro de pesquisa
router.get('/', authenticateToken, async (req, res) => {
  const ID_Usuario = req.usuario.ID_Usuario;
  const search = req.query.search ? `%${req.query.search.toLowerCase()}%` : null;

  try {
    let query = `
      SELECT ID_Receita, Nome_Receita, Descricao, Tempo_Preparo,
             Custo_Total_Ingredientes, Porcentagem_De_Lucro,
             Categoria, imagem_URL, Data_Receita
      FROM receitas
      WHERE ID_Usuario = ?
    `;
    let params = [ID_Usuario];

    if (search) {
      console.log("Aplicando filtro de busca:", search);
      query += ` AND (LOWER(Nome_Receita) LIKE ? OR LOWER(Descricao) LIKE ?)`;
      params.push(search, search);
    } else {
      console.log("Sem filtro de busca, trazendo tudo.");
    }

    console.log("Query final:", query);
    console.log("Parâmetros:", params);

    query += ` ORDER BY Data_Receita DESC`;

    const [rows] = await db.query(query, params);

    const receitasComPreco = rows.map(receita => ({
      ...receita,
      Preco_Venda: +(receita.Custo_Total_Ingredientes * (1 + receita.Porcentagem_De_Lucro / 100)).toFixed(2)
    }));

    return res.status(200).json(receitasComPreco);
  } catch (error) {
    console.error('Erro ao buscar receitas:', error);
    return res.status(500).json({ error: 'Erro ao buscar receitas', details: error.message });
  }
});

// DELETE /:id - Excluir receita
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const ID_Usuario = req.usuario.ID_Usuario;
  const idNum = Number(id);

  if (isNaN(idNum) || idNum <= 0) return res.status(400).json({ error: MSGS.idInvalido });

  try {
    const [rows] = await db.query(`SELECT ID_Usuario, imagem_URL FROM receitas WHERE ID_Receita = ?`, [idNum]);

    if (rows.length === 0) return res.status(404).json({ error: MSGS.receitaNaoEncontrada });
    if (rows[0].ID_Usuario !== ID_Usuario) return res.status(403).json({ error: MSGS.naoAutorizado });

    if (rows[0].imagem_URL) {
      const caminhoImagem = path.join(__dirname, '../uploads', rows[0].imagem_URL);
      try {
        await fs.unlink(caminhoImagem);
        console.log('Imagem excluída:', caminhoImagem);
      } catch (err) {
        console.warn('Falha ao excluir imagem:', err.message);
      }
    }

    const [result] = await db.query(`DELETE FROM receitas WHERE ID_Receita = ?`, [idNum]);

    if (result.affectedRows === 1) {
      return res.status(200).json({ message: 'Receita excluída com sucesso', ID_Receita: idNum });
    }
    return res.status(500).json({ error: MSGS.erroExcluir });
  } catch (error) {
    console.error('Erro ao excluir receita:', error);
    return res.status(500).json({ error: MSGS.erroExcluir, details: error.message });
  }
});

// PUT /:id - Atualizar receita
router.put('/:id', authenticateToken, upload.single('imagem_URL'), async (req, res) => {
  const { id } = req.params;
  const ID_Usuario = req.usuario.ID_Usuario;
  const idNum = Number(id);

  if (isNaN(idNum) || idNum <= 0) return res.status(400).json({ error: MSGS.idInvalido });

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

  Tempo_Preparo = parseInt(Tempo_Preparo);
  Custo_Total_Ingredientes = parseFloat(Custo_Total_Ingredientes);
  Porcentagem_De_Lucro = parseFloat(Porcentagem_De_Lucro);

  if (isNaN(Tempo_Preparo) || Tempo_Preparo <= 0) return res.status(400).json({ error: MSGS.tempoInvalido });
  if (isNaN(Custo_Total_Ingredientes) || Custo_Total_Ingredientes < 0) return res.status(400).json({ error: MSGS.custoInvalido });
  if (isNaN(Porcentagem_De_Lucro) || Porcentagem_De_Lucro < 0) return res.status(400).json({ error: MSGS.porcentagemInvalida });

  try {
    const [rows] = await db.query(`SELECT ID_Usuario, imagem_URL FROM receitas WHERE ID_Receita = ?`, [idNum]);

    if (rows.length === 0) return res.status(404).json({ error: MSGS.receitaNaoEncontrada });
    if (rows[0].ID_Usuario !== ID_Usuario) return res.status(403).json({ error: MSGS.naoAutorizado });

    let imagem_URL = rows[0].imagem_URL || '';

    if (req.file) {
      if (imagem_URL) {
        const caminhoImagemAntiga = path.join(__dirname, '../uploads', imagem_URL);
        try {
          await fs.unlink(caminhoImagemAntiga);
        } catch (err) {
          console.warn('Falha ao excluir imagem antiga:', err.message);
        }
      }
      imagem_URL = req.file.filename;
    }

    const [result] = await db.query(`
      UPDATE receitas SET 
        Nome_Receita = ?, 
        Descricao = ?, 
        Tempo_Preparo = ?, 
        Custo_Total_Ingredientes = ?, 
        Porcentagem_De_Lucro = ?, 
        Categoria = ?, 
        imagem_URL = ?
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
    }
    return res.status(500).json({ error: MSGS.erroAtualizar });
  } catch (error) {
    console.error('Erro ao atualizar receita:', error);
    return res.status(500).json({ error: MSGS.erroAtualizar, details: error.message });
  }
});

export default router;
