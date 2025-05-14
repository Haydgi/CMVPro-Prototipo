import { useEffect, useState } from 'react';
import ModalCadastroProduto from '../../../components/Modals/ModalCadastroProduto/ModalCadastroProduto';
import ModalEditaIngrediente from '../../../components/Modals/ModalCadastroProduto/ModalEditaIngrediente';
import Navbar from '../../../components/Navbar/Navbar';
import styles from '../itens.module.css';
import { FaRegTrashAlt } from "react-icons/fa";
import { GiMeat, GiFruitBowl, GiPumpkin, GiPeanut, GiWrappedSweet } from "react-icons/gi";
import { CiWheat, CiDroplet } from "react-icons/ci";
import { LuMilk } from "react-icons/lu";
import { TbSalt } from "react-icons/tb";
import { MdLocalDrink } from "react-icons/md";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState(0);

  const iconesCategorias = {
    Carnes: <GiMeat />,
    Doces: <GiWrappedSweet />,
    Farináceos: <CiWheat />,
    Frutas: <GiFruitBowl />,
    Laticínios: <LuMilk />,
    "Legumes e Verduras": <GiPumpkin />,
    Líquidos: <MdLocalDrink />,
    "Óleos e Gorduras": <CiDroplet />,
    Oleaginosas: <GiPeanut />,
    "Temperos e Condimentos": <TbSalt />,
  };

  useEffect(() => {
    document.body.classList.add('produtos-page');
    return () => {
      document.body.classList.remove('produtos-page');
    };
  }, []);

  const abrirModal = () => setMostrarModal(true);
  const fecharModal = () => setMostrarModal(false);

  const abrirModalEditar = () => setMostrarModalEditar(true);
  const fecharModalEditar = () => setMostrarModalEditar(false);

  const salvarProduto = (produto) => {
  setProdutos((prev) => {
    const existe = prev.find(p => p.id === produto.id);

    if (existe) {
      // Atualizar produto existente
      return prev.map(p => p.id === produto.id ? { ...produto } : p);
    }

    // Adicionar novo produto
    return [
      ...prev,
      {
        ...produto,
        id: prev.length + 1, // gera novo id se for novo
        icone: iconesCategorias[produto.categoria] || <TbSalt />,
        unidadeCompra: produto.unidadeCompra || "Kg",
      },
    ];
  });
};

  const removerProduto = (id) => {
    setProdutos((prev) => prev.filter((p) => p.id !== id));
  };

  const itensPorPagina = 12;
  const totalPaginas = Math.ceil(produtos.length / itensPorPagina);

  const produtosExibidos = produtos.slice(
    paginaAtual * itensPorPagina,
    (paginaAtual + 1) * itensPorPagina
  );

  const mudarPagina = ({ selected }) => {
    setPaginaAtual(selected);
  };

  return (
    <>
      <Navbar />
      {mostrarModal && (
        <ModalCadastroProduto
          onClose={fecharModal}
          onSave={salvarProduto}
        />
      )}

      {mostrarModalEditar && (
        <ModalEditaIngrediente
          onClose={fecharModalEditar}
          onSave={salvarProduto}
        />
      )}

      <div className={` ${styles.pageContent}`}>
        <div className="container mt-4">
          <div className="d-flex align-items-center" style={{ minHeight: 56 }}>
            <div style={{ flex: 1 }}></div>
            <h2 className={`${styles.title} m-0`} style={{ flex: 1, textAlign: "center" }}>
              Ingredientes cadastrados
            </h2>
            <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
              <div className={styles.searchBarContainer}>
                <input
                  type="text"
                  className={`form-control ${styles.searchBar} me-2`}
                  placeholder="Pesquise um Produto"
                />
                <button
                  className={styles.searchButton}
                  onClick={() => {}}
                >
                  <i className="bi bi-search me-2"></i>
                </button>
              </div>
              <button className={`${styles.addBtn} ${"btnUltraViolet btn"}`} onClick={abrirModal}>
                <i className="bi bi-plus-circle"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="container mt-4">
          {produtos.length === 0 ? (
            <div id="sem-produtos" className={`text-center mt-5 ${styles.emptyState}`}>
              <p>Não há ingredientes cadastrados</p>
              <button className={`${styles.btnDetails} ${"btnUltraViolet btn"}`} onClick={abrirModal}>
                <p className={styles.btnText}><i className="bi bi-plus-circle"></i> Criar meu Primeiro Produto</p>
              </button>
            </div>
          ) : (
            <div className="row">
              {produtosExibidos.map((p) => (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={p.id}>
                  <div
                    className={styles.cardProduto}
                    onClick={abrirModalEditar}
                    style={{ cursor: "pointer" }}
                  >
                    <div className={styles.cardIcon}>{p.icone}</div>
                    <h5 className={styles.cardTitle}>{p.nome}</h5>
                    <p className={styles.cardPrice}>
                      {(p.preco || p.custo)} R$/{p.unidadeCompra}
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
                            customClass: {
                              popup: 'rounded-4 shadow-lg',
                              confirmButton: styles.btnCancel,

                              cancelButton: styles.btnAlt
                            },
                            buttonsStyling: false
                          }).then((result) => {
                            if (result.isConfirmed) {
                              removerProduto(p.id);
                              Swal.fire({
                                title: 'Excluído!',
                                text: 'O ingrediente foi removido.',
                                icon: 'success',
                                timer: 1500,
                                showConfirmButton: false
                              });
                            }
                          });
                        }}

                        title="Excluir"
                      >
                        <FaRegTrashAlt />
                      </i>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {produtos.length > itensPorPagina && (
          <div className="d-flex justify-content-center mt-4">
            <ReactPaginate
              previousLabel={<i className="bi bi-arrow-left"></i>}
              nextLabel={<i className="bi bi-arrow-right"></i>}
              pageCount={totalPaginas}
              onPageChange={mudarPagina}
              containerClassName={styles.pagination}
              activeClassName={styles.active}
              previousClassName={styles.pageItem}
              nextClassName={styles.pageItem}
              pageClassName={styles.pageItem}
              pageLinkClassName={styles.pageLink}
              previousLinkClassName={styles.pageLink}
              nextLinkClassName={styles.pageLink}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Produtos;
