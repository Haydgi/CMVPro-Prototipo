import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../../Styles/global.css';
import '../globalAuth.css';
import styles from "./CadastroUsuarios.module.css";
import logoManuscrito from "../../../assets/logotipo-manuscrito.png";
import imagemPrato from "../../../assets/imagem-prato.png";
import crieConta from "../../../assets/crie-sua-conta.png";

export default function Cadastro() {
  const navigate = useNavigate();
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [confirmarEmail, setConfirmarEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [telefone, setTelefone] = useState("");

  const [popUpMessage, setPopUpMessage] = useState(""); // Estado para o pop-up
  const [camposInvalidos, setCamposInvalidos] = useState([]); // Campos inválidos

  const formatTelefone = (value) => {
    // Remove todos os caracteres que não são números
    value = value.replace(/\D/g, "");

    // Aplica o formato apenas se o valor for maior que 2 caracteres
    if (value.length <= 2) {
      return value;
    }
    if (value.length <= 6) {
      return `(${value.slice(0, 2)}) ${value.slice(2)}`;
    }
    if (value.length <= 10) {
      return `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
    }
    return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
  };

  const handleCadastro = (e) => {
    e.preventDefault();

    // Redefine o pop-up para garantir que ele reapareça
    setPopUpMessage("");

    const camposNaoPreenchidos = [];
    const camposInvalidosTemp = [];

    // Validações
    if (nome.length < 3) camposInvalidosTemp.push("nome");

    if (!email) {
      camposNaoPreenchidos.push("email");
    } else if (!email.includes("@")) {
      camposInvalidosTemp.push("email"); // Adiciona o campo de e-mail como inválido
    }
    if (!confirmarEmail || email !== confirmarEmail)
      camposInvalidosTemp.push("confirmarEmail");
    if (
      !telefone ||
      telefone.replace(/\D/g, "").length < 11 ||
      telefone.replace(/\D/g, "").length > 15
    )
      camposInvalidosTemp.push("telefone");
    if (
      !senha ||
      senha.length < 8 ||
      senha.length > 20 ||
      !/[a-z]/.test(senha) ||
      !/[A-Z]/.test(senha) ||
      !/[0-9]/.test(senha) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(senha)
    )
      camposInvalidosTemp.push("senha", "confirmarSenha"); // Adiciona ambos os campos
    if (!confirmarSenha || senha !== confirmarSenha) {
      camposInvalidosTemp.push("senha", "confirmarSenha"); // Marca ambos os campos como inválidos
    }

    // Se houver campos inválidos ou não preenchidos
    if (camposNaoPreenchidos.length > 0 || camposInvalidosTemp.length > 0) {
      setTimeout(() => {
        setPopUpMessage("Por favor, corrija os campos destacados.");
      }, 0);
      setCamposInvalidos([...camposNaoPreenchidos, ...camposInvalidosTemp]);
      return;
    }

    // Cadastro bem-sucedido
    const usuario = {
      nome,
      email,
      telefone,
      senha,
    };

    // Limpa os campos
    setNome("");
    setEmail("");
    setConfirmarEmail("");
    setSenha("");
    setConfirmarSenha("");
    setTelefone("");

    // Exibe o pop-up de sucesso
    setTimeout(() => {
      setPopUpMessage(
        "Cadastro realizado com sucesso! Verifique seu e-mail para ativar sua conta."
      );
    }, 0);
  };

  const handleInputChange = (campo, valor) => {
    switch (campo) {
      case "nome":
        setNome(valor);
        break;
      case "email":
        setEmail(valor);
        break;
      case "confirmarEmail":
        setConfirmarEmail(valor);
        break;
      case "senha":
        setSenha(valor);
        break;
      case "confirmarSenha":
        setConfirmarSenha(valor);
        break;
      case "telefone":
        // Atualiza o estado com o valor formatado
        setTelefone(formatTelefone(valor));
        break;
      default:
        break;
    }

    // Remove o campo da lista de inválidos assim que o usuário começa a preenchê-lo
    setCamposInvalidos((prev) => prev.filter((item) => item !== campo));
  };

  return (
    <div className={`${'backgroundContainer'} ${styles.backgroundSignUp}`}>
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
        </div>
      </div>

      <div className={styles.ladoDireito}>
        <form
          className={styles.formulario}
          onSubmit={handleCadastro}
          noValidate
        >
          <div className={styles.topoForms}>
            {" "}
            <img
              src={crieConta}
              alt="Crie sua conta"
              className={styles.crieConta}
            />{" "}
          </div>

          {/* Linha: Nome e Sobrenome */}
          <div className={styles.inputsRow}>
            <div className={styles.formGroup}>
              <label htmlFor="nome">
                Nome Completo
                {camposInvalidos.includes("nome") && (
                  <span className={styles.asterisco}>*</span>
                )}
              </label>
              <div className={styles.inputIconContainer}>
                <i className="bi bi-person"></i>
                <input
                  id="nome"
                  type="text"
                  minLength="2"
                  maxLength="100"
                  value={nome}
                  onChange={(e) => handleInputChange("nome", e.target.value)}
                  required
                  className={`${styles.inputField} ${camposInvalidos.includes("nome") ? styles.inputInvalido : ""
                    }`}
                />
              </div>
            </div>
          {/* Telefone */}
          <div className={styles.formGroup}>
            <label htmlFor="telefone">Telefone celular (com DDD)</label>
            {camposInvalidos.includes("telefone") && (
              <span className={styles.asterisco}>*</span>
            )}
            {/* Mensagem de erro para número de telefone inválido */}
            {telefone.replace(/\D/g, "").length > 0 && telefone.replace(/\D/g, "").length < 10 && (
              <p className={styles.textErroTelefone}>Número de telefone inválido</p>
            )}
            <div className={styles.inputIconContainer}>
              <i className="bi bi-telephone"></i>
              <input
                id="telefone"
                type="tel"
                value={telefone}
                onChange={(e) => handleInputChange("telefone", e.target.value)}
                required
                className={`${styles.inputField} ${camposInvalidos.includes("telefone")
                  ? styles.inputInvalido
                  : ""
                  }`}
              />
              </div>
            </div>
          </div>
          

          <div className={styles.inputsRow}>
            {/* Email */}
            <div className={styles.formGroup}>
              <label htmlFor="email">
                E-mail
                {(camposInvalidos.includes("email") || camposInvalidos.includes("confirmarEmail")) && (
                  <span className={styles.asterisco}>*</span>
                )}
              </label>
              {/* Mensagem de erro para formato inválido de e-mail */}
              {!email.includes("@") && email && (
                <p className={styles.textErroFormatoEmail}>Formato de e-mail inválido</p>
              )}
              <div className={styles.inputIconContainer}>
                <i className="bi bi-envelope"></i>
                <input
                  id="email"
                  type="email"
                  minLength="5"
                  maxLength="50"
                  value={email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className={`${styles.inputField} ${camposInvalidos.includes("email") || confirmarEmail !== email
                    ? styles.inputInvalido
                    : ""
                    }`}
                />
              </div>
            </div>


            {/* Confirmar Email */}
            <div className={styles.formGroup} style={{ position: "relative" }}>
              <label htmlFor="confirmarEmail">
                Confirmar e-mail
                {(camposInvalidos.includes("email") || camposInvalidos.includes("confirmarEmail")) && (
                  <span className={styles.asterisco}>*</span>
                )}
              </label>
              <div className={styles.inputIconContainer}>
                <i className="bi bi-envelope"></i>
                <input
                  id="confirmarEmail"
                  type="email"
                  minLength="5"
                  maxLength="50"
                  value={confirmarEmail}
                  onChange={(e) => handleInputChange("confirmarEmail", e.target.value)}
                  required
                  className={`${styles.inputField} ${camposInvalidos.includes("confirmarEmail") || confirmarEmail !== email
                    ? styles.inputInvalido
                    : ""
                    }`}
                />
              </div>
              {/* Mensagem de erro se os e-mails não coincidirem */}
              {confirmarEmail && confirmarEmail !== email && (
                <p className={styles.textErroConfirmarEmail}>Os e-mails não coincidem</p>
              )}
            </div>
          </div>


          {/* Linha: Senha e Confirmar Senha */}
          <div className={styles.inputsRow}>
            <div className={styles.formGroup}>
              <label htmlFor="senha">
                Senha
                {camposInvalidos.includes("senha") && (
                  <span className={styles.asterisco}>*</span>
                )}
              </label>
              <div className={styles.inputIconContainer}>
                <i className="bi bi-lock"></i>
                <input
                  id="senha"
                  type={mostrarSenha ? "text" : "password"}
                  minLength="8"
                  maxLength="20"
                  value={senha}
                  onChange={(e) => handleInputChange("senha", e.target.value)}
                  required
                  className={`${styles.inputField} ${camposInvalidos.includes("senha") ? styles.inputInvalido : ""
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className={styles.toggleSenha}
                >
                  {mostrarSenha ? (
                    <i className="bi bi-eye-slash"></i>
                  ) : (
                    <i className="bi bi-eye"></i>
                  )}
                </button>
              </div>
            </div>

            <div className={styles.formGroup} style={{ position: "relative" }}>
              <label htmlFor="confirmarSenha">
                Confirmar senha
                {camposInvalidos.includes("confirmarSenha") && (
                  <span className={styles.asterisco}>*</span>
                )}
              </label>
              <div className={styles.inputIconContainer}>
                <i className="bi bi-lock"></i>
                <input
                  id="confirmarSenha"
                  type={mostrarConfirmarSenha ? "text" : "password"}
                  minLength="8"
                  maxLength="20"
                  value={confirmarSenha}
                  onChange={(e) =>
                    handleInputChange("confirmarSenha", e.target.value)
                  }
                  required
                  className={`${styles.inputField} ${camposInvalidos.includes("confirmarSenha")
                    ? styles.inputInvalido
                    : ""
                    }`}
                />
                <button
                  type="button"
                  onClick={() =>
                    setMostrarConfirmarSenha(!mostrarConfirmarSenha)
                  }
                  className={styles.toggleSenha}
                >
                  {mostrarConfirmarSenha ? (
                    <i className="bi bi-eye-slash"></i>
                  ) : (
                    <i className="bi bi-eye"></i>
                  )}
                </button>
              </div>
              {/* Mensagem de erro se as senhas não coincidirem */}
              {confirmarSenha && confirmarSenha !== senha && (
                <p className={styles.textErroSenha}>As senhas não coincidem</p>
              )}
            </div>
          </div>

          <p className = {styles.titleRegrasSenha}
          >
            Regras para a criação de senha:
          </p>

          <ul className={styles.regrasSenha}>
            <li
              className={
                senha.length >= 8 && senha.length <= 20
                  ? styles.valido
                  : styles.invalido
              }
            >
              <i
                className={
                  senha.length >= 8 && senha.length <= 20
                    ? "bi bi-check-circle"
                    : "bi bi-x-circle"
                }
              ></i>
              Possuir um tamanho entre 8 e 20 caracteres.
            </li>
            <li
              className={/[a-z]/.test(senha) ? styles.valido : styles.invalido}
            >
              <i
                className={
                  /[a-z]/.test(senha) ? "bi bi-check-circle" : "bi bi-x-circle"
                }
              ></i>
              Possuir no mínimo 1 letra minúscula
            </li>
            <li
              className={/[A-Z]/.test(senha) ? styles.valido : styles.invalido}
            >
              <i
                className={
                  /[A-Z]/.test(senha) ? "bi bi-check-circle" : "bi bi-x-circle"
                }
              ></i>
              Possuir no mínimo 1 letra maiúscula.
            </li>
            <li
              className={/[0-9]/.test(senha) ? styles.valido : styles.invalido}
            >
              <i
                className={
                  /[0-9]/.test(senha) ? "bi bi-check-circle" : "bi bi-x-circle"
                }
              ></i>
              Possuir no mínimo 1 número.
            </li>
            <li
              className={
                /[!@#$%^&*(),.?":{}|<>]/.test(senha)
                  ? styles.valido
                  : styles.invalido
              }
            >
              <i
                className={
                  /[!@#$%^&*(),.?":{}|<>]/.test(senha)
                    ? "bi bi-check-circle"
                    : "bi bi-x-circle"
                }
              ></i>
              Possuir no mínimo 1 caractere especial.
            </li>
          </ul>

          <button type="submit" className={styles.btnCadastrar}>
            Cadastrar-se
          </button>

          <div className="mt-1 text-center">
            <p className={`${styles.footerModal}`}>
              Já é cadastrado?{" "}
              <span
                onClick={() => navigate("/signin")}
                style={{
                  color: "#67477A",
                  cursor: "pointer",
                  textDecoration: "underline",
                  display: "inline-block",
                  fontWeight: "bold",
                  transition: "transform 0.3s ease, color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.01)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              >
                Fazer log-in
              </span>
            </p>
          </div>
        </form>

        {/* Pop-up para mensagens */}
        {popUpMessage && (
          <div
            className={
              popUpMessage ===
                "Cadastro realizado com sucesso! Verifique seu e-mail para ativar sua conta."
                ? styles.popUpSucess
                : styles.popUpError
            }
          >
            {popUpMessage}
          </div>
        )}
      </div>
    </div>
  );
}