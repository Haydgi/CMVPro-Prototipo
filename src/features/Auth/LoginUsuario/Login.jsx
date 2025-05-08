import '../../../Styles/global.css';
import "../globalAuth.css";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import "../../../Styles/global.css";
import logoManuscrito from "../../../assets/logotipo-manuscrito.png";
import imagemPrato from "../../../assets/imagem-prato.png";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");


  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleForgotPassword = () => {
    navigate("/forgotPassword");
  };

  const usuario = {
    email,
    senha,
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
          <form className={styles.formulario}
            onSubmit={handleCadastro}>
            <div className={styles.teste}>
              <h2>Acesse seu Caderno!</h2>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <div className={styles.inputIconContainer}>
                  <i className="bi bi-envelope"></i>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Email"
                    className={styles.inputField}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="senha">Senha</label>
                <div className={styles.inputIconContainer}>
                  <i className="bi bi-lock"></i>
                  <input
                    id="senha"
                    type={mostrarSenha ? "text" : "password"}
                    value={senha}
                    onChange={(e) => handleInputChange("senha", e.target.value)}
                    placeholder="Senha"
                    className={styles.inputField}
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
                {/* Adicionando o link "Esqueci minha senha" abaixo do campo de senha */}
                <p onClick={handleForgotPassword} className={styles.esqueciSenha}>
                  Esqueci minha senha
                </p>
              </div>

              <div className={styles.buttonContainer}>
                <button className="btnUltraViolet">Entrar</button>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <span>Ainda não é cadastrado? </span>
              <span
                onClick={handleSignUp}
                className={styles.linkCriarConta}
              >
                Criar conta
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
