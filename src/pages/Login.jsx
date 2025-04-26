import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate
import '../assets/LoginCadastro.css';
import '../assets/global.css';

function Login({ onLogin }) { // Renomeado de Sobre para Login
  const [mostrarCadastro, setMostrarCadastro] = useState(false);
  const navigate = useNavigate(); // Inicializa o hook useNavigate

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login realizado!');
    onLogin(); // Atualiza o estado logado no App.jsx
  };

  const handleEsqueciSenha = () => {
    console.log('Redirecionar para recuperação de senha');
  };

  const handleIrParaCadastro = () => {
    navigate('/cadastro'); // Redireciona para a rota de Cadastro
  };

  return (
    <div className="login-wrapper"> {/* Renomeado de sobre-wrapper para login-wrapper */}
      <div className="logo-topo">
        <img src={`${import.meta.env.BASE_URL}midia/logoCMV.png`} alt="CMVPro" />
      </div>

      <div className="conteudo-central">
        <div className="login-card"> {/* Renomeado de sobre-card para login-card */}
          <h1 className="mb-4">Bem-vindo ao CMVPro</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                <i className="bi bi-envelope-fill me-2"></i>E-mail
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Digite seu e-mail"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                <i className="bi bi-lock-fill me-2"></i>Senha
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Digite sua senha"
                required
              />
              <div className="text-end mt-1">
                <button
                  type="button"
                  className="btn btn-link text-decoration-none p-0"
                  onClick={handleEsqueciSenha}
                >
                  Esqueci minha senha
                </button>
              </div>
            </div>
            <button type="submit" className="custom-btn w-100">
              Entrar
            </button>
          </form>
          <div className="mt-3 text-center">
            <button
              className="btn btn-link text-decoration-none"
              onClick={handleIrParaCadastro} // Redireciona para a tela de Cadastro
            >
              Ainda não tem uma conta?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login; // Renomeado para Login
