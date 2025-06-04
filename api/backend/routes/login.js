import express from "express";
import db from "../database/connection.js"; // seu pool mysql2/promise
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ mensagem: "Email e senha são obrigatórios." });
  }

  try {
    // Query usando await e destructuring do resultado
    const [results] = await db.query("SELECT * FROM usuario WHERE Email = ?", [email]);

    if (results.length === 0) {
      return res.status(401).json({ mensagem: "Email ou senha incorretos." });
    }

    const usuario = results[0];

    // Comparação da senha com bcrypt
    const senhaCorreta = await bcrypt.compare(senha, usuario.Senha);
    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: "Email ou senha incorretos." });
    }

    // Gerar token JWT
    const token = jwt.sign(
      { ID_Usuario: usuario.ID_Usuario, email: usuario.Email },
      process.env.SECRET_JWT,
      { expiresIn: '1h' }
    );

    console.log('Token criado:', token);
    console.log('Payload do token:', jwt.decode(token));

    // Retornar sucesso com token e dados do usuário
    return res.status(200).json({
      mensagem: "Login realizado com sucesso!",
      token,
      usuario: {
        id: usuario.ID_Usuario,
        nome: usuario.Nome_Usuario,
        email: usuario.Email
      }
    });

  } catch (err) {
    console.error("Erro ao consultar o banco de dados:", err);
    return res.status(500).json({ mensagem: "Erro no servidor." });
  }
});

export default router;
