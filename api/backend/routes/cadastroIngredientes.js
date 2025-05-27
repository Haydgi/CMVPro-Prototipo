import express from 'express';
import db from "../database/connection.js";
  // ajuste o caminho conforme onde está seu arquivo de conexão com o banco

const router = express.Router();

// ✅ Rota para cadastrar ingrediente
router.post('/ingredientes', async (req, res) => {
  const { ID_Usuario, nome, descricao, unidadeDeMedida, custo, indiceDeDesperdicio } = req.body;

  if (!ID_Usuario || !nome || !unidadeDeMedida || !custo) {
    return res.status(400).json({ error: 'Campos obrigatórios faltando' });
  }

  try {
    await db.query(`
      INSERT INTO ingredientes 
      (ID_Usuario, Nome_Ingrediente, Descrição, Unidade_De_Medida, Custo_Ingrediente, Data_Ingrediente, Indice_de_Desperdicio) 
      VALUES (?, ?, ?, ?, ?, NOW(), ?)`,
      [ID_Usuario, nome, descricao, unidadeDeMedida, custo, indiceDeDesperdicio]
    );

    res.status(201).json({ message: 'Ingrediente cadastrado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cadastrar ingrediente' });
  }
});

// ✅ Rota para atualizar ingrediente
router.put('/ingredientes/:id', async (req, res) => {
  const { ID_Usuario, nome, descricao, unidadeDeMedida, custo, indiceDeDesperdicio } = req.body;
  const { id } = req.params;

  if (!ID_Usuario || !nome || !unidadeDeMedida || !custo) {
    return res.status(400).json({ error: 'Campos obrigatórios faltando' });
  }

  try {
    const [result] = await db.query(`
      UPDATE ingredientes
      SET 
        ID_Usuario = ?,
        Nome_Ingrediente = ?,
        Descrição = ?,
        Unidade_De_Medida = ?,
        Custo_Ingrediente = ?,
        Indice_de_Desperdicio = ?
      WHERE ID_Ingredientes = ?`,
      [ID_Usuario, nome, descricao, unidadeDeMedida, custo, indiceDeDesperdicio, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Ingrediente não encontrado' });
    }

    res.status(200).json({ message: 'Ingrediente atualizado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar ingrediente' });
  }
});

export default router;
