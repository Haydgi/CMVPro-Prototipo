import { useState } from 'react';
import '../assets/global.css';
import '../assets/Itens.css';
import ModalCadastroProduto from '../components/ModalCadastroProduto';
import ProdutoOptionsMenu from '../components/ProdutoOptionsMenu';


function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);

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

  const editarProduto = (produto) => {
    console.log("Editar produto:", produto);
    // Você pode abrir o ModalCadastroProduto aqui no modo edição, por exemplo
  };
  
  const excluirProduto = (produto) => {
    if (window.confirm(`Deseja realmente excluir o produto "${produto.nome}"?`)) {
      setProdutos((prev) => prev.filter((p) => p.id !== produto.id));
    }
  };
  
  return (
    <div className="container mt-4">
      {mostrarModal && (
        <ModalCadastroProduto
          onClose={fecharModal}
          onSave={salvarProduto}
        />
      )}

      <div className="d-flex justify-content-between align-items-center">
        <h2>Produtos cadastrados</h2>
        <div className="d-flex">
          <input type="text" className="form-control search-bar me-2" placeholder="Pesquise um Produto" />
          <button className="add-btn" onClick={abrirModal}>
            <i className="bi bi-plus-circle"></i>
          </button>
        </div>
      </div>

      {produtos.length === 0 ? (
        <div id="sem-produtos" className="text-center mt-5">
          <p>Não há produtos cadastrados</p>
          <button className="btn btn-warning" onClick={abrirModal}>
            <i className="bi bi-plus-circle"></i> Criar meu Primeiro Produto
          </button>
        </div>
      ) : (
        <div id="container-produtos" className="mt-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {produtos.map((p) => (
          <div className="card-produto position-relative p-3" key={p.id}>
          <ProdutoOptionsMenu
            onEditar={() => editarProduto(p)}
            onExcluir={() => excluirProduto(p)}
          />
          <h5><i className={`${p.icone}`}></i> {p.nome}</h5>
          <p className="text-muted">{p.preco || p.custo} R$/Kg</p>
          </div>
        ))}
        </div>
      )}
    </div>
  );
}

export default Produtos;
