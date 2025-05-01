import styles from "./AuthUser.module.css";
import imagemPrato from "../../../assets/imagem-prato.png";
import '../../../Styles/global.css';

export default function AuthUser() {
  
  return (
    <div className={styles.cadastroContainer}>
      <div className={`${styles.ladoEsquerdo} ${styles.bgSilhueta}`}>
        <div className={styles.logoContainer}>
          <img
            src={imagemPrato}
            alt="Prato branco"
            className={styles.imagemPrato}
          />
          {/* Texto dentro do prato */}
          <p className={styles.textConfAuth}>
            Sua autenticação foi concluída.
          </p>
          <p className={styles.textInfo}>
            Aguarde o administrador <br/>validar seu cadastro.
          </p>
        </div>
      </div>
    </div>
  );
}