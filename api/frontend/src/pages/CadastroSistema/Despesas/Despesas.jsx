import React, { useState, useEffect } from "react";
import ModalCadastroDespesa from '../../../components/Modals/ModalCadastroDespesa/ModalCadastroDespesa';
import ModalEditaDespesa from '../../../components/Modals/ModalCadastroDespesa/ModalEditaDespesa';
import ModelPage from '../ModelPage';
import styles from './Despesas.module.css';
import { FaMoneyBillWave, FaTrash, FaRegClock } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import axios from 'axios';

function Despesas() {
  const [despesas, setDespesas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [despesaSelecionada, setDespesaSelecionada] = useState(null);
  const [itensPorPagina, setItensPorPagina] = useState(12);
  const [termoBusca, setTermoBusca] = useState('');

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

  // 🔧 Função para buscar despesas (com ou sem filtro)
  const fetchDespesas = async (termo = "") => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `http://localhost:3001/api/despesas?search=${encodeURIComponent(termo)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error("Erro ao buscar despesas");

      const dados = await res.json();
      const despesasNormalizadas = dados.map((d) => ({
        id: d.ID_Despesa,
        nome: d.Nome_Despesa,
        custoMensal: d.Custo_Mensal,
        tempoOperacional: d.Tempo_Operacional,
        data: d.Data_Despesa,
      }));
      setDespesas(despesasNormalizadas);
    } catch (error) {
      console.error("Erro ao buscar despesas:", error);
      Swal.fire('Erro', 'Erro ao buscar despesas. Verifique sua autenticação.', 'error');
    }
  };

  // 🔁 Buscar ao carregar ou quando o termoBusca mudar
  useEffect(() => {
    fetchDespesas(termoBusca);
  }, [termoBusca]);

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

  const atualizarDespesa = async (atualizada) => {
  const token = localStorage.getItem("token");

  try {
    const params = new URLSearchParams();
    params.append("nome", atualizada.nome);
    params.append("custoMensal", atualizada.custoMensal.toString());
    params.append("tempoOperacional", atualizada.tempoOperacional.toString());

    await axios.put(
      `http://localhost:3001/api/despesas/${atualizada.id}`,
      params,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded', // 👈 essencial
        },
      }
    );

    await fetchDespesas(); // recarrega lista
    Swal.fire("Sucesso", "Despesa atualizada com sucesso!", "success");
  } catch (err) {
    console.error("Erro ao atualizar despesa:", err);
    Swal.fire("Erro", "Erro ao atualizar a despesa.", "error");
  } finally {
    setMostrarModalEditar(false);
    setDespesaSelecionada(null);
  }
};

  const removerDespesa = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:3001/api/despesas/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDespesas((prev) => prev.filter((d) => d.id !== id));
      Swal.fire('Excluída!', 'A despesa foi removida.', 'success');
    } catch (error) {
      console.error('Erro ao excluir despesa:', error);
      Swal.fire('Erro', 'Não foi possível remover a despesa.', 'error');
    }
  };

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
        style={{ cursor: 'pointer' }}
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
      itensPorPagina={itensPorPagina}
      termoBusca={termoBusca}
      setTermoBusca={setTermoBusca}
    />
  );
}

export default Despesas;
