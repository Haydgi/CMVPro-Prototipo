import { useEffect, useState } from 'react';
import ModalCadastroProduto from '../../../components/Modals/ModalCadastroProduto/ModalCadastroProduto';
import Navbar from '../../../components/Navbar/Navbar'; // Importando a Navbar
import styles from '../itens.module.css'; // Importando como CSS Modules

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    // Adiciona a classe ao body quando o componente é montado
    document.body.classList.add('produtos-page');

    // Remove a classe ao desmontar o componente
    return () => {
      document.body.classList.remove('produtos-page');
    };
  }, []);

  const abrirModal = () => setMostrarModal(true);
  const fecharModal = () => setMostrarModal(false);

  const salvarProduto = (produto) => {
    setProdutos((prev) => [
      ...prev,
      {
        ...produto,
        id: prev.length + 1,
        icone: "bi bi-box", // Ícone padrão — ajuste se quiser usar categorias diferentes
      }
    ]);
  };

  return (
    <>
      <Navbar />

      <header id="header-produtos" className={styles.headerProdutos}>
        <div className="d-flex justify-content-between align-items-center container">
          <h2 className={styles.title}>Produtos cadastrados</h2>
          <div className="d-flex">
            <input
              type="text"
              className={`form-control ${styles.searchBar} me-2`}
              placeholder="Pesquise um Produto"
            />
            <button className={styles.addBtn} onClick={abrirModal}>
              <i className="bi bi-plus-circle"></i>
            </button>
          </div>
        </div>
      </header>

      {mostrarModal && (
        <ModalCadastroProduto
          onClose={fecharModal}
          onSave={salvarProduto}
        />
      )}

      {/* Conteúdo principal da página */}
      <div className={` ${styles.pageContent}`}>
        <div className="container mt-4">
        {produtos.length === 0 ? (
          <div id="sem-produtos" className={`text-center mt-5 ${styles.emptyState}`}>
            <p>Não há produtos cadastrados</p>
            <button className="btn btn-warning" onClick={abrirModal}>
              <i className="bi bi-plus-circle"></i> Criar meu Primeiro Produto
            </button>
          </div>
        ) : (
          <div className="row">
            {produtos.slice(0, 8).map((p) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={p.id}>
                <div className={styles.cardProduto}>
                  <h5>
                    <i className={`${p.icone}`}></i> {p.nome}
                  </h5>
                  <p className="text-muted">{p.preco || p.custo} R$/Kg</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
    </>
  );
}

export default Produtos;
