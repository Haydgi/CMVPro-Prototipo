import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "../../../Styles/global.css";
import styles from "./ModalCadastroIngrediente.module.css";

function ModalEditaIngrediente({ onClose, onSave, ingrediente }) {
  const [form, setForm] = useState({
    nome: "",
    custo: "",
    categoria: "",
    unidade: "",
    taxaDesperdicio: "",
  });

  const [isClosing, setIsClosing] = useState(false);
  const [camposInvalidos, setCamposInvalidos] = useState({});

  const categorias = [
    "Carnes",
    "Doces",
    "Farináceos",
    "Frutas",
    "Laticínios",
    "Legumes e Verduras",
    "Líquidos",
    "Oleaginosas",
    "Óleos e Gorduras",
    "Temperos e Condimentos",
  ];

  useEffect(() => {
    if (ingrediente) {
      setForm({
        nome: ingrediente.nome || "",
        custo: ingrediente.custo?.toString().replace(".", ",") || "",
        categoria: ingrediente.categoria || "",
        unidade: ingrediente.unidadeCompra || "",
        taxaDesperdicio: ingrediente.taxaDesperdicio?.toString().replace(".", ",") || "",
      });
    }
  }, [ingrediente]);

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
    if (name === "custo" || name === "taxaDesperdicio") {
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

  const handleSubmit = () => {
    const campos = {};

    if (!form.nome) campos.nome = true;
    if (!form.custo) campos.custo = true;
    if (!form.categoria) campos.categoria = true;
    if (!form.unidade) campos.unidade = true;
    if (!form.taxaDesperdicio) campos.taxaDesperdicio = true;

    if (Object.keys(campos).length > 0) {
      setCamposInvalidos(campos);
      toast.error("Preencha todos os campos obrigatórios!");
      return;
    }

    const ingredienteFormatado = {
      id: ingrediente.id,
      ...form,
      unidadeCompra: form.unidade,
      custo: parseFloat(form.custo.replace(",", ".")),
      taxaDesperdicio: parseFloat(form.taxaDesperdicio.replace(",", ".")),
    };

    if (onSave) {
      onSave(ingredienteFormatado);
      toast.success("Ingrediente atualizado com sucesso!");
    }

    handleClose();
  };

  return (
    <div className={`${styles.modalOverlay} ${isClosing ? styles.modalExit : styles.modalEnter}`}>
      <div className={`${styles.modalContainer} shadow`}>
        <div className={styles.modalHeader}>
          <h5>Editar Ingrediente</h5>
          <button onClick={handleClose} className={styles.btnClose}>&times;</button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.formGrid}>
            <div className={`${styles.formGroup} ${styles.colSpan2}`}>
              <label>Nome do Ingrediente</label>
              <input
                name="nome"
                autoComplete="off"
                className={`form-control ${camposInvalidos.nome ? styles.erroInput : ""}`}
                value={form.nome}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Custo de Compra (R$)</label>
              <input
                name="custo"
                autoComplete="off"
                className={`form-control ${camposInvalidos.custo ? styles.erroInput : ""}`}
                inputMode="decimal"
                value={form.custo}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
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

            <div className={styles.formGroup}>
              <label>Unidade de Compra</label>
              <select
                name="unidade"
                className={`form-control ${camposInvalidos.unidade ? styles.erroInput : ""}`}
                value={form.unidade}
                onChange={handleChange}
              >
                <option value="">Selecione...</option>
                <option value="kg">Quilo (kg)</option>
                <option value="g">Grama (g)</option>
                <option value="mg">Miligrama (mg)</option>
                <option value="L">Litro (L)</option>
                <option value="ml">Mililitro (ml)</option>
                <option value="un">Unidade (un.)</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Taxa de Desperdício (%)</label>
              <input
                name="taxaDesperdicio"
                autoComplete="off"
                className={`form-control ${camposInvalidos.taxaDesperdicio ? styles.erroInput : ""}`}
                inputMode="decimal"
                value={form.taxaDesperdicio}
                onChange={handleChange}
              />
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

export default ModalEditaIngrediente;
