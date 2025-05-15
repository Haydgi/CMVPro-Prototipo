import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import styles from './itens.module.css';
import ReactPaginate from "react-paginate";

function ModelPage({
    titulo,
    dados,
    salvarItem,
    removerItem,
    abrirModal,
    fecharModal,
    abrirModalEditar,
    fecharModalEditar,
    mostrarModal,
    mostrarModalEditar,
    ModalCadastro,
    ModalEditar,
    renderCard,
    itensPorPagina = 12,
}) {
    useEffect(() => {
        document.body.classList.add('produtos-page');
        return () => {
            document.body.classList.remove('produtos-page');
        };
    }, []);

    const totalPaginas = Math.ceil(dados.length / itensPorPagina);
    const [paginaAtual, setPaginaAtual] = React.useState(0);

    const dadosExibidos = dados.slice(
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
                <ModalCadastro
                    onClose={fecharModal}
                    onSave={salvarItem}
                />
            )}

            {mostrarModalEditar && (
                <ModalEditar
                    onClose={fecharModalEditar}
                    onSave={salvarItem}
                />
            )}

            <div className={styles.pageContent}>
                <div className="container mt-4">
                    <div className="d-flex align-items-center" style={{ minHeight: 56 }}>
                        <div style={{ flex: 1 }}></div>
                        <h2 className={`${styles.title} m-0`} style={{ flex: 1, textAlign: "center" }}>
                            {titulo}
                        </h2>
                        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                            <button className={`${styles.addBtn} btnUltraViolet btn`} onClick={abrirModal}>
                                <i className="bi bi-plus-circle"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="container mt-4">
                    {dados.length === 0 ? (
                        <div id="sem-dados" className={`text-center mt-5 ${styles.emptyState}`}>
                            <p>Não há itens cadastrados</p>
                            <button className={`${styles.btnDetails} btnUltraViolet btn`} onClick={abrirModal}>
                                <p className={styles.btnText}><i className="bi bi-plus-circle"></i> Criar o Primeiro Item</p>
                            </button>
                        </div>
                    ) : (
                        <div className="row">
                            {dadosExibidos.map(renderCard)}
                        </div>
                    )}
                </div>

                {dados.length > itensPorPagina && (
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

export default ModelPage;