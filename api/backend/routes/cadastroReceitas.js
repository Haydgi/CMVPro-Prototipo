import express from 'express';
import jwt from 'jsonwebtoken';
import db from "../database/connection.js";

const router = express.Router();

const MSGS = {
  camposFaltando: 'Campos obrigatórios faltando',
  erroCadastro: 'Erro ao cadastrar ingrediente',
  erroAtualizar: 'Erro ao atualizar ingrediente',
  erroExcluir: 'Erro ao excluir ingrediente',
  ingredienteNaoEncontrado: 'Ingrediente não encontrado',
  naoAutorizado: 'Não autorizado a alterar este ingrediente',
  tokenNaoFornecido: 'Token não fornecido',
  tokenInvalido: 'Token inválido',
  idInvalido: 'ID inválido',
};

// Middleware de autenticação JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: MSGS.tokenNaoFornecido });
  }

  jwt.verify(token, process.env.SECRET_JWT, (err, usuario) => {
    if (err) {
      return res.status(403).json({ error: MSGS.tokenInvalido });
    }
    req.usuario = usuario;
    next();
  });
}

// POST - Cadastrar ingrediente (protegida)
router.post('/', authenticateToken, async (req, res) => {
  const {
    nome,
    unidadeDeMedida,
    custo,
    indiceDeDesperdicio,
    categoria
  } = req.body;

  const ID_Usuario = req.usuario.ID_Usuario;

  if (!nome || !unidadeDeMedida || custo === undefined || custo === null) {
    return res.status(400).json({ error: MSGS.camposFaltando });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO ingredientes
        (Nome_Ingrediente, Unidade_De_Medida, Custo_Ingrediente, Indice_de_Desperdicio, Categoria, ID_Usuario, Data_Ingrediente)
        VALUES (?, ?, ?, ?, ?, ?, NOW())`,
      [
        nome,
        unidadeDeMedida,
        custo,
        indiceDeDesperdicio || null,
        categoria || null,
        ID_Usuario
      ]
    );

    if (result.affectedRows === 1) {
      res.status(201).json({
        id: result.insertId,
        nome,
        unidadeDeMedida,
        custo,
        indiceDeDesperdicio: indiceDeDesperdicio || null,
        categoria: categoria || null
      });
    } else {
      res.status(500).json({ error: MSGS.erroCadastro });
    }
  } catch (error) {
    console.error('Erro ao cadastrar ingrediente:', error);
    res.status(500).json({ error: MSGS.erroCadastro });
  }
});

// GET - Listar ingredientes do usuário logado (protegida)
router.get('/', authenticateToken, async (req, res) => {
  const ID_Usuario = req.usuario.ID_Usuario;

  try {
    const [rows] = await db.query(
      `SELECT ID_Ingredientes, Nome_Ingrediente, Unidade_De_Medida, Custo_Ingrediente, Indice_de_Desperdicio, Categoria, Data_Ingrediente
       FROM ingredientes
       WHERE ID_Usuario = ?`,
      [ID_Usuario]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error('Erro ao buscar ingredientes:', error);
    res.status(500).json({ error: 'Erro ao buscar ingredientes' });
  }
});

// PUT - Atualizar ingrediente (protegida)
router.put('/:id', authenticateToken, async (req, res) => {
  const {
    nome,
    unidadeDeMedida,
    custo,
    indiceDeDesperdicio,
    categoria
  } = req.body;

  const { id } = req.params;
  const ID_Usuario = req.usuario.ID_Usuario;

  const idNum = Number(id);
  if (isNaN(idNum)) {
    return res.status(400).json({ error: MSGS.idInvalido });
  }

  if (!nome || !unidadeDeMedida || custo === undefined || custo === null) {
    return res.status(400).json({ error: MSGS.camposFaltando });
  }

  try {
    const [rows] = await db.query(
      `SELECT ID_Usuario FROM ingredientes WHERE ID_Ingredientes = ?`,
      [idNum]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: MSGS.ingredienteNaoEncontrado });
    }

    if (rows[0].ID_Usuario !== ID_Usuario) {
      return res.status(403).json({ error: MSGS.naoAutorizado });
    }

    await db.query(
      `UPDATE ingredientes
       SET Nome_Ingrediente = ?, Unidade_De_Medida = ?, 
           Custo_Ingrediente = ?, Indice_de_Desperdicio = ?, Categoria = ?
       WHERE ID_Ingredientes = ?`,
      [
        nome,
        unidadeDeMedida,
        custo,
        indiceDeDesperdicio || null,
        categoria || null,
        idNum
      ]
    );

    res.status(200).json({ message: 'Ingrediente atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar ingrediente:', error);
    res.status(500).json({ error: MSGS.erroAtualizar });
  }
});

// DELETE - Excluir ingrediente (protegida)
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const ID_Usuario = req.usuario.ID_Usuario;

  const idNum = Number(id);
  if (isNaN(idNum)) {
    return res.status(400).json({ error: MSGS.idInvalido });
  }

  try {
    const [rows] = await db.query(
      `SELECT ID_Usuario FROM ingredientes WHERE ID_Ingredientes = ?`,
      [idNum]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: MSGS.ingredienteNaoEncontrado });
    }

    if (rows[0].ID_Usuario !== ID_Usuario) {
      return res.status(403).json({ error: MSGS.naoAutorizado });
    }

    await db.query(
      `DELETE FROM ingredientes WHERE ID_Ingredientes = ?`,
      [idNum]
    );

    res.status(200).json({ message: 'Ingrediente excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir ingrediente:', error);
    res.status(500).json({ error: MSGS.erroExcluir });
  }
});

export default router;
