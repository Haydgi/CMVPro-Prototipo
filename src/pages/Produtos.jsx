import { useState } from 'react';
import '../assets/global.css'
import '../assets/Itens.css'

function Produtos() {
  const [produtos, setProdutos] = useState([]);

  const modelos = [
    { icone: "bi-egg", nome: "Comida1" },
    { icone: "bi-apple", nome: "Comida2" },
    { icone: "bi-lightning-charge", nome: "Energia" }
  ];

  function adicionarProduto() {
    const aleatorio = modelos[Math.floor(Math.random() * modelos.length)];

    setProdutos((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        nome: `Produto ${prev.length + 1}`,
        preco: "9,99",
        icone: aleatorio.icone
      }
    ]);
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Produtos cadastrados</h2>
        <div className="d-flex">
          <input type="text" className="form-control search-bar me-2" placeholder="Pesquise um Produto" />
          <button className="add-btn" onClick={adicionarProduto}>
            <i className="bi bi-plus-circle"></i>
          </button>
        </div>
      </div>

      {produtos.length === 0 ? (
        <div id="sem-produtos" className="text-center mt-5">
          <p>Não há produtos cadastrados</p>
          <button className="btn btn-warning" onClick={adicionarProduto}>
            <i className="bi bi-plus-circle"></i> Criar meu Primeiro Produto
          </button>
        </div>
      ) : (
        <div id="container-produtos" className="mt-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {produtos.map((p) => (
            <div className="card-produto" key={p.id}>
              <h5><i className={`bi ${p.icone}`}></i> {p.nome}</h5>
              <p className="text-muted">{p.preco} R$/Kg</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Produtos;
