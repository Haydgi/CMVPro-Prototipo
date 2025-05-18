import { useState } from 'react';
import ModalCadastroProduto from '../../../components/Modals/ModalCadastroProduto/ModalCadastroIngrediente';
import ModalEditaIngrediente from '../../../components/Modals/ModalCadastroProduto/ModalEditaIngrediente';
import ModelPage from '../ModelPage';
import styles from '../itens.module.css';
import { GiMeat, GiFruitBowl, GiPumpkin, GiPeanut, GiWrappedSweet } from "react-icons/gi";
import { CiWheat, CiDroplet } from "react-icons/ci";
import { LuMilk } from "react-icons/lu";
import { TbSalt } from "react-icons/tb";
import Swal from "sweetalert2";
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

function Ingredientes() {
  const [ingredientes, setIngredientes] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [ingredienteSelecionado, setIngredienteSelecionado] = useState(null);

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

  const salvarIngrediente = (novo) => {
    setIngredientes((prev) => [
      ...prev,
      {
        ...novo,
        id: prev.length + 1,
        icone: iconesCategorias[novo.categoria],
        unidadeCompra: novo.unidadeCompra,
      },
    ]);
    setMostrarModal(false);
  };

  const atualizarIngrediente = (atualizado) => {
  setIngredientes((prev) =>
    prev.map((i) =>
      i.id === atualizado.id
        ? {
            ...atualizado,
            icone: iconesCategorias[atualizado.categoria],
          }
        : i
    )
  );
  setMostrarModalEditar(false);
  setIngredienteSelecionado(null);
};

  const removerIngrediente = (id) => {
    setIngredientes((prev) => prev.filter((i) => i.id !== id));
  };

  const renderCard = (ingrediente) => (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={ingrediente.id}>
      <div
        className={styles.cardProduto}
        onClick={() => {
          setIngredienteSelecionado(ingrediente);
          setMostrarModalEditar(true);
        }}
        style={{ cursor: "pointer" }}
      >
        <div className={styles.cardIcon}>{ingrediente.icone}</div>
        <h5 className={styles.cardTitle}>{ingrediente.nome}</h5>
        <p className={styles.cardPrice}>
          {(ingrediente.preco || ingrediente.custo)} R$/{ingrediente.unidadeCompra}
        </p>
        <div className={styles.cardAction}>
          <i
            className={styles.Trash}
            style={{ cursor: "pointer" }}
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
                  Swal.fire('Excluído!', 'O ingrediente foi removido.', 'success');
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
      ModalCadastro={ModalCadastroProduto}
      ModalEditar={() => (
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
      )}
      renderCard={renderCard}
      itensPorPagina={12}
    />
  );
}

export default Ingredientes;
