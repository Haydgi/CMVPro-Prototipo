import { useState, useRef, useEffect } from 'react';
import styles from '../assets/ProdutoOptionsMenu.module.css';

function ProdutoOptionsMenu({ onEditar, onExcluir }) {
  const [aberto, setAberto] = useState(false);
  const menuRef = useRef();

  const alternarMenu = () => setAberto(!aberto);

  // Fecha o menu ao clicar fora
  useEffect(() => {
    const handleClickFora = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setAberto(false);
      }
    };
    document.addEventListener('mousedown', handleClickFora);
    return () => document.removeEventListener('mousedown', handleClickFora);
  }, []);

  return (
    <div className="menu-opcoes-produto" ref={menuRef}>
      <button className="botao-opcoes" onClick={alternarMenu}>
        <i className="bi bi-three-dots-vertical"></i>
      </button>

      {aberto && (
        <div className="menu-dropdown">
          <button onClick={onEditar}><i className="bi bi-pencil-square me-2"></i>Editar</button>
          <button onClick={onExcluir}><i className="bi bi-trash me-2"></i>Excluir</button>
        </div>
      )}
    </div>
  );
}

export default ProdutoOptionsMenu;
