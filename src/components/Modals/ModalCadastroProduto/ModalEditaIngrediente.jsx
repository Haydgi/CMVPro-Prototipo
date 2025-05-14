import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "../../../Styles/global.css";
import styles from "../ModalCadastro.module.css";

function ModalEditaIngrediente({ onClose, onSave }) {
  const [form, setForm] = useState({
    nome: "",
    custo: "",
    categoria: "",
    unidade: "kg",
    taxaDesperdicio: "",
  });

  const [isClosing, setIsClosing] = useState(false);

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

  const handleClose = () => {
    setIsClosing(true);
  };

  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => {
        onClose();
      }, 300);
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
  };

  const handleSubmit = () => {
    if (!form.nome || !form.custo || !form.categoria || !form.unidade || !form.taxaDesperdicio) {
      toast.error("Por favor, preencha todos os campos!");
      return;
    }

    const ingredienteAtualizado = {
      ...form,
      unidadeCompra: form.unidade,
      custo: parseFloat(form.custo.replace(",", ".")),
      taxaDesperdicio: parseFloat(form.taxaDesperdicio.replace(",", ".")),
    };

    if (onSave) {
      onSave(ingredienteAtualizado);
      toast.success("Ingrediente atualizado com sucesso!");
    }

    handleClose();
  };

  return (
    <div className={`${styles.modalOverlay} ${isClosing ? styles.modalExit : styles.modalEnter}`}>
      <div className={`${styles.modalContainer} shadow ${isClosing ? styles.modalExit : styles.modalEnter}`}>
        {/* Header do Modal */}
        <div className={styles.modalHeader}>
          <h5>Editar Ingrediente</h5>
          <button onClick={handleClose} className={styles.btnClose}>&times;</button>
        </div>

        {/* Corpo do Modal */}
        <div className={styles.modalBody}>
          <div className={styles.formGrid}>
            <div className={`${styles.formGroup} ${styles.colSpan2}`}>
              <label>Nome</label>
              <input
                name="nome"
                className="form-control"
                value={form.nome}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Custo de Compra (R$)</label>
              <input
                name="custo"
                className="form-control"
                inputMode="decimal"
                pattern="\d+,\d{2}"
                value={form.custo}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
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
            <div className={styles.formGroup}>
              <label>Unidade de Compra</label>
              <select
                name="unidade"
                className="form-control"
                value={form.unidade}
                onChange={handleChange}
              >
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
                className="form-control"
                inputMode="decimal"
                pattern="\d+,\d{2}"
                value={form.taxaDesperdicio}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Footer do Modal */}
        <div className={styles.modalFooter}>
          <button
            className={`${styles.btnCancel}`}
            onClick={handleClose}
          >
            Cancelar
          </button>
          <button
            className={`${styles.btnSave}`}
            onClick={handleSubmit}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalEditaIngrediente;