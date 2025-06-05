import { useEffect, useState } from 'react';
import ModalCadastroIngrediente from '../../../components/Modals/ModalCadastroIngrediente/ModalCadastroIngrediente';
import ModalEditaIngrediente from '../../../components/Modals/ModalCadastroIngrediente/ModalEditaIngrediente';
import ModelPage from '../ModelPage';
import styles from '../itens.module.css';

import { GiMeat, GiFruitBowl, GiPumpkin, GiPeanut, GiWrappedSweet } from "react-icons/gi";
import { CiWheat, CiDroplet } from "react-icons/ci";
import { LuMilk } from "react-icons/lu";
import { TbSalt } from "react-icons/tb";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

function Ingredientes() {
  const [ingredientes, setIngredientes] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [ingredienteSelecionado, setIngredienteSelecionado] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  const iconesCategorias = {
    Carnes: <GiMeat />,
    Doces: <GiWrappedSweet />,
    Farináceos: <CiWheat />,
    Frutas: <GiFruitBowl />,
    Laticínios: <LuMilk />,
    "Legumes e Verduras": <GiPumpkin />,
    Líquidos: <CiDroplet />,
    "Óleos e Gorduras": <CiDroplet />,
    Oleaginosas: <GiPeanut />,
    "Temperos e Condimentos": <TbSalt />,
  };

  const getToken = () => localStorage.getItem('token');

  useEffect(() => {
    async function fetchIngredientes() {
      const token = getToken();
      if (!token) return;

      try {
        const res = await fetch(`${API_URL}/api/ingredientes`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!res.ok) throw new Error('Erro ao buscar ingredientes');
        const data = await res.json();

        const formatados = data.map(item => ({
          ...item,
          id: item.ID_Ingredientes,
          nome: item.Nome_Ingrediente,
          preco: item.Custo_Ingrediente,
          unidadeCompra: item.Unidade_Compra,
          categoria: item.Categoria,
          icone: iconesCategorias[item.Categoria] || "❓",
        }));

        setIngredientes(formatados);
      } catch (error) {
        console.error('Erro:', error);
        Swal.fire('Erro', 'Falha ao buscar ingredientes.', 'error');
      }
    }

    fetchIngredientes();
  }, [API_URL]);

  const salvarIngrediente = async (novoIngrediente) => {
    const token = getToken();
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/api/ingredientes`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoIngrediente)
      });

      if (!res.ok) throw new Error('Erro ao salvar ingrediente');
      const salvo = await res.json();

      setIngredientes(prev => [
        ...prev,
        {
          ...salvo,
          id: salvo.ID_Ingredientes,
          nome: salvo.Nome_Ingrediente,
          preco: salvo.Custo_Ingrediente,
          unidadeCompra: salvo.Unidade_Compra,
          categoria: salvo.Categoria,
          icone: iconesCategorias[salvo.Categoria] || "❓"
        }
      ]);

      setMostrarModal(false);
      Swal.fire('Sucesso', 'Ingrediente cadastrado!', 'success');
    } catch (err) {
      Swal.fire('Erro', 'Erro ao cadastrar ingrediente.', 'error');
    }
  };

  const atualizarIngrediente = async (ingredienteAtualizado) => {
    const token = getToken();
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/api/ingredientes/${ingredienteAtualizado.ID_Ingredientes}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ingredienteAtualizado)
      });

      if (!res.ok) throw new Error('Erro ao atualizar ingrediente');

      setIngredientes(prev =>
        prev.map(i =>
          i.id === ingredienteAtualizado.ID_Ingredientes
            ? {
                ...ingredienteAtualizado,
                id: ingredienteAtualizado.ID_Ingredientes,
                nome: ingredienteAtualizado.Nome_Ingrediente,
                preco: ingredienteAtualizado.Custo_Ingrediente,
                unidadeCompra: ingredienteAtualizado.Unidade_Compra,
                categoria: ingredienteAtualizado.Categoria,
                icone: iconesCategorias[ingredienteAtualizado.Categoria] || "❓"
              }
            : i
        )
      );

      setMostrarModalEditar(false);
      setIngredienteSelecionado(null);
      Swal.fire('Sucesso', 'Ingrediente atualizado!', 'success');
    } catch (err) {
      Swal.fire('Erro', 'Erro ao atualizar ingrediente.', 'error');
    }
  };

  const removerIngrediente = async (id) => {
    const token = getToken();
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/api/ingredientes/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) throw new Error('Erro ao remover ingrediente');

      setIngredientes(prev => prev.filter(i => i.id !== id));
      Swal.fire('Excluído!', 'Ingrediente removido com sucesso.', 'success');
    } catch (err) {
      Swal.fire('Erro', 'Erro ao remover ingrediente.', 'error');
    }
  };

  const renderCard = (ingrediente) => (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={ingrediente.id}>
      <div
        className={styles.cardProduto}
        onClick={() => {
          setIngredienteSelecionado(ingrediente);
          setMostrarModalEditar(true);
        }}
        style={{ cursor: 'pointer' }}
      >
        <div className={styles.cardIcon}>{ingrediente.icone}</div>
        <h5 className={styles.cardTitle}>{ingrediente.nome}</h5>
        <p className={styles.cardPrice}>
          {(ingrediente.preco || 0).toFixed(2)} R$ / {ingrediente.unidadeCompra}
        </p>
        <div className={styles.cardAction}>
          <i
            className={styles.Trash}
            onClick={(e) => {
              e.stopPropagation();
              Swal.fire({
                title: 'Tem certeza?',
                text: 'Você deseja excluir este ingrediente?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#EF4444',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sim, excluir',
                cancelButtonText: 'Cancelar',
              }).then((result) => {
                if (result.isConfirmed) {
                  removerIngrediente(ingrediente.id);
                }
              });
            }}
          >
            <FaTrash />
          </i>
        </div>
      </div>
    </div>
  );

  return (
    <ModelPage
      titulo="Ingredientes cadastrados"
      dados={ingredientes}
      salvarItem={salvarIngrediente}
      removerItem={removerIngrediente}
      abrirModal={() => setMostrarModal(true)}
      fecharModal={() => setMostrarModal(false)}
      abrirModalEditar={() => setMostrarModalEditar(true)}
      fecharModalEditar={() => setMostrarModalEditar(false)}
      mostrarModal={mostrarModal}
      mostrarModalEditar={mostrarModalEditar}
      ModalCadastro={ModalCadastroIngrediente}
      ModalEditar={() =>
        ingredienteSelecionado && (
          <ModalEditaIngrediente
            ingrediente={ingredienteSelecionado}
            onClose={() => {
              setMostrarModalEditar(false);
              setIngredienteSelecionado(null);
            }}
            onSave={atualizarIngrediente}
          />
        )
      }
      renderCard={renderCard}
      itensPorPagina={8}
    />
  );
}

export default Ingredientes;
