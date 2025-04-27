import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../assets/CadastroUsuarios.module.css';
import logoManuscrito from '../assets/logotipo-manuscrito.png';
import imagemPrato from '../assets/imagem-prato.png';
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
  const [telefone, setTelefone] = useState('');

  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const formatTelefone = (value) => {
    value = value.replace(/\D/g, '');

    if (value.length <= 2) {
      return value;
    }
    if (value.length <= 6) {
      return `(${value.slice(0, 2)}) ${value.slice(2)}`;
    }
    return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 15)}`;
  };

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

    const telefoneLimpo = telefone.replace(/\D/g, ''); // Remover tudo que não for número
    if (telefoneLimpo.length < 11 || telefoneLimpo.length > 15) {
      setErro('O telefone deve ter entre 11 e 15 dígitos.');
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

          {erro && !erro.includes('e-mail') && !erro.includes('senha') && !erro.includes('telefone') && (
            <p className={styles.textErro}>{erro}</p>
          )}

          {/* Linha: Nome e Sobrenome */}
          <div className={styles.inputsRow}>
            <div className={styles.formGroup}>
              <label htmlFor="nome">Nome</label>
              <input
                id="nome"
                type="text"
                minlength="2"
                maxlength="20"
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
                minlength="2"
                maxlength="20"
                value={sobrenome}
                onChange={(e) => setSobrenome(e.target.value)}
                required
                className={styles.inputField}
              />
            </div>
          </div>

          {/* Email */}

          <div className={styles.formGroup}>
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              minlength="5"
              maxlength="50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.inputField}
            />
          </div>

          {/* Confirmar Email */}

          <div className={styles.formGroup}>
            <label htmlFor="confirmarEmail">Confirmar e-mail</label>
            <input
              id="confirmarEmail"
              type="email"
              minlength="5"
              maxlength="50"
              value={confirmarEmail}
              onChange={(e) => setConfirmarEmail(e.target.value)}
              required
              className={styles.inputField}
            />
            {erro && erro.includes('e-mail') && <p className={styles.textErro}>{erro}</p>}
          </div>


          {/* Linha: Senha e Confirmar Senha */}
          <div className={styles.inputsRow}>
            <div className={styles.formGroup}>
              <label htmlFor="senha">Senha</label>
              <div className={styles.senhaContainer}>
                <input
                  id="senha"
                  type={mostrarSenha ? 'text' : 'password'}
                  minlength="8"
                  maxlength="20"
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
                  {mostrarSenha ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                </button>
              </div>
              {erro && erro.includes('senha') && <p className={styles.textErro}>{erro}</p>}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="confirmarSenha">Confirmar senha</label>
              <div className={styles.senhaContainer}>
                <input
                  id="confirmarSenha"
                  type={mostrarConfirmarSenha ? 'text' : 'password'}
                  minlength="8"
                  maxlength="20"
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
                  {mostrarConfirmarSenha ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                </button>
              </div>
            </div>
          </div>

          {/* Telefone */}
          <div className={styles.formGroup}>
            <label htmlFor="telefone">Telefone celular</label>
            <input
              id="telefone"
              type="tel"
              value={telefone}
              onChange={(e) => setTelefone(formatTelefone(e.target.value))}
              required
              className={styles.inputField}
            />
            {erro && erro.includes('telefone') && <p className={styles.textErro}>{erro}</p>}
          </div>

          {/* Mensagens */}
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
