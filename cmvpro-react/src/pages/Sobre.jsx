import { useState } from 'react';
import LoginModal from '../components/LoginModal';

function Sobre({ onLogin }) {
  const [mostrarLogin, setMostrarLogin] = useState(false);

  return (
    <div className="sobre-wrapper">
      
      <div className="logo-topo">
        <img src="/midia/logoCMV.png" alt="CMVPro" />
      </div>

      
      <div className="conteudo-central">
        <div className="sobre-card">
          <h1 className="mb-2">Bem-vindo ao CMVPro</h1>
          <p className="mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
          </p>

          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <button className="btn btn-outline-light custom-btn" onClick={() => setMostrarLogin(true)}>
              <i className="bi bi-box-arrow-in-right me-2"></i> Login
            </button>
            <button className="btn btn-outline-light custom-btn" onClick={() => alert('Cadastro em breve!')}>
              <i className="bi bi-person-plus me-2"></i> Criar Conta
            </button>
          </div>
        </div>
      </div>

      {mostrarLogin && (
        <LoginModal
          onClose={() => setMostrarLogin(false)}
          onLogin={() => {
            setMostrarLogin(false);
            onLogin();
          }}
        />
      )}
    </div>
  );
}

export default Sobre;
