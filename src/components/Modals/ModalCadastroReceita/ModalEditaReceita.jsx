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

  const categorias = [
    "Carnes", "Aves", "Peixes e Frutos do Mar", "Massas", "Arroz e Grãos",
    "Doces", "Sobremesas", "Bolos e Tortas", "Pães e Biscoitos", "Sopas e Caldos",
    "Molhos e Pastas", "Bebidas", "Vegano", "Vegetariano", "Sem Glúten", "Sem Lactose"
  ];

  const TODOS_INGREDIENTES = [
    { nome: "Farinha de trigo", unidade: "g" },
    { nome: "Açúcar", unidade: "g" },
    { nome: "Sal", unidade: "g" },
    { nome: "Fermento em pó", unidade: "g" },
    { nome: "Manteiga", unidade: "g" },
    { nome: "Leite", unidade: "ml" },
    { nome: "Água", unidade: "ml" },
    { nome: "Óleo de soja", unidade: "ml" },
    { nome: "Essência de baunilha", unidade: "ml" },
    { nome: "Vinagre", unidade: "ml" },
    { nome: "Ovo", unidade: "unid." },
    { nome: "Tomate", unidade: "unid." },
    { nome: "Cebola", unidade: "unid." },
    { nome: "Alho", unidade: "unid." },
    { nome: "Batata", unidade: "unid." },
    { nome: "Cenoura", unidade: "unid." },
    { nome: "Queijo mussarela", unidade: "g" },
    { nome: "Presunto", unidade: "g" },
    { nome: "Frango desfiado", unidade: "g" },
    { nome: "Carne moída", unidade: "g" },
    { nome: "Molho de tomate", unidade: "ml" },
    { nome: "Creme de leite", unidade: "ml" },
    { nome: "Requeijão", unidade: "g" },
    { nome: "Chocolate em pó", unidade: "g" },
    { nome: "Coco ralado", unidade: "g" },
    { nome: "Fermento biológico", unidade: "g" },
    { nome: "Leite condensado", unidade: "ml" }
  ];

  useEffect(() => {
    if (receita) {
      setForm({
        imagem: receita.imagem || null,
        nome: receita.nome || "",
        categoria: receita.categoria || "",
        tempoDePreparo: receita.tempoDePreparo || "",
        porcentagemDeLucro: receita.porcentagemDeLucro || "",
        descricao: receita.descricao || "",
        custoTotalIngredientes: receita.custoTotalIngredientes || "0.00",
        id: receita.id,
      });

      setIngredientesSelecionados(receita.ingredientes || []);

      const nomesSelecionados = (receita.ingredientes || []).map(i => i.nome);
      const disponiveis = TODOS_INGREDIENTES.filter(i => !nomesSelecionados.includes(i.nome));
      setIngredientesDisponiveis(disponiveis);
    }
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
      setForm((prev) => ({ ...prev, imagem: URL.createObjectURL(file) }));
    }
  };

  const handleSelectIngrediente = (ingrediente) => {
    setIngredientesSelecionados((prev) => [
      ...prev,
      { nome: ingrediente.nome, unidade: ingrediente.unidade, quantidade: "" }
    ]);
    setIngredientesDisponiveis((prev) =>
      prev.filter((i) => i.nome !== ingrediente.nome)
    );
    setIngredienteBusca("");
  };

  const handleIngredienteChange = (index, field, value) => {
    const novos = [...ingredientesSelecionados];
    novos[index][field] = value;
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

  const handleSubmit = () => {
    const campos = {};

    if (!form.nome) campos.nome = true;
    if (!form.categoria) campos.categoria = true;
    if (!form.tempoDePreparo) campos.tempoDePreparo = true;
    if (!form.porcentagemDeLucro) campos.porcentagemDeLucro = true;

    if (Object.keys(campos).length > 0) {
      setCamposInvalidos(campos);
      toast.error("Preencha todos os campos obrigatórios!");
      return;
    }

    const errosIngredientes = {};
    ingredientesSelecionados.forEach((ingrediente, index) => {
      if (!ingrediente.quantidade || isNaN(ingrediente.quantidade)) {
        errosIngredientes[`ingrediente_${index}`] = true;
      }
    });

    if (Object.keys(errosIngredientes).length > 0) {
      setCamposInvalidos(errosIngredientes);
      toast.error("Preencha a quantidade de todos os ingredientes!");
      return;
    }

    if (ingredientesSelecionados.length < 2) {
      toast.error("Adicione pelo menos 2 ingredientes!");
      return;
    }

    setCamposInvalidos({});
    const receitaFormatada = {
      ...form,
      ingredientes: ingredientesSelecionados,
    };

    onSave(receitaFormatada);
    toast.success("Receita atualizada com sucesso!");
    handleClose();
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
                    placeholder="Digite para buscar..."
                  />
                  {ingredienteBusca && (
                    <ul className={styles.suggestionsList}>
                      {ingredientesDisponiveis
                        .filter(i => i.nome.toLowerCase().includes(ingredienteBusca.toLowerCase()))
                        .map(i => (
                          <li key={i.nome} onClick={() => handleSelectIngrediente(i)}>
                            {i.nome}
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
                        className={`${styles.inputQuantidade} ${camposInvalidos[`ingrediente_${index}`] ? styles.erroInput : ""}`}
                        value={ingrediente.quantidade}
                        onChange={(e) => handleIngredienteChange(index, "quantidade", e.target.value)}
                      />
                      <span className="d-flex justify-content-center">{ingrediente.unidade}</span>
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
