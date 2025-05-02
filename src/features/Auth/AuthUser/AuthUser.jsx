import styles from "./AuthUser.module.css";
import { useNavigate } from 'react-router-dom';
import imagemPrato from "../../../assets/imagem-prato.png";
import '../../../Styles/global.css';

export default function AuthUser() {
  const navigate = useNavigate();
  const handleVoltarParaTelaInicial = () => {
    navigate('/');
  };

  return (
    <div className={styles.cadastroContainer}>
      <div>
        <img
          src={imagemPrato}
          alt="Prato branco"
          className={styles.imagemPrato}
        />
        <div className={styles.sobreposicao}>
          <p className={styles.textConfAuth}>
            Sua autenticação foi concluída.
          </p>
          <p className={styles.textInfo}>
            Aguarde o administrador <br />validar seu cadastro.
          </p>
          <button className={styles.btnCadastrar} onClick={handleVoltarParaTelaInicial}>
          <i class="bi bi-arrow-left"></i> Voltar Para Tela Inicial
          </button>
        </div>
      </div>
    </div>

  );
}