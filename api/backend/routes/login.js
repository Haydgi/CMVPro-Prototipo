import express from "express";
import db from "../database/connection.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/login", (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ mensagem: "Email e senha são obrigatórios." });
  }

  const query = "SELECT * FROM usuario WHERE Email = ?";
  
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error("Erro ao consultar o banco de dados:", err);
      return res.status(500).json({ mensagem: "Erro no servidor." });
    }

    if (results.length === 0) {
      return res.status(401).json({ mensagem: "Email ou senha incorretos." });
    }

    const usuario = results[0];

    try {
      const senhaCorreta = await bcrypt.compare(senha, usuario.Senha);
      if (!senhaCorreta) {
        return res.status(401).json({ mensagem: "Email ou senha incorretos." });
      }

      //  Login bem-sucedido
      return res.status(200).json({
        mensagem: "Login realizado com sucesso!",
        usuario: {
          id: usuario.ID_Usuario,
          nome: usuario.Nome_Usuario,
          email: usuario.Email
        }
      });
    } catch (bcryptError) {
      console.error("Erro ao comparar senha:", bcryptError);
      return res.status(500).json({ mensagem: "Erro no servidor." });
    }
  });
});

export default router;
