import { useState } from 'react';
import ModalCadastroDespesa from '../../../components/Modals/ModalCadastroDespesa/ModalCadastroDespesa';
import ModalEditaIngrediente from '../../../components/Modals/ModalCadastroIngrediente/ModalEditaIngrediente';
import ModelPage from '../ModelPage';
import styles from '../itens.module.css';
import { FaMoneyBillWave, FaUtensils, FaCar, FaHome, FaHeartbeat, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

function Despesas() {
  const [despesas, setDespesas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [despesaSelecionada, setDespesaSelecionada] = useState(null);

  const iconesCategorias = {
    Alimentação: <FaUtensils />,
    Transporte: <FaCar />,
    Moradia: <FaHome />,
    Saúde: <FaHeartbeat />,
    Outros: <FaMoneyBillWave />,
  };

  const salvarDespesa = (nova) => {
    setDespesas((prev) => [
      ...prev,
      {
        ...nova,
        id: prev.length + 1,
        icone: iconesCategorias[nova.categoria] || <FaMoneyBillWave />,
        unidade: nova.unidade || 'unid.',
      },
    ]);
    setMostrarModal(false);
  };

  const atualizarDespesa = (atualizada) => {
    setDespesas((prev) =>
      prev.map((d) =>
        d.id === atualizada.id
          ? {
              ...atualizada,
              icone: iconesCategorias[atualizada.categoria] || <FaMoneyBillWave />,
            }
          : d
      )
    );
    setMostrarModalEditar(false);
    setDespesaSelecionada(null);
  };

  const removerDespesa = (id) => {
    setDespesas((prev) => prev.filter((d) => d.id !== id));
  };

  const renderCard = (despesa) => (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={despesa.id}>
      <div
        className={styles.cardProduto}
        onClick={() => {
          setDespesaSelecionada(despesa);
          setMostrarModalEditar(true);
        }}
        style={{ cursor: "pointer" }}
      >
        <div className={styles.cardIcon}>{despesa.icone}</div>
        <h5 className={styles.cardTitle}>{despesa.nome}</h5>
        <p className={styles.cardPrice}>
          {despesa.valor} R$
        </p>
        <div className={styles.cardAction}>
          <i
            className={styles.Trash}
            onClick={(e) => {
              e.stopPropagation();
              Swal.fire({
                title: 'Tem certeza?',
                text: 'Você deseja excluir esta despesa?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#EF4444',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sim, excluir',
                cancelButtonText: 'Cancelar',
              }).then((result) => {
                if (result.isConfirmed) {
                  removerDespesa(despesa.id);
                  Swal.fire('Excluída!', 'A despesa foi removida.', 'success');
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
      titulo="Despesas cadastradas"
      dados={despesas}
      salvarItem={salvarDespesa}
      removerItem={removerDespesa}
      abrirModal={() => setMostrarModal(true)}
      fecharModal={() => setMostrarModal(false)}
      abrirModalEditar={() => setMostrarModalEditar(true)}
      fecharModalEditar={() => setMostrarModalEditar(false)}
      mostrarModal={mostrarModal}
      mostrarModalEditar={mostrarModalEditar}
      ModalCadastro={ModalCadastroDespesa}
      ModalEditar={() => (
        despesaSelecionada && (
          <ModalEditaIngrediente
            ingrediente={despesaSelecionada}
            onClose={() => {
              setMostrarModalEditar(false);
              setDespesaSelecionada(null);
            }}
            onSave={atualizarDespesa}
          />
        )
      )}
      renderCard={renderCard}
      itensPorPagina={12}
    />
  );
}

export default Despesas; 
