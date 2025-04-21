import { useState } from 'react';
import ModalCadastroReceita from '../components/ModalCadastroReceita';

function Receitas() {
  const [receitas, setReceitas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  const listaReceitas = [
    { imagem: `${import.meta.env.BASE_URL}midia/receita1.jpg` },
    { imagem: `${import.meta.env.BASE_URL}midia/receita2.png` },
    { imagem: `${import.meta.env.BASE_URL}midia/receita3.webp` }
  ];

  function adicionarReceita() {
    const aleatoria = listaReceitas[Math.floor(Math.random() * listaReceitas.length)];
    setReceitas((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        imagem: aleatoria.imagem,
        nome: `Receita ${prev.length + 1}`,
        categoria: "Sobremesa",
        margemLucro: "40",
        preco: "32,02"
      }
    ]);
  }

  function salvarNovaReceita(novaReceita) {
    const nova = {
      ...novaReceita,
      id: receitas.length + 1,
      imagem: novaReceita.imagem ? URL.createObjectURL(novaReceita.imagem) : listaReceitas[0].imagem
    };
    setReceitas((prev) => [...prev, nova]);
    setMostrarModal(false);
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Receitas cadastradas</h2>
        <div className="d-flex">
          <input
            type="text"
            className="form-control search-bar me-2"
            placeholder="Pesquise uma Receita"
          />
          <button className="add-btn" onClick={() => setMostrarModal(true)}>
            <i className="bi bi-plus-circle"></i>
          </button>
        </div>
      </div>

      {receitas.length === 0 ? (
        <div id="sem-receitas" className="text-center mt-5">
          <p>Não há receitas cadastradas</p>
          <button className="btn btn-warning" onClick={() => setMostrarModal(true)}>
            <i className="bi bi-plus-circle"></i> Criar minha Primeira Receita
          </button>
        </div>
      ) : (
        <div id="container-receitas" className="mt-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {receitas.map((r) => (
            <div className="card-receita" key={r.id}>
              <img src={r.imagem} alt="Imagem da Receita" className="card-img" />
              <h5>{r.nome}</h5>
              <p className="text-muted">Categoria: {r.categoria}</p>
              <p className="text-muted">Margem de Lucro: {r.margemLucro}%</p>
              <p className="text-muted">R$ {r.preco}</p>
            </div>
          ))}
        </div>
      )}

      {mostrarModal && (
        <ModalCadastroReceita
          onClose={() => setMostrarModal(false)}
          onSave={salvarNovaReceita}
        />
      )}
    </div>
  );
}

export default Receitas;
