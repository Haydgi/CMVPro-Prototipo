import '../../../Styles/global.css';
import "../globalAuth.css";
import styles from "./ForgotPswd.module.css";
import { useNavigate } from "react-router-dom";
import "../../../Styles/global.css";
import { useState } from "react";

export default function forgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleVoltarParaTelaInicial = () => {
    navigate('/sign-in');
  };

  const handleCadastro = (e) => {
    e.preventDefault();
  }

  const handleInputChange = (campo, valor) => {
    switch (campo) {
      case "email":
        setEmail(valor);
        break;
      case "senha":
        setSenha(valor);
        break;
      default:
        break;
    }

    // Remove o campo da lista de inválidos assim que o usuário começa a preenchê-lo
    setCamposInvalidos((prev) => prev.filter((item) => item !== campo));
  };

  return (
    <div className={`${"backgroundContainer"} ${styles.backgroundSignIn}`}>
      <div>

        <div className={styles.container}>
          <form className={styles.formulario}
            onSubmit={handleCadastro}>
            <button className={`${styles.btnDetailsBack}`} onClick={handleVoltarParaTelaInicial}>
            <i class="bi bi-arrow-left"></i></button>
            <div className={styles.teste}>
              <h2>Recuperação de Senha</h2>

              <div className={styles.formGroup}>
                <label htmlFor="email">E-mail</label>
                <div className={styles.inputIconContainer}>
                  <i className="bi bi-envelope"></i>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Insira seu e-mail"
                    className={styles.inputField}
                  />
                </div>
              </div>

              <div className={styles.buttonContainer}>
                <button className={`${styles.btnDetails} ${"btnUltraViolet"}`}>Enviar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
