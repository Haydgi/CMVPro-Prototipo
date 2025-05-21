import { useState } from "react";
import "../../../Styles/global.css";
import "../globalAuth.css";
import styles from "./ForgotPswd.module.css";
import Password, { validarSenha, validarConfirmacaoSenha } from "../PswdLogic.jsx";

export default function ForgotPassword() {
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [camposInvalidos, setCamposInvalidos] = useState([]);
  const [popUpMessage, setPopUpMessage] = useState("");

  const handleRedefinirSenha = (e) => {
    e.preventDefault();
    setPopUpMessage("");

    const camposNaoPreenchidos = [];
    const camposInvalidosTemp = [];

    if (!validarSenha(senha)) {
      camposInvalidosTemp.push("senha");
    }

    if (!confirmarSenha || !validarConfirmacaoSenha(senha, confirmarSenha)) {
      camposInvalidosTemp.push("confirmarSenha");
    }

    if (camposNaoPreenchidos.length > 0 || camposInvalidosTemp.length > 0) {
      setTimeout(() => {
        setPopUpMessage("Por favor, corrija os campos destacados.");
      }, 0);
      setCamposInvalidos([...camposNaoPreenchidos, ...camposInvalidosTemp]);
      return;
    }

    // Simula redefinição de senha bem-sucedida
    setSenha("");
    setConfirmarSenha("");
    setCamposInvalidos([]);
    setTimeout(() => {
      setPopUpMessage("Senha redefinida com sucesso!");
    }, 0);
  };

  const handleInputChange = (campo, valor) => {
    if (campo === "senha") setSenha(valor);
    if (campo === "confirmarSenha") setConfirmarSenha(valor);

    // Remove o campo da lista de inválidos assim que o usuário começa a preenchê-lo
    setCamposInvalidos((prev) => prev.filter((item) => item !== campo));
  };

  return (
    <div className={`${"backgroundContainer"} ${styles.background}`}>
      <div className={styles.container}>
        <form className={styles.formulario} onSubmit={handleRedefinirSenha} noValidate>
          <div>
            <h2>Redefinir Senha</h2>
            <div>
              <Password
                senha={senha}
                setSenha={(valor) => handleInputChange("senha", valor)}
                confirmarSenha={confirmarSenha}
                setConfirmarSenha={(valor) => handleInputChange("confirmarSenha", valor)}
                camposInvalidos={camposInvalidos}
                setCamposInvalidos={setCamposInvalidos}
                vertical={true}
              />
            </div>

            <div className={styles.buttonContainer}>
              <button className={`${styles.btnDetails} ${"btnUltraViolet"}`}>
                Redefinir
              </button>
            </div>
          </div>
        </form>
        {popUpMessage && (
          <div
            className={
              popUpMessage ===
                "Por favor, corrija os campos destacados."
                ? styles.popUpError
                : styles.popUpSucess
            }
          >
            {popUpMessage}
          </div>
        )}
      </div>
    </div>
  );
}
