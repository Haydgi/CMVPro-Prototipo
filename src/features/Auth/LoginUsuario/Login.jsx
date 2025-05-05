import "../globalAuth.css";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import "../../../Styles/global.css";
import logoManuscrito from "../../../assets/logotipo-manuscrito.png";
import imagemPrato from "../../../assets/imagem-prato.png";

export default function Login() {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleForgotPassword = () => {
    navigate("/forgotPassword");
  };

  return (
    <div className="backgroundContainer">
      <div>
        <div className={styles.logoContainer}>
          <img
            src={logoManuscrito}
            alt="Logotipo manuscrito: Caderno do Chef"
            className={styles.logoManuscrito}
          />
          <img
            src={imagemPrato}
            alt="Imagem de um prato"
            className={styles.imagemPrato}
          />
        </div>

        <div className={styles.container}>
          <form className={styles.formulario}>
            <div>
              <h2>Entrar</h2>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  className={styles.inputField}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="senha">Senha</label>
                <input
                  type="password"
                  placeholder="Senha"
                  className={styles.inputField}
                />
              </div>

              <div className={styles.buttonContainer}>
                <button className="btnUltraViolet">Logar</button>
              </div>
            </div>

            <div className={styles.footerLinks}>
              <p onClick={handleForgotPassword}>Esqueci minha senha</p>
              <p onClick={handleSignUp}>Criar uma conta</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
