import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Rotas
import cadastroRoutes from "./routes/CadastroUsuario.js";
import loginRoutes from "./routes/login.js";
import ingredientesRoutes from "./routes/cadastroIngredientes.js";
import cadastroReceitas from "./routes/cadastroReceitas.js";
import cadastroDespesas from "./routes/cadastroDespesas.js";  // rota de despesas

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Para lidar com __dirname em ES modules (import/export)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware CORS
app.use(cors({
  origin: "http://localhost:5173",  // endereço do frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// Middleware para receber JSON no body das requisições
app.use(express.json());

//  Middleware para servir arquivos estáticos da pasta uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rotas da API
app.use("/api", cadastroRoutes);
app.use("/api", loginRoutes);
app.use("/api/ingredientes", ingredientesRoutes);
app.use("/api/receitas", cadastroReceitas);
app.use("/api/despesas", cadastroDespesas);  // aqui liga as rotas de despesas

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(` Servidor rodando na porta ${PORT}`);
  console.log(" SECRET_JWT =", process.env.SECRET_JWT);
});
