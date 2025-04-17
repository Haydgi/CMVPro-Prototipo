import { useState, useEffect } from "react";
import styles from "../assets/ModalCadastroProduto.module.css";

function ModalCadastroProduto({ onClose, onSave }) {
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    unidade: "kg",
    custo: "",
    data: "",
    categoria: "",
    imagem: null,
  });

  const [isClosing, setIsClosing] = useState(false);

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
    const { name, value, files } = e.target;

    if (name === "imagem") {
      setForm((prev) => ({ ...prev, imagem: files[0] }));
      return;
    }

    let newValue = value;

    if (name === "custo") {
      newValue = value.replace(/[^\d,]/g, "").replace(/(,.*?),/g, "$1");
    }

    if (name === "descricao" && newValue.length > 500) {
      return; // Limita a 500 caracteres
    }

    setForm((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = () => {
    let dataFormatada = form.data;
    if (form.data && /^\d{2}\/\d{2}\/\d{4}$/.test(form.data)) {
      const [dia, mes, ano] = form.data.split("/");
      dataFormatada = `${ano}-${mes}-${dia}`;
    }

    const produtoFormatado = {
      ...form,
      data: dataFormatada,
    };

    onSave(produtoFormatado);
    handleClose();
  };

  const categorias = [
    "Carnes", "Doces", "Enlatados e Conservas", "Farináceos", "Frutas",
    "Laticínios", "Legumes", "Líquidos", "Oleaginosas", "Óleos e Gorduras",
    "Panificados", "Produtos Orgânicos", "Temperos e Condimentos", "Verduras",
  ];

  const contagemPalavras = form.descricao.trim() === ""
    ? 0
    : form.descricao.trim().split(/\s+/).length;

  return (
    <div className={`${styles["modal-overlay"]} ${isClosing ? styles["modal-exit"] : styles["modal-enter"]}`}>
      <div className={`${styles["modal-container"]} ${styles["shadow"]}`}>
        <div className={styles["modal-header"]}>
          <h5>Cadastrar Produto</h5>
          <button onClick={handleClose} className={styles["btn-close"]}>&times;</button>
        </div>

        <div className={styles["modal-body"]}>
          <div className={styles["left-column"]}>
            <div className={styles["image-upload-area"]}>
              <label htmlFor="imagem" className={styles["upload-box"]}>
                <p>Anexar Imagem do Produto</p>
                <input
                  type="file"
                  id="imagem"
                  name="imagem"
                  accept="image/*"
                  onChange={handleChange}
                  hidden
                />
              </label>
            </div>

            <div className={styles["form-group"]}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <label>Descrição</label>
              </div>

              <textarea
                name="descricao"
                className={styles["descricao-textarea"]}
                value={form.descricao}
                onChange={handleChange}
                placeholder="Escreva aqui a descrição do produto..."
                maxLength={100}
                style={{ resize: "none" }}
              />

              <div style={{ textAlign: "right", fontSize: "0.85rem", color: "#5e2a84" }}>
                {form.descricao.length}/100 caracteres
              </div>
            </div>
          </div>

          <div className={styles["right-grid"]}>
            <div className={styles["form-group"]}>
              <label>Nome</label>
              <input
                name="nome"
                className="form-control"
                value={form.nome}
                onChange={handleChange}
              />
            </div>

            <div className={styles["form-group"]}>
              <label>Categoria</label>
              <select
                name="categoria"
                className="form-select"
                value={form.categoria}
                onChange={handleChange}
              >
                <option value="">Selecione uma categoria...</option>
                {categorias.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles["form-group"]}>
              <label>Unidade de Medida</label>
              <select
                name="unidade"
                className="form-select"
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

            <div className={styles["form-group"]}>
              <label>Preço da Unidade de Medida (R$)</label>
              <input
                name="custo"
                className="form-control"
                inputMode="decimal"
                pattern="\d+,\d{2}"
                value={form.custo}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className={styles["modal-footer"]}>
          <button className={styles["cancelar-produto"]} onClick={handleClose}>Cancelar</button>
          <button className={styles["salvar-produto"]} onClick={handleSubmit}>Salvar</button>
        </div>
      </div>
    </div>
  );
}

export default ModalCadastroProduto;
