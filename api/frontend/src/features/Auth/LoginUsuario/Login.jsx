import '../../../Styles/global.css';
import "../globalAuth.css";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // Manipulador simplificado para inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    else if (name === "senha") setSenha(value);
  };

  const handleSignUp = () => {
    navigate("/sign-up");
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password-email");
  };

  const handleCadastro = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/api/login", {
        email,
        senha,
      });

      if (response.status === 200) {
        // Tenta pegar o userId do retorno da API
        const userId =
          response.data.usuario?.id || response.data.usuario?.ID_Usuario;

        if (!userId) {
          toast.error("ID do usuário não encontrado na resposta.");
          return;
        }

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", userId);

        navigate("/receitas");
      } else {
        toast.error("Falha no login. Tente novamente.");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.mensagem) {
        toast.error(error.response.data.mensagem);
      } else {
        toast.error("Erro ao fazer login. Verifique seu e-mail e senha.");
      }
    }
  };

  return (
    <div className={`${"backgroundContainer"} ${styles.backgroundSignIn}`}>
      <div>
        <div className={styles.container}>
          <form className={styles.formulario} onSubmit={handleCadastro}>
            <div className={styles.teste}>
              <h2>Acesse seu Caderno!</h2>

              <div className={styles.formGroup}>
                <label htmlFor="email">E-mail</label>
                <div className={styles.inputIconContainer}>
                  <i className="bi bi-envelope"></i>
                  <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={handleInputChange}
                    placeholder="Insira seu e-mail"
                    className={styles.inputField}
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="senha">Senha</label>
                <div className={styles.inputIconContainer}>
                  <i className="bi bi-lock"></i>
                  <input
                    id="senha"
                    name="senha"
                    type={mostrarSenha ? "text" : "password"}
                    value={senha}
                    onChange={handleInputChange}
                    placeholder="Insira sua senha"
                    className={styles.inputField}
                    required
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

                <p onClick={handleForgotPassword} className={styles.esqueciSenha}>
                  Esqueci minha senha
                </p>
              </div>

              <div className={styles.buttonContainer}>
                <button
                  type="submit"
                  className={`${styles.btnDetails} btnUltraViolet`}
                >
                  Entrar
                </button>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <span>Ainda não é cadastrado? </span>
              <span onClick={handleSignUp} className={styles.linkCriarConta}>
                Criar conta
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
