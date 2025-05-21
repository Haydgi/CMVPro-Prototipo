import '../../../Styles/global.css';
import "../globalAuth.css";
import styles from "./ForgotPswdEmail.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [mostrarErroEmail, setMostrarErroEmail] = useState(false); // controla borda e asterisco
  const [popUpMessage, setPopUpMessage] = useState(""); // controla o popup de erro

  const emailTemErro = email !== "" && !email.includes("@");

  const handleVoltarParaTelaInicial = () => {
    navigate('/sign-in');
  };

  const handleCadastro = (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      setMostrarErroEmail(true); // ativa erro visual
      setMensagem(""); // não mostra sucesso
      setPopUpMessage("Por favor, insira um e-mail válido."); // define mensagem do popup
      return;
    }

    setMensagem("Verifique seu email. Um link para redefinir sua senha foi enviado.");
    setMostrarErroEmail(false); // tudo certo
    setPopUpMessage(""); // limpa o popup de erro
  };

  const handleEmailChange = (valor) => {
    setEmail(valor);
    setMensagem("");
    setMostrarErroEmail(false); // sempre remove erro ao digitar algo
    setPopUpMessage(""); // limpa o popup de erro ao digitar
  };

  return (
    <div className={`${"backgroundContainer"} ${styles.background}`}>
      <div>
        <div className={styles.container}>
          <form className={styles.formulario} onSubmit={handleCadastro} noValidate>
            <button className={styles.btnDetailsBack} onClick={handleVoltarParaTelaInicial}>
              <i className="bi bi-arrow-left-circle"></i>Voltar
            </button>

            <h2>Recuperação de Senha</h2>

            <div className={styles.formGroup} style={{ position: "relative" }}>
              <label htmlFor="email">
                E-mail
                {mostrarErroEmail && <span className={styles.asterisco}>*</span>}
              </label>

              <div className={styles.inputIconContainer}>
                <i className="bi bi-envelope"></i>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  placeholder="Insira seu e-mail"
                  className={`${styles.inputField} ${mostrarErroEmail ? styles.inputInvalido : ""}`}
                />
              </div>

              {mensagem && (
                <div className={styles.mensagemEmail}>
                  <p>{mensagem}</p>
                  <button
                    type="button"
                    className={styles.btnReenviar}
                    onClick={() => setMensagem("Um novo link foi enviado ao seu email.")} >
                    Reenviar email
                  </button>
                </div>
              )}
            </div>

            <div className={styles.buttonContainer}>
              <button className={`${styles.btnDetails} btnUltraViolet`} type="submit">
                Enviar
              </button>
            </div>
          </form>

          {/* Pop-up para mensagens */}
          {popUpMessage && (
            <div className={styles.popUpError}>
              {popUpMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}