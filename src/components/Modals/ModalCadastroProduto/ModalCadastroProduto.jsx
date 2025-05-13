import { useState, useEffect } from "react";
import { toast } from "react-toastify"; // Importar o Toastify
import "../../../Styles/global.css";
import styles from "../ModalCadastro.module.css"; // Importando o CSS Modules

function ModalCadastroProduto({ onClose, onSave }) {
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
    "Oleaginosas",
    "Óleos e Gorduras",
    "Temperos e Condimentos",
    "Líquidos",
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
      toast.error("Por favor, preencha todos os campos!"); // Notificação de erro
      return;
    }

    const ingredienteFormatado = {
      ...form,
      custo: parseFloat(form.custo.replace(",", ".")),
      taxaDesperdicio: parseFloat(form.taxaDesperdicio.replace(",", ".")),
    };

    if (onSave) {
      onSave(ingredienteFormatado);
      toast.success("Ingrediente cadastrado com sucesso!"); // Notificação de sucesso
    }

    handleClose();
  };

  return (
    <div className={`${styles.modalOverlay} ${isClosing ? styles.modalExit : styles.modalEnter}`}>
      <div className={`${styles.modalContainer} shadow ${isClosing ? styles.modalExit : styles.modalEnter}`}>
        <div className={styles.modalHeader}>
          <h5>Cadastrar Produto</h5>
          <button onClick={handleClose} className={styles.btnClose}>&times;</button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.formGrid}>
            {/* Primeira linha: Nome e Custo */}
            <div className={styles.formGroup}>
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

            {/* Segunda linha: Categoria, Unidade de Compra e Taxa de Desperdício */}
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
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
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

        <div className={styles.modalFooter}>
          <button
            className="btn-cancel"
            onClick={handleClose}
            style={{
              backgroundColor: "var(--imperial-red)",
              color: "var(--floral-white)",
              borderRadius: "20px",
              padding: "10px 20px",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.3s ease-in-out",
            }}
          >
            Cancelar
          </button>
          <button
            className="btn-save"
            onClick={handleSubmit}
            style={{
              backgroundColor: "var(--dark-pastel-green)",
              color: "var(--floral-white)",
              borderRadius: "20px",
              padding: "10px 20px",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.3s ease-in-out",
            }}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalCadastroProduto;