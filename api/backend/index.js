import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cadastroRoutes from "./routes/CadastroUsuario.js";
import loginRoutes from "./routes/login.js"; //  IMPORTAÇÃO

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: "http://localhost:5173", // ou onde está seu frontend
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());

//  Usa os dois grupos de rotas
app.use("/api", cadastroRoutes);
app.use("/api", loginRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
