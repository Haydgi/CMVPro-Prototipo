import express from "express";
import db from "../database/connection.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/cadastrar", async (req, res) => {
  console.log("Requisição recebida:", req.body); // <- AJUDA MUITO

  const { nome, email, telefone, senha } = req.body;

  if (!nome || !email || !telefone || !senha) {
    return res.status(400).json({ mensagem: "Preencha todos os campos." });
  }

  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const query = `
      INSERT INTO usuario (Nome_Usuario, Email, Telefone, Senha)
      VALUES (?, ?, ?, ?)
    `;

    db.query(query, [nome, email, telefone, senhaCriptografada], (err, result) => {
      if (err) {
        console.error("Erro ao inserir no banco:", err); // <- ESSENCIAL
        return res.status(500).json({ mensagem: "Erro no servidor ao cadastrar usuário." });
      }

      return res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });
    });
  } catch (error) {
    console.error("Erro ao processar dados:", error); // <- ESSENCIAL
    return res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
});

export default router;
