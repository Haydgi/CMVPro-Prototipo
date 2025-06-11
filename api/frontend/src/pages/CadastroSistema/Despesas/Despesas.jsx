import { useState, useEffect } from 'react';
import ModalCadastroDespesa from '../../../components/Modals/ModalCadastroDespesa/ModalCadastroDespesa';
import ModalEditaDespesa from '../../../components/Modals/ModalCadastroDespesa/ModalEditaDespesa';
import ModelPage from '../ModelPage';
import styles from './Despesas.module.css';
import { FaMoneyBillWave, FaTrash, FaRegClock } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { MdOutlineCalendarMonth } from "react-icons/md";

function Despesas() {
  const [despesas, setDespesas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [despesaSelecionada, setDespesaSelecionada] = useState(null);
  const [itensPorPagina, setItensPorPagina] = useState(12); // Padrão: 12 itens por página

  // Ajusta o número de itens por página dinamicamente
 useEffect(() => {
    const ajustarItensPorTamanho = () => {
      const largura = window.innerWidth;

      if (largura < 577) {
        setItensPorPagina(4);
      } else if (largura < 761) {
        setItensPorPagina(4);
      } else if (largura < 992) {
        setItensPorPagina(6);
      } else {
        setItensPorPagina(8);
      }
    };

    ajustarItensPorTamanho();
    window.addEventListener('resize', ajustarItensPorTamanho);

    return () => window.removeEventListener('resize', ajustarItensPorTamanho);
  }, []);

  const salvarDespesa = (nova) => {
    setDespesas((prev) => [
      ...prev,
      {
        ...nova,
        id: prev.length + 1,
      },
    ]);
    setMostrarModal(false);
  };

  const atualizarDespesa = (atualizada) => {
    setDespesas((prev) =>
      prev.map((d) => (d.id === atualizada.id ? atualizada : d))
    );
    setMostrarModalEditar(false);
    setDespesaSelecionada(null);
  };

  const removerDespesa = (id) => {
    setDespesas((prev) => prev.filter((d) => d.id !== id));
  };

  // Função para adicionar uma despesa genérica
  const adicionarDespesaGenerica = () => {
    const despesaGenerica = {
      id: despesas.length + 1,
      nome: "Despesa Genérica",
      custoMensal: 100.0,
      tempoOperacional: 10,
    };
    setDespesas((prev) => [...prev, despesaGenerica]);
  };

  const renderCard = (despesa) => (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={despesa.id}>
      <div
        className={styles.cardDespesa}
        onClick={() => {
          setDespesaSelecionada(despesa);
          setMostrarModalEditar(true);
        }}
        style={{ cursor: "pointer" }}
      >
        <h3 className="fw-bold mb-5 mt-3">{despesa.nome}</h3>

        <div className="d-flex justify-content-between text-white fs-5">
          <span className="d-flex align-items-center">
            <MdOutlineCalendarMonth className="me-2" />
            R$ {Number(despesa.custoMensal).toFixed(2)}
          </span>
          <span className="d-flex align-items-center">
            <FaRegClock className="me-2" />
            {despesa.tempoOperacional}h
          </span>
        </div>

        <div className="d-flex justify-content-end mt-2">
          <i
            className={styles.Trash}
            style={{ cursor: "pointer" }}
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
      titulo={
        <span
          onClick={adicionarDespesaGenerica}
          style={{ cursor: "pointer", textDecoration: "underline" }}
        >
          Despesas cadastradas
        </span>
      }
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
      ModalEditar={() =>
        despesaSelecionada && (
          <ModalEditaDespesa
            despesa={despesaSelecionada}
            onClose={() => {
              setMostrarModalEditar(false);
              setDespesaSelecionada(null);
            }}
            onSave={atualizarDespesa}
          />
        )
      }
      renderCard={renderCard}
      itensPorPagina={itensPorPagina} // Dinamicamente ajustado
    />
  );
}

export default Despesas;
