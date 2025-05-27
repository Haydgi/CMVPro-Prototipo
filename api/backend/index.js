import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cadastroRoutes from "./routes/CadastroUsuario.js";
import loginRoutes from "./routes/login.js";
import ingredientesRoutes from "./routes/cadastroIngredientes.js";  // ✅ Importa a nova rota

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

app.use("/api", cadastroRoutes);
app.use("/api", loginRoutes);
app.use("/api", ingredientesRoutes);  //  adiciona as rotas de ingredientes

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
