import '../globalAuth.css';
import styles from "./AuthUser.module.css";
import { useNavigate } from 'react-router-dom';
import imagemPrato from "../../../assets/imagem-prato.png";
import '../../../Styles/global.css';

export default function AuthUser() {
  const navigate = useNavigate();
  const handleVoltarParaTelaInicial = () => {
    navigate('/sign-in');
  };

  return (
    <div className={`${'backgroundContainer'} ${styles.backgroundAuth}`}>
      <div>
        <img
          src={imagemPrato}
          alt="Prato branco"
          className={`${'imagemPrato'}`}
        />
        <div className={styles.sobreposicao}>
          <p className={styles.textConfAuth}>
            Sua autenticação foi concluída.
          </p>
          <p className={styles.textInfo}>
            Aguarde o administrador <br />validar seu cadastro.
          </p>
          <button className={`${'btnUltraViolet'}`} onClick={handleVoltarParaTelaInicial}>
          <i class="bi bi-arrow-left"></i> Voltar Para Tela Inicial
          </button>
        </div>
      </div>
    </div>

  );
}