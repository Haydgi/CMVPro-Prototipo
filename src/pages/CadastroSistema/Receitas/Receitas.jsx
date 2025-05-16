import { useState } from 'react';
import ModalCadastroReceita from '../../../components/Modals/ModalCadastroReceita/ModalCadastroReceita';
import ModalEditaReceita from '../../../components/Modals/ModalCadastroReceita/ModalEditaReceita';
import ModelPage from '../ModelPage';
import { FaTrash } from 'react-icons/fa';
import Swal from "sweetalert2";
import styles from './Receitas.module.css';

function Receitas() {
  const [receitas, setReceitas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [receitaSelecionada, setReceitaSelecionada] = useState(null);

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

  const atualizarReceita = (receitaAtualizada) => {
    setReceitas((prev) =>
      prev.map((r) => (r.id === receitaAtualizada.id ? receitaAtualizada : r))
    );
    setMostrarModalEditar(false);
    setReceitaSelecionada(null);
  };

  const removerReceita = (id) => {
    setReceitas((prev) => prev.filter((r) => r.id !== id));
  };

  const renderCard = (receita) => (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={receita.id}>
      <div
        className={styles.cardReceita}
        onClick={() => {
          setReceitaSelecionada(receita);
          setMostrarModalEditar(true);
        }}
        style={{ cursor: "pointer" }}
      >
        {receita.imagem ? (
          <div
            className="rounded mb-2 border"
            style={{
              width: "170px",
              height: "170px",
              backgroundImage: `url(${receita.imagem})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
        ) : (
          <div
            className="rounded bg-light d-flex align-items-center justify-content-center mb-2 border"
            style={{ 
              width: "170px",
              height: "170px",
              marginLeft: "auto",
              marginRight: "auto",
             }}
          >
            <span className="text-muted">Sem imagem</span>
          </div>
        )}

        <h5 className="fw-bold mb-1">{receita.nome}</h5>
        <p className="mb-1 fs-6">{receita.categoria}</p>

        <div className="d-flex justify-content-between fs-6 mb-1">
          <span>⏱ {receita.tempoDePreparo} min</span>
          <span>Lucro: {receita.porcentagemDeLucro}%</span>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <p className="fw-bold mb-0">
            Custo: R$ {Number(receita.custoTotalIngredientes).toFixed(2)} Uni.
          </p>
          <i
            className={styles.Trash}
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation();
              Swal.fire({
                title: 'Tem certeza?',
                text: 'Você deseja excluir esta receita?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#EF4444',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sim, excluir',
                cancelButtonText: 'Cancelar',
              }).then((result) => {
                if (result.isConfirmed) {
                  removerReceita(receita.id);
                  Swal.fire('Excluído!', 'A receita foi removida.', 'success');
                }
              });
            }}
            title="Excluir"
          >
            <FaTrash />
          </i>
        </div>
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
      abrirModalEditar={() => setMostrarModalEditar(true)}
      fecharModalEditar={() => setMostrarModalEditar(false)}
      mostrarModal={mostrarModal}
      mostrarModalEditar={mostrarModalEditar}
      ModalCadastro={ModalCadastroReceita}
      ModalEditar={() => (
        <ModalEditaReceita
          receita={receitaSelecionada}
          onClose={() => {
            setMostrarModalEditar(false);
            setReceitaSelecionada(null);
          }}
          onSave={atualizarReceita}
        />
      )}
      renderCard={renderCard}
      itensPorPagina={8}
    />
  );
}

export default Receitas;
