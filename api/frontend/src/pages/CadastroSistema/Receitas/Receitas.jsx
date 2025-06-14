import { useState, useEffect } from 'react';
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
  const [itensPorPagina, setItensPorPagina] = useState(8); // Padrão: 8 itens por página

  // Detecta a largura da tela e ajusta o número de itens por página
  useEffect(() => {
    const ajustarItensPorPagina = () => {
      if (window.innerWidth <= 576) {
        setItensPorPagina(2); // Mobile: 2 itens por página
      } else if (window.innerWidth <= 768 && window.innerWidth > 576) {
        setItensPorPagina(4);
      } else if (window.innerWidth <= 991 && window.innerWidth > 768) {
        setItensPorPagina(6);
      } else {
        setItensPorPagina(8); // Padrão: 8 itens por página
      }
    };

    ajustarItensPorPagina(); // Ajusta ao carregar a página
    window.addEventListener('resize', ajustarItensPorPagina); // Ajusta ao redimensionar a janela

    return () => {
      window.removeEventListener('resize', ajustarItensPorPagina); // Remove o listener ao desmontar
    };
  }, []);

  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
  const apiUrl = `${baseUrl}/api/receitas`;

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(apiUrl, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao buscar receitas');
        return res.json();
      })
      .then(data => {
        const receitasFormatadas = Array.isArray(data)
          ? data.map(r => ({ ...r, id: r.ID_Receita })) // Aqui converte ID_Receita para id
          : Array.isArray(data.receitas)
            ? data.receitas.map(r => ({ ...r, id: r.ID_Receita }))
            : [];

        setReceitas(receitasFormatadas);
      })
      .catch(err => {
        console.error(err);
        setReceitas([]);
      });
  }, [apiUrl, token]);

  const salvarReceita = async (novaReceita) => {
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify(novaReceita),
      });

      if (!res.ok) throw new Error('Erro ao salvar receita');

      const receitaSalva = await res.json();
      setReceitas(prev => [...prev, { ...receitaSalva, id: receitaSalva.ID_Receita }]); // idem aqui
      setMostrarModal(false);
      Swal.fire('Sucesso', 'Receita criada com sucesso!', 'success');
    } catch (error) {
      console.error(error);
      Swal.fire('Erro', 'Não foi possível salvar a receita.', 'error');
    }
  };

  const atualizarReceita = async (receitaAtualizada) => {
    try {
      const res = await fetch(`${apiUrl}/${receitaAtualizada.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify(receitaAtualizada),
      });

      if (!res.ok) throw new Error('Erro ao atualizar receita');

      const receitaAtual = await res.json();
      setReceitas(prev =>
        prev.map(r => (r.id === receitaAtual.ID_Receita ? { ...receitaAtual, id: receitaAtual.ID_Receita } : r))
      );
      setMostrarModalEditar(false);
      setReceitaSelecionada(null);
      Swal.fire('Sucesso', 'Receita atualizada com sucesso!', 'success');
    } catch (error) {
      console.error(error);
      Swal.fire('Erro', 'Não foi possível atualizar a receita.', 'error');
    }
  };

  const removerReceita = async (id) => {
    console.log('removerReceita chamada com id:', id);
    if (!id) {
      console.error('ID inválido para remover receita');
      Swal.fire('Erro', 'ID inválido para remover receita.', 'error');
      return;
    }
    try {
      const res = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
        }
      });

      if (!res.ok) throw new Error('Erro ao excluir receita');

      setReceitas(prev => prev.filter(r => r.id !== id));
      Swal.fire('Excluído!', 'A receita foi removida.', 'success');
    } catch (error) {
      console.error(error);
      Swal.fire('Erro', 'Não foi possível remover a receita.', 'error');
    }
  };

  const renderCard = (receita) => {
    if (!receita) return null; // Verifica se a receita existe antes de renderizar

    return (
      <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={receita.id}>
        <div
          className={styles.cardReceita}
          onClick={() => {
            setReceitaSelecionada(receita);
            setMostrarModalEditar(true);
          }}
          style={{ cursor: "pointer" }}
        >
          {receita.Imagem_URL ? (
            <div
              className="rounded mb-2 border"
              style={{
                width: "170px",
                height: "170px",
                backgroundImage: `url(${receita.Imagem_URL})`,
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

          <h5 className="fw-bold mb-1">{receita.Nome_Receita || "Sem Nome"}</h5>
          <p className="mb-1 fs-6">{receita.Categoria || "Sem Categoria"}</p>

          <div className="d-flex justify-content-between fs-6 mb-1">
            <span>⏱ {receita.Tempo_Preparo ?? 0} min</span>
            <span>Lucro: {receita.Porcentagem_De_Lucro ?? 0}%</span>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <p className="fw-bold mb-0">
              Custo: R$ {Number(receita.Custo_Total_Ingredientes ?? 0).toFixed(2)} Uni.
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
                    removerReceita(receita.id || receita.ID_Receita);
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
  };

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
      renderCard={(receita) => (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={receita.id}>
          <div
            className={styles.cardReceita}
            onClick={() => {
              setReceitaSelecionada(receita);
              setMostrarModalEditar(true);
            }}
            style={{ cursor: "pointer" }}
          >
            {receita.Imagem_URL ? (
              <div
                className="rounded mb-2 border"
                style={{
                  width: "170px",
                  height: "170px",
                  backgroundImage: `url(${receita.Imagem_URL})`,
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

            <h5 className="fw-bold mb-1">{receita.Nome_Receita}</h5>
            <p className="mb-1 fs-6">{receita.Categoria}</p>

            <div className="d-flex justify-content-between fs-6 mb-1">
              <span>⏱ {receita.Tempo_Preparo} min</span>
              <span>Lucro: {receita.Porcentagem_De_Lucro}%</span>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <p className="fw-bold mb-0">
                Custo: R$ {Number(receita.Custo_Total_Ingredientes).toFixed(2)} Uni.
              </p>
              <i
                className={styles.Trash}
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("removerReceita chamada com id:", receita.id, receita.ID_Receita);
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
                      removerReceita(receita.id || receita.ID_Receita);
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
      )}
      //itensPorPagina={8}

      //renderCard={renderCard}
      itensPorPagina={itensPorPagina} // Dinamicamente ajustado
    />
  );
}

export default Receitas;