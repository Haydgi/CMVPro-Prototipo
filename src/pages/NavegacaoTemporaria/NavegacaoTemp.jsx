import "../../Styles/global.css";
import { useNavigate } from "react-router-dom";

export default function Sobre() {
  const navigate = useNavigate();

  const login = () => {
    navigate("/sign-in");
  };
  const cadastro = () => {
    navigate("/sign-up");
  };
  const EmailVerificado = () => {
    navigate("/auth");
  };
  const esqueceuSenhaEmail = () => {
    navigate("/forgot-password-email");
  };
  const esqueceuSenha = () => {
    navigate("/forgot-password");
  };
  const produto = () => {
    navigate("/ingredientes");
  };
  const receita = () => {
    navigate("/receitas");
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="p-5 border rounded-5 br-4 text-danger bg-dark">Melhor que digitar</h1>
      <button className="border btn btn-primary" onClick={login}>Login</button>
      <button className="border btn btn-secondary" onClick={cadastro}>Cadastro Usuario</button>
      <button className="border btn btn-success" onClick={EmailVerificado}>Email Verificado</button>
      <button className="border btn btn-danger" onClick={esqueceuSenhaEmail}>Esqueceu Senha Email</button>
      <button className="border btn btn-warning" onClick={esqueceuSenha}>Esqueceu Senha</button>
      <button className="border btn btn-info" onClick={produto}>Cadastro Produtos</button>
      <button className="border btn btn-dark" onClick={receita}>Cadastro Receitas</button>
    </div>
  );
}
