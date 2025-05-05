import "../globalAuth.css";
import styles from "./Login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate
import "../../../Styles/global.css";
import logoManuscrito from "../../../assets/logotipo-manuscrito.png";
import imagemPrato from "../../../assets/imagem-prato.png"; // Importa a imagem do prato

export default function Login() {
  const navigate = useNavigate(); // Inicializa o hook useNavigate

  const handleSignUp = () => {
    navigate("/signup"); // Redireciona para a rota de Cadastro
  };

  const handleforgotPassword = () => {
    navigate("/forgotPassword"); // Redireciona para a rota de Cadastro
  };

  return (
    <div className={`${"backgroundContainer"}`}>
      <div className={styles.container}>
        <div>
          <img
            className={styles.logoManuscrito}
            src={logoManuscrito}
            alt="Logotipo manuscrito: Caderno do Chef"
          />
          <img
            className={styles.imagemPrato}
            src={imagemPrato} 
            alt="Imagem de um prato branco" />
        </div>
      </div>
    </div>
  );
}
