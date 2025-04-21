import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/LoginCadastro.css';
import '../assets/global.css';

export default function Cadastro() {
  const navigate = useNavigate();
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [confirmarEmail, setConfirmarEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const handleCadastro = (e) => {
    e.preventDefault();

    if (!nome || !sobrenome || !email || !confirmarEmail || !senha || !confirmarSenha) {
      setErro('Por favor, preencha todos os campos.');
      setSucesso('');
      return;
    }

    if (email !== confirmarEmail) {
      setErro('Os e-mails não coincidem.');
      setSucesso('');
      return;
    }

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      setSucesso('');
      return;
    }

    const usuario = {
      nome,
      sobrenome,
      email,
      senha,
    };

    localStorage.setItem('usuario', JSON.stringify(usuario));
    setErro('');
    setSucesso('Cadastro realizado com sucesso!');

    setNome('');
    setSobrenome('');
    setEmail('');
    setConfirmarEmail('');
    setSenha('');
    setConfirmarSenha('');
  };

  return (
    <div className="cadastro-wrapper">
      {/* Lado esquerdo com o logo e a imagem de fundo */}
      <div className="cadastro-logo">
        <img
          src={`${import.meta.env.BASE_URL}midia/logoCMV.png`}
          alt="CMVPro"
        />
        <h1>Bem-vindo ao CMVPro</h1>
        <p>Gerencie seus produtos e receitas com facilidade.</p>
      </div>

      {/* Lado direito com o formulário */}
      <div className="cadastro-formulario">
        <form className="w-75" onSubmit={handleCadastro}>
          <h2 className="mb-4 text-center">Crie sua conta</h2>

          <div className="row g-3 mb-3"> {/* Adicionado mb-3 */}
            <div className="col-md-6">
              <label htmlFor="nome" className="form-label">
                <i className="bi bi-person-fill"></i>Nome
              </label>
              <input
                type="text"
                id="nome"
                className="form-control"
                placeholder="Digite seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="sobrenome" className="form-label">
                <i className="bi bi-person-fill"></i>Sobrenome
              </label>
              <input
                type="text"
                id="sobrenome"
                className="form-control"
                placeholder="Digite seu sobrenome"
                value={sobrenome}
                onChange={(e) => setSobrenome(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              <i className="bi bi-envelope-fill me-2"></i>Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmarEmail" className="form-label">
              <i className="bi bi-envelope-check-fill me-2"></i>Confirmar Email
            </label>
            <input
              type="email"
              id="confirmarEmail"
              className="form-control"
              placeholder="Confirme seu email"
              value={confirmarEmail}
              onChange={(e) => setConfirmarEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="senha" className="form-label">
              <i className="bi bi-lock-fill me-2"></i>Senha
            </label>
            <div className="senha-box d-flex align-items-center">
              <input
                type={mostrarSenha ? 'text' : 'password'}
                id="senha"
                className="form-control"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn-olho ms-2 rounded-circle border-0"
                onClick={() => setMostrarSenha(!mostrarSenha)}
              >
                <i className={`bi ${mostrarSenha ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}></i>
              </button>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="confirmarSenha" className="form-label">
              <i className="bi bi-lock-fill me-2"></i>Confirmar Senha
            </label>
            <div className="senha-box d-flex align-items-center">
              <input
                type={mostrarConfirmarSenha ? 'text' : 'password'}
                id="confirmarSenha"
                className="form-control"
                placeholder="Confirme sua senha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn-olho ms-2 rounded-circle border-0"
                onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
              >
                <i className={`bi ${mostrarConfirmarSenha ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}></i>
              </button>
            </div>
          </div>

          {erro && <p className="text-danger">{erro}</p>}
          {sucesso && <p className="text-success">{sucesso}</p>}

          <div className="mt-4">
            <button type="submit" className="custom-btn w-100">Cadastrar-se</button>
          </div>

          <div className="mt-3 text-center">
            <button
              className="btn btn-link text-decoration-none"
              onClick={() => navigate('/')}
            >
              Já tem uma conta?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}