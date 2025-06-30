import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "../../../Styles/global.css";
import styles from "./ModalCadastroReceita.module.css";
import { FaTrash } from 'react-icons/fa';

function ModalEditaReceita({ onClose, onSave, receita }) {
  const [form, setForm] = useState({
    imagem: null,
    nome: "",
    categoria: "",
    tempoDePreparo: "",
    porcentagemDeLucro: "",
    descricao: "",
    custoTotalIngredientes: "0.00",
    id: null,
  });

  const [ingredienteBusca, setIngredienteBusca] = useState("");
  const [ingredientesSelecionados, setIngredientesSelecionados] = useState([]);
  const [ingredientesDisponiveis, setIngredientesDisponiveis] = useState([]);
  const [isClosing, setIsClosing] = useState(false);
  const [camposInvalidos, setCamposInvalidos] = useState({});
  const [despesas, setDespesas] = useState([]);

  const categorias = [
    "Carnes", "Aves", "Peixes e Frutos do Mar", "Massas", "Arroz e Grãos",
    "Doces", "Sobremesas", "Bolos e Tortas", "Pães e Biscoitos", "Sopas e Caldos",
    "Molhos e Pastas", "Bebidas", "Vegano", "Vegetariano", "Sem Glúten", "Sem Lactose"
  ];

  // Busque ingredientes do banco ao montar o modal
  useEffect(() => {
    async function fetchIngredientes() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3001/api/ingredientes", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setIngredientesDisponiveis(data);
      } catch (err) {
        toast.error("Erro ao buscar ingredientes do banco!");
      }
    }
    fetchIngredientes();
  }, []);

  useEffect(() => {
    if (!receita?.ID_Receita && !receita?.id) return;

    async function fetchReceitaDetalhada() {
      try {
        const token = localStorage.getItem("token");
        const id = receita.ID_Receita || receita.id;
        const res = await fetch(`http://localhost:3001/api/receita-detalhada/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        console.log("Receita detalhada recebida:", data);
        // Atualize o estado com os dados detalhados
        setForm({
          imagem: data.imagem_URL || null,
          nome: data.Nome_Receita || "",
          categoria: data.Categoria || "",
          tempoDePreparo: data.Tempo_Preparo || "",
          porcentagemDeLucro: data.Porcentagem_De_Lucro || "",
          descricao: data.Descricao || "",
          custoTotalIngredientes: data.Custo_Total_Ingredientes || "0.00",
          id: data.ID_Receita || data.id || null,
        });
        setIngredientesSelecionados(
          (data.ingredientes || []).map(i => {
            const unidade = i.unidade || i.Unidade_De_Medida || i.Unidade;

            return {
              ID_Ingredientes: i.ID_Ingredientes,
              nome: i.nome || i.Nome_Ingrediente,
              unidade,
              quantidade: i.quantidade || i.Quantidade_Utilizada || "",
              quantidade_total:
                i.quantidade_total ||
                i.Quantidade_Total ||
                calcularQuantidadeTotalPadrao(unidade),
              custo_ingrediente: i.custo_ingrediente || i.Custo_Ingrediente || 0,
              Indice_de_Desperdicio: i.Indice_de_Desperdicio || 0,
            };
          })
        );
      } catch (err) {
        toast.error("Erro ao buscar detalhes da receita!");
      }
    }

    fetchReceitaDetalhada();
  }, [receita]);

  const handleClose = () => setIsClosing(true);

  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => onClose(), 300);
      return () => clearTimeout(timer);
    }
  }, [isClosing, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "tempoDePreparo" || name === "porcentagemDeLucro") {
      newValue = value.replace(/[^\d,]/g, "").replace(/(,.*?),/g, "$1");
    }

    setForm((prev) => ({ ...prev, [name]: newValue }));

    if (camposInvalidos[name]) {
      setCamposInvalidos((prev) => {
        const novo = { ...prev };
        delete novo[name];
        return novo;
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, imagem: file }));
    } else {
      setForm((prev) => ({ ...prev, imagem: [] }));
    }
  };

  const handleSelectIngrediente = (ingrediente) => {
    setIngredientesSelecionados((prev) => [
      ...prev,
      {
        ID_Ingredientes: ingrediente.ID_Ingredientes, // <-- ESSENCIAL!
        nome: ingrediente.Nome_Ingrediente || ingrediente.nome,
        unidade: ingrediente.Unidade_De_Medida || ingrediente.unidade,
        quantidade: "", // o usuário irá preencher depois
        quantidade_total:
          ingrediente.Quantidade_Total ??
          ingrediente.quantidade_total ??
          calcularQuantidadeTotalPadrao(ingrediente.Unidade_De_Medida || ingrediente.unidade),
        custo_ingrediente: ingrediente.Custo_Ingrediente ?? ingrediente.custo_ingrediente,
        Indice_de_Desperdicio: ingrediente.Indice_de_Desperdicio ?? 0,
      },
    ]);

    setIngredienteBusca("");
  };

  const handleIngredienteChange = (index, field, value) => {
    const novos = [...ingredientesSelecionados];
    novos[index][field] = value === "" ? 0 : value;
    setIngredientesSelecionados(novos);

    if (field === "quantidade" && camposInvalidos[`ingrediente_${index}`]) {
      setCamposInvalidos((prev) => {
        const novo = { ...prev };
        delete novo[`ingrediente_${index}`];
        return novo;
      });
    }
  };

  const handleRemoverIngrediente = (index) => {
    setIngredientesSelecionados((prevSelecionados) => {
      const ingredienteRemovido = prevSelecionados[index];

      setIngredientesDisponiveis((prevDisponiveis) => {
        const jaExiste = prevDisponiveis.some(
          (i) => i.nome === ingredienteRemovido.nome
        );
        if (jaExiste) return prevDisponiveis;

        return [...prevDisponiveis, {
          nome: ingredienteRemovido.nome,
          unidade: ingredienteRemovido.unidade,
        }];
      });

      return prevSelecionados.filter((_, i) => i !== index);
    });
  };

  useEffect(() => {
    async function fetchDespesas() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3001/api/despesas", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setDespesas(data);
      } catch (err) {
        toast.error("Erro ao buscar despesas do banco!");
      }
    }
    fetchDespesas();
  }, []);

  const calcularCustoPorMinutoDespesa = (despesa) => {
    const diasNoMes = 30;
    const custoMensal = Number(despesa.Custo_Mensal);
    const tempoDia = Number(despesa.Tempo_Operacional);

    if (!custoMensal || !tempoDia) return 0;

    const custoDiario = custoMensal / diasNoMes;
    const custoPorHora = custoDiario / tempoDia;
    return custoPorHora / 60;
  };

  const calcularCustoIngrediente = (quantidadeUsada, quantidadeTotal, custoIngrediente, indiceDesperdicio = 0) => {
    if (!quantidadeUsada || !quantidadeTotal || !custoIngrediente) return 0;
    const proporcao = Number(quantidadeUsada) / Number(quantidadeTotal);
    const custoBase = proporcao * Number(custoIngrediente);
    const custoFinal = custoBase * (1 + Number(indiceDesperdicio) / 100);
    return custoFinal;
  };

  const calcularCustoTotalReceita = ({ ingredientes, tempo_preparo_min, despesas }) => {
    const custoIngredientes = ingredientes.reduce((total, item) => total + item.custo_calculado, 0);
    const custoOperacionalPorMinuto = despesas.reduce((total, despesa) => {
      const custoMinuto = calcularCustoPorMinutoDespesa(despesa);
      return total + (isNaN(custoMinuto) ? 0 : custoMinuto);
    }, 0);
    const custoOperacionalReceita = custoOperacionalPorMinuto * tempo_preparo_min;
    const custoTotal = custoIngredientes + custoOperacionalReceita;

    return {
      custoIngredientes,
      custoOperacionalReceita,
      custoTotal
    };
  };

  const calcularPrecoFinalComLucro = (custo, porcentagemLucro) => {
    return Number(custo) + (Number(custo) * (Number(porcentagemLucro) / 100));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Carregue despesas do banco se ainda não estiverem carregadas
    if (!despesas || despesas.length === 0) {
      toast.error("Despesas não carregadas. Tente novamente.");
      return;
    }

    // Log ingredientes e despesas
    console.log("==== Ingredientes selecionados ====");
    console.table(ingredientesSelecionados);
    console.log("==== Despesas carregadas do banco ====");
    console.table(despesas);

    // Log detalhado do cálculo dos ingredientes
    ingredientesSelecionados.forEach((ing, idx) => {
      const quantidadeUsada = Number(ing.quantidade);
      const quantidadeTotal = Number(ing.quantidade_total);
      const custoIngrediente = Number(ing.custo_ingrediente);
      const indiceDesperdicio = Number(ing.Indice_de_Desperdicio) || 0;

      const proporcao = quantidadeUsada / quantidadeTotal;
      const custoBase = proporcao * custoIngrediente;
      const fatorDesperdicio = 1 + (indiceDesperdicio / 100);
      const custoFinal = custoBase * fatorDesperdicio;

      console.log(`--- Ingrediente #${idx + 1}: ${ing.nome} ---`);
      console.log(`Qtd usada: ${quantidadeUsada}`);
      console.log(`Qtd total: ${quantidadeTotal}`);
      console.log(`Custo ingrediente: ${custoIngrediente}`);
      console.log(`Índice de desperdício: ${indiceDesperdicio}%`);
      console.log(`Cálculo base: (${quantidadeUsada} / ${quantidadeTotal}) * ${custoIngrediente} = ${custoBase}`);
      console.log(`Aplicando desperdício: ${custoBase} * ${fatorDesperdicio} = ${custoFinal}`);
      console.log(`Custo calculado final: ${custoFinal}`);
    });

    // Log detalhado do cálculo operacional
    despesas.forEach((desp, idx) => {
      const custoMinuto = calcularCustoPorMinutoDespesa(desp);
      console.log(
        `Despesa #${idx + 1}:`,
        `Nome: ${desp.Nome_Despesa}`,
        `Custo mensal: ${desp.Custo_Mensal}`,
        `Tempo operacional: ${desp.Tempo_Operacional}`,
        `Custo por minuto: ${custoMinuto}`
      );
    });

    const tempo_preparo_min = Number(form.tempoDePreparo);

    const resultado = calcularCustoTotalReceita({
      ingredientes: ingredientesSelecionados.map(i => ({
        ...i,
        custo_calculado: calcularCustoIngrediente(
          i.quantidade,
          i.quantidade_total,
          i.custo_ingrediente,
          i.Indice_de_Desperdicio
        )
      })),
      tempo_preparo_min,
      despesas
    });

    console.log("==== Resultado final do cálculo ====");
    console.log("Custo ingredientes:", resultado.custoIngredientes);
    console.log("Custo operacional:", resultado.custoOperacionalReceita);
    console.log("Custo total:", resultado.custoTotal);

    const precoFinal = calcularPrecoFinalComLucro(resultado.custoTotal, form.porcentagemDeLucro);
    console.log("Preço final com lucro:", precoFinal);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append('Nome_Receita', form.nome || "");
      formData.append('Descricao', form.descricao || "");
      formData.append('Tempo_Preparo', Number(form.tempoDePreparo) || 0);
      formData.append('Custo_Total_Ingredientes', Number(precoFinal));
      formData.append('Porcentagem_De_Lucro', Number(form.porcentagemDeLucro) || 0);
      formData.append('Categoria', form.categoria || "");
      if (form.imagem instanceof File) {
        formData.append('imagem_URL', form.imagem);
      } else if (typeof form.imagem === "string" && form.imagem.trim() !== "") {
        formData.append('imagem_URL', form.imagem);
      }
      const ingredientesCorrigidos = ingredientesSelecionados.map(i => ({
        ID_Ingredientes: i.ID_Ingredientes, // <-- ESSENCIAL!
        nome: i.nome,
        unidade: i.unidade,
        quantidade: Number(i.quantidade),
        quantidade_total: Number(i.quantidade_total),
        custo_ingrediente: Number(i.custo_ingrediente),
        Indice_de_Desperdicio: Number(i.Indice_de_Desperdicio)
      }));
      formData.append('ingredientes', JSON.stringify(ingredientesCorrigidos));
      console.log('Dados para enviar no PUT:', ingredientesCorrigidos);

      const res = await fetch(`http://localhost:3001/api/receitas/${form.id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });

      // Log dos dados enviados
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      if (!res.ok) {
        let msg = "Erro ao atualizar receita!";
        try {
          const data = await res.json();
          if (data?.error) msg = data.error;
        } catch {}
        throw new Error(msg);
      }

      // Atualiza os ingredientes da receita no banco
      const ingredientesParaEnviar = ingredientesSelecionados.map(i => ({
        ID_Ingredientes: i.ID_Ingredientes,
        Quantidade_Utilizada: Number(i.quantidade),
        Unidade_De_Medida: i.unidade
      }));

      // Validação antes do envio
      for (const ing of ingredientesParaEnviar) {
        if (
          !ing.ID_Ingredientes ||
          isNaN(ing.ID_Ingredientes) ||
          !ing.Quantidade_Utilizada ||
          isNaN(ing.Quantidade_Utilizada)
        ) {
          toast.error("Preencha todos os ingredientes corretamente!");
          return;
        }
      }

      console.log("Ingredientes para enviar:", ingredientesParaEnviar);

      // Envio para o backend
      await fetch(`http://localhost:3001/api/receita-detalhada/${form.id}/ingredientes`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ ingredientes: ingredientesParaEnviar }),
      });

      toast.success("Receita atualizada com sucesso!");
      onSave();
      handleClose();
    } catch (err) {
      toast.error(err.message || "Erro ao atualizar receita!");
    }
  };

  const calcularQuantidadeTotalPadrao = (unidade) => {
    const u = (unidade || "").toLowerCase().trim();

    if (u === "kg") return 1000;
    if (u === "hg") return 100;
    if (u === "dag") return 10;
    if (u === "g") return 1;
    if (u === "dg") return 0.1;
    if (u === "cg") return 0.01;
    if (u === "mg") return 0.001;

    if (u === "kl") return 1000000;
    if (u === "hl") return 100000;
    if (u === "dal") return 10000;
    if (u === "l") return 1000;
    if (u === "dl") return 100;
    if (u === "cl") return 10;
    if (u === "ml") return 1;

    if (u === "un" || u === "unidade" || u === "unidades") return 30;

    return 1;
  };

  const unidadeCorrigida = (unidade) => {
    if (!unidade) return "";
    const u = unidade.toLowerCase();
    if (u === "eu") return "ml"; // ou "g", conforme o caso
    return unidade;
  };

  return (
    <div className={`${styles.modalOverlay} ${isClosing ? styles.modalExit : styles.modalEnter}`}>
      <div className={`${styles.modalContainer} shadow`}>
        <div className={styles.modalHeader}>
          <h5>Editar Receita</h5>
          <button onClick={handleClose} className={styles.btnClose}>&times;</button>
        </div>

        <div className={styles.modalBody}>
          <div className="row">
            <div className="col-6">
              <div className="row">
                <div className="col-6">
                  <div className={`${styles.formGroup} align-items-center`}>
                    <input
                      type="file"
                      id="imagemInput"
                      accept="image/png, image/jpeg, image/jpg, image/webp"
                      onChange={handleImageChange}
                      className={styles.hiddenFileInput}
                    />
                    <label htmlFor="imagemInput" className={styles.imagePreviewBox}
                      style={{
                        backgroundImage: form.imagem ? `url(${form.imagem})` : 'none',
                      }}
                    >
                      {!form.imagem && <span>Selecione uma Imagem</span>}
                    </label>
                  </div>
                  <div className={`${styles.formGroup} mt-4`}>
                    <label>Tempo de Preparo (Min.)</label>
                    <input
                      name="tempoDePreparo"
                      autoComplete="off"
                      className={`form-control ${camposInvalidos.tempoDePreparo ? styles.erroInput : ""}`}
                      inputMode="decimal"
                      value={form.tempoDePreparo}
                      onChange={handleChange}
                      placeholder="Ex: 120"
                    />
                  </div>
                </div>

                <div className="col-6">
                  <div className={styles.formGroup}>
                    <label>Nome Da Receita</label>
                    <input
                      name="nome"
                      autoComplete="off"
                      className={`form-control ${camposInvalidos.nome ? styles.erroInput : ""}`}
                      value={form.nome}
                      onChange={handleChange}
                      placeholder="Ex: Bolo de Chocolate"
                    />
                  </div>

                  <div className={`${styles.formGroup} mt-4`}>
                    <label>Categoria</label>
                    <select
                      name="categoria"
                      className={`form-control ${camposInvalidos.categoria ? styles.erroInput : ""}`}
                      value={form.categoria}
                      onChange={handleChange}
                    >
                      <option value="">Selecione...</option>
                      {categorias.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className={`${styles.formGroup} mt-4`}>
                    <label>Porcentagem de Lucro (%)</label>
                    <input
                      name="porcentagemDeLucro"
                      autoComplete="off"
                      className={`form-control ${camposInvalidos.porcentagemDeLucro ? styles.erroInput : ""}`}
                      inputMode="decimal"
                      value={form.porcentagemDeLucro}
                      onChange={handleChange}
                      placeholder="Ex: 20"
                    />
                  </div>
                </div>
              </div>

              <div className={`${styles.formGroup} mt-3`}>
                <label>Descrição</label>
                <textarea
                  name="descricao"
                  className="form-control"
                  value={form.descricao}
                  onChange={handleChange}
                  rows={7}
                  placeholder="Descreva a receita..."
                  maxLength={245}
                />
              </div>
            </div>

            <div className="col-6">
              <div>
                <div className={`${styles.formGroup} ${styles.suggestionsContainer}`}>
                  <label>Buscar Ingrediente</label>
                  <input
                    type="text"
                    className="form-control"
                    value={ingredienteBusca}
                    onChange={(e) => setIngredienteBusca(e.target.value)}
                    onFocus={async () => {
                      try {
                        const token = localStorage.getItem("token");
                        const res = await fetch("http://localhost:3001/api/ingredientes", {
                          headers: {
                            "Authorization": `Bearer ${token}`,
                          },
                        });
                        const data = await res.json();
                        setIngredientesDisponiveis(data);
                      } catch (err) {
                        toast.error("Erro ao buscar ingredientes do banco!");
                      }
                    }}
                    placeholder="Digite para buscar..."
                  />
                  {ingredienteBusca && (
                    <ul className={styles.suggestionsList}>
                      {ingredientesDisponiveis
                        .filter(i =>
                          i.Nome_Ingrediente &&
                          i.Nome_Ingrediente.toLowerCase().includes(ingredienteBusca.toLowerCase()) &&
                          !ingredientesSelecionados.some(sel => sel.nome === i.Nome_Ingrediente)
                        )
                        .map(i => (
                          <li key={i.ID_Ingredientes} onClick={() => handleSelectIngrediente(i)}>
                            {i.Nome_Ingrediente} <span className="text-muted">({i.Unidade_De_Medida})</span>
                          </li>
                        ))}
                    </ul>
                  )}
                </div>

                <label className="mt-4">Ingredientes da Receita</label>
                <div className={styles.ingredientesBox}>
                  <div className={styles.tabelaCabecalho}>
                    <span className={styles.nomeIngrediente}>Nome</span>
                    <span>Quantidade</span>
                    <span className="d-flex justify-content-center">Unidade</span>
                  </div>
                  {ingredientesSelecionados.map((ingrediente, index) => (
                    <div
                      key={index}
                      className={`${styles.ingredienteItem} ${index % 2 === 0 ? styles.linhaBege : ""}`}
                    >
                      <span className="ml-1">{ingrediente.nome}</span>
                      <input
                        type="number"
                        placeholder="Qtd"
                        value={ingrediente.quantidade}
                        min={1}
                        onChange={(e) => handleIngredienteChange(index, "quantidade", e.target.value)}
                      />
                      <span className="d-flex justify-content-center">{unidadeCorrigida(ingrediente.unidade)}</span>
                      <button
                        type="button"
                        className={styles.btnRemoveIngrediente}
                        onClick={() => handleRemoverIngrediente(index)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.btnCancel} onClick={handleClose}>Cancelar</button>
          <button className={styles.btnSave} onClick={handleSubmit}>Salvar</button>
        </div>
      </div>
    </div>
  );
}


export default ModalEditaReceita;
