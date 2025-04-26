import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../assets/CadastroUsuarios.module.css';
import '../assets/global.css';
import logoManuscrito from '../assets/logotipo-manuscrito.png';
import imagemPrato from '../assets/imagem-prato.png';

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
  const [telefone, setTelefone] = useState('');

  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const handleCadastro = (e) => {
    e.preventDefault();

    if (!nome || !sobrenome || !email || !confirmarEmail || !senha || !confirmarSenha || !telefone) {
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
      telefone,
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
    setTelefone('');
  };

  return (
    <div className={styles.cadastroContainer}>
      <div className={`${styles.ladoEsquerdo} ${styles.bgSilhueta}`}>
        <div className={styles.logoContainer}>
          <img 
            src={logoManuscrito}
            alt="Logotipo manuscrito: Caderno do Chef" 
            className={styles.logoManuscrito} 
          />
          <img
            src={imagemPrato}
            alt="Prato branco"
            className={styles.imagemPrato}
          
          />
          <p className={styles.fraseAbaixoLogo}>
            Suas receitas e despesas na palma da sua mão!
          </p>
        </div>
      </div>

      <div className={styles.ladoDireito}>
        <form className={styles.formulario} onSubmit={handleCadastro}>
          <h2 className="text-center mb-3">Crie sua conta</h2>

          {/* Linha: Nome e Sobrenome */}
          <div className={styles.inputsRow}>
            <div className={styles.formGroup}>
              <label htmlFor="nome">Nome</label>
              <input
                id="nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                className={styles.inputField}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="sobrenome">Sobrenome</label>
              <input
                id="sobrenome"
                type="text"
                value={sobrenome}
                onChange={(e) => setSobrenome(e.target.value)}
                required
                className={styles.inputField}
              />
            </div>
          </div>

          {/* Linha: Email e Confirmar Email */}
          <div className={styles.inputsRow}>
            <div className={styles.formGroup}>
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.inputField}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="confirmarEmail">Confirmar e-mail</label>
              <input
                id="confirmarEmail"
                type="email"
                value={confirmarEmail}
                onChange={(e) => setConfirmarEmail(e.target.value)}
                required
                className={styles.inputField}
              />
            </div>
          </div>

          {/* Senha */}
          <div className={styles.formGroup}>
            <label htmlFor="senha">Senha</label>
            <div className={styles.senhaContainer}>
              <input
                id="senha"
                type={mostrarSenha ? 'text' : 'password'}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                className={styles.inputField}
              />
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                className={styles.toggleSenha}
              >
                {mostrarSenha ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Confirmar Senha */}
          <div className={styles.formGroup}>
            <label htmlFor="confirmarSenha">Confirmar senha</label>
            <div className={styles.senhaContainer}>
              <input
                id="confirmarSenha"
                type={mostrarConfirmarSenha ? 'text' : 'password'}
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                required
                className={styles.inputField}
              />
              <button
                type="button"
                onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                className={styles.toggleSenha}
              >
                {mostrarConfirmarSenha ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Telefone */}
          <div className={styles.formGroup}>
            <label htmlFor="telefone">Telefone celular</label>
            <input
              id="telefone"
              type="tel"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              required
              className={styles.inputField}
            />
          </div>

          {/* Mensagens */}
          {erro && <p className={styles.textErro}>{erro}</p>}
          {sucesso && <p className={styles.textSucesso}>{sucesso}</p>}

          <button type="submit" className={styles.btnCadastrar}>
            Cadastrar-se
          </button>

          <div className="mt-3 text-center">
            <p style={{ marginTop: '30px' }}>
              Já é cadastrado?{' '}
              <span
                onClick={() => navigate('/')}
                style={{
                  color: '#67477A',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  display: 'inline-block',
                  transition: 'transform 0.3s ease, color 0.3s ease',
                }}
                onMouseEnter={(e) => (e.target.style.transform = 'scale(1.03)')}
                onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
              >
                Fazer log-in
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
