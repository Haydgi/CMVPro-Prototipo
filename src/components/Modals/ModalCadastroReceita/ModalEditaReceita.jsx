import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "../../../Styles/global.css";
import styles from "./ModalCadastroReceita.module.css";

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

  const [ingredientesSelecionados, setIngredientesSelecionados] = useState([]);
  const [ingredienteBusca, setIngredienteBusca] = useState("");
  const [isClosing, setIsClosing] = useState(false);

  const categorias = [
    "Carnes", "Aves", "Peixes e Frutos do Mar", "Massas", "Arroz e Grãos",
    "Doces", "Sobremesas", "Bolos e Tortas", "Pães e Biscoitos", "Sopas e Caldos",
    "Molhos e Pastas", "Bebidas", "Vegano", "Vegetariano", "Sem Glúten", "Sem Lactose"
  ];

  const ingredientesDisponiveis = [
    "Farinha de Trigo", "Manteiga", "Leite", "Queijo", "Frango", "Carne",
    "Peixe", "Batata", "Abóbora", "Milho", "Ovo", "Açúcar", "Chocolate",
    "Baunilha", "Mostarda", "Maionese", "Arroz", "Feijão", "Lentilha",
    "Grão-de-bico", "Quinoa", "Aveia", "Sementes", "Nozes", "Castanhas",
    "Macarrão", "Sopa", "Mel"
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
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, imagem: URL.createObjectURL(file) }));
    }
  };

  const handleSelectIngrediente = (ingrediente) => {
    if (!ingredientesSelecionados.find(i => i.nome === ingrediente)) {
      setIngredientesSelecionados(prev => [...prev, { nome: ingrediente, quantidade: "", unidade: "" }]);
    }
    setIngredienteBusca("");
  };

  const handleIngredienteChange = (index, field, value) => {
    const novos = [...ingredientesSelecionados];
    novos[index][field] = value;
    setIngredientesSelecionados(novos);
  };

  const handleRemoverIngrediente = (index) => {
    setIngredientesSelecionados(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!form.nome || !form.porcentagemDeLucro || !form.categoria || !form.descricao) {
      toast.error("Por favor, preencha todos os campos!");
      return;
    }

    const receitaEditada = {
      ...form,
      ingredientes: ingredientesSelecionados,
    };

    onSave(receitaEditada);
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
            {/* Coluna Esquerda */}

            <div className="col-6">

              <div className="row">

                <div className="col-6">

                  {/* IMAGEM */}
                  <div className={`${styles.formGroup} align-items-center`}>
                    <input
                      type="file"
                      id="imagemInput"
                      accept="image/*"
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
                  {/* Tempo de Preparo */}
                  <div className={`${styles.formGroup} mt-4`}>
                    <label>Tempo de Preparo (Min.)</label>
                    <input
                      name="tempoDePreparo"
                      className="form-control"
                      inputMode="decimal"
                      value={form.tempoDePreparo}
                      onChange={handleChange}
                      placeholder="Ex: 120"
                    />
                  </div>
                </div>

                <div className="col-6">

                  {/* NOME */}
                  <div className={styles.formGroup}>
                    <label>Nome Da Receita</label>
                    <input
                      name="nome"
                      className="form-control"
                      value={form.nome}
                      onChange={handleChange}
                      placeholder="Ex: Bolo de Chocolate"
                    />
                  </div>

                  {/* Categoria */}
                  <div className={`${styles.formGroup} mt-4`}>
                    <label>Categoria</label>
                    <select
                      name="categoria"
                      className="form-control"
                      value={form.categoria}
                      onChange={handleChange}
                    >
                      <option value="">Selecione...</option>
                      {categorias.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Porcentagem */}
                  <div className={`${styles.formGroup} mt-4`}>
                    <label>Porcentagem de Lucro (%)</label>
                    <input
                      name="porcentagemDeLucro"
                      className="form-control"
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

            {/* Coluna Direita */}
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
                        .filter(i => i.toLowerCase().includes(ingredienteBusca.toLowerCase()))
                        .map(i => (
                          <li key={i} onClick={() => handleSelectIngrediente(i)}>{i}</li>
                        ))}
                    </ul>
                  )}
                </div>


                <label className="mt-4">Ingredientes da Receita</label>
                <div className={`${styles.ingredientesBox}`}>
                  {ingredientesSelecionados.map((ingrediente, index) => (
                    <div key={index} className={styles.ingredienteItem}>
                      <span className="w-50">{ingrediente.nome}</span>
                      <input
                        type="number"
                        placeholder="Quantidade Utilizada"
                        className={`${styles.inputQuantidade}`}
                        value={ingrediente.quantidade}
                        onChange={(e) => handleIngredienteChange(index, "quantidade", e.target.value)}
                      />

                      <button
                        type="button"
                        className={styles.btnRemoveIngrediente}
                        onClick={() => handleRemoverIngrediente(index)}
                      >
                        ✕
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
