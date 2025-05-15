import { useState } from 'react';
import ModalCadastroReceita from '../../../components/Modals/ModalCadastroReceita/ModalCadastroReceita';
import ModelPage from '../ModelPage';

function Receitas() {
  const [receitas, setReceitas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  const salvarReceita = (novaReceita) => {
    setReceitas((prev) => [
      ...prev,
      {
        ...novaReceita,
        id: prev.length + 1,
      },
    ]);
    setMostrarModal(false);
  };

  const removerReceita = (id) => {
    setReceitas((prev) => prev.filter((r) => r.id !== id));
  };

  const renderCard = (receita) => (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={receita.id}>
      <div className="card-receita">
        <img src={receita.imagem} alt="Imagem da Receita" className="card-img" />
        <h5>{receita.nome}</h5>
        <p className="text-muted"><strong>Categoria:</strong> {receita.categoria}</p>
        <p className="text-muted"><strong>Lucro:</strong> {receita.margemLucro ? `${receita.margemLucro}%` : "--%"}</p>
        <p className="text-muted"><strong>Preço Final:</strong> R$ {receita.preco || "-,--"}</p>
      </div>
    </div>
  );

  return (
    <ModelPage
      titulo="Receitas cadastradas"
      dados={receitas}
      salvarItem={salvarReceita}
      removerItem={removerReceita}
      abrirModal={() => setMostrarModal(true)}
      fecharModal={() => setMostrarModal(false)}
      mostrarModal={mostrarModal}
      ModalCadastro={ModalCadastroReceita}
      renderCard={renderCard}
    />
  );
}

export default Receitas;
