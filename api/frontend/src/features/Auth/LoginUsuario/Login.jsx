import '../../../Styles/global.css';
import "../globalAuth.css";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import "../../../Styles/global.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");


  const handleSignUp = () => {
    navigate("/sign-up");
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password-email");
  };

  const usuario = {
    email,
    senha,
  };

const handleCadastro = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post("http://localhost:3001/api/login", {
      email,
      senha
    });

    if (response.status === 200) {
  localStorage.setItem("token", response.data.token);
  navigate("/receitas");

    } else {
      // Caso retorne outro status (não 200), tratar aqui (opcional)
      toast.error("Falha no login. Tente novamente.");
    }
  } catch (error) {
    // Se o backend enviou mensagem de erro, pega ela e mostra
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      // Caso não tenha mensagem, mostra erro genérico
      toast.error("Erro ao fazer login. Verifique seu e-mail e senha.");
    }
  }
};


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

    setCamposInvalidos((prev) => prev.filter((item) => item !== campo));
  };

  return (
    <div className={`${"backgroundContainer"} ${styles.backgroundSignIn}`}>
      <div>

        <div className={styles.container}>
          <form className={styles.formulario}
            onSubmit={handleCadastro}>
            <div className={styles.teste}>
              <h2>Acesse seu Caderno!</h2>

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

              <div className={styles.formGroup}>
                <label htmlFor="senha">Senha</label>
                <div className={styles.inputIconContainer}>
                  <i className="bi bi-lock"></i>
                  <input
                    id="senha"
                    type={mostrarSenha ? "text" : "password"}
                    value={senha}
                    onChange={(e) => handleInputChange("senha", e.target.value)}
                    placeholder="Insira sua senha"
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

                {/* Link "Esqueci minha senha" abaixo do campo de senha */}
                <p onClick={handleForgotPassword} className={styles.esqueciSenha}>
                  Esqueci minha senha
                </p>
              </div>

              <div className={styles.buttonContainer}>
                <button className={`${styles.btnDetails} ${"btnUltraViolet"}`}>Entrar</button>
              </div>
            </div>

            {/* Link "Ainda não é cadastrado?" abaixo do botão de login */}
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
