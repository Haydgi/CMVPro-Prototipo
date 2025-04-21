import { useState, useEffect } from "react";
import "../assets/ModalCadastro.css";
import "../assets/global.css";

// Mapeamento de categorias para ícones
const categoriaIcones = {
  Carnes: "bi bi-basket-fill",
  Doces: "bi bi-cupcake",
  "Enlatados e Conservas": "bi bi-can-fill",
  Farináceos: "bi bi-bag-fill",
  Frutas: "bi bi-apple",
  Laticínios: "bi bi-carton",
  Legumes: "bi bi-carrot",
  Líquidos: "bi bi-droplet-fill",
  Oleaginosas: "bi bi-nut-fill",
  "Óleos e Gorduras": "bi bi-oil-can",
  Panificados: "bi bi-bread-slice",
  "Produtos Orgânicos": "bi bi-leaf",
  "Temperos e Condimentos": "bi bi-pepper-hot",
  Verduras: "bi bi-leaf-fill",
};

function ModalCadastroProduto({ onClose, onSave }) {
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    unidade: "kg",
    custo: "",
    data: "",
    categoria: "",
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
    const { name, value } = e.target;

    let newValue = value;
    if (name === "custo") {
      newValue = value.replace(/[^\d,]/g, "").replace(/(,.*?),/g, "$1");
    }

    setForm((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = () => {
    let dataFormatada = form.data;
    if (form.data && /^\d{2}\/\d{2}\/\d{4}$/.test(form.data)) {
      const [dia, mes, ano] = form.data.split('/');
      dataFormatada = `${ano}-${mes}-${dia}`;
    }

    const produtoFormatado = {
      ...form,
      data: dataFormatada,
      icone: categoriaIcones[form.categoria] || "bi bi-box", // Define o ícone com base na categoria
    };

    console.log("Produto formatado:", produtoFormatado); // Depuração

    if (onSave) {
      onSave(produtoFormatado);
    }

    handleClose();
  };

  const categorias = [
    "Carnes", "Doces", "Enlatados e Conservas", "Farináceos", "Frutas",
    "Laticínios", "Legumes", "Líquidos", "Oleaginosas", "Óleos e Gorduras",
    "Panificados", "Produtos Orgânicos", "Temperos e Condimentos", "Verduras",
  ];

  return (
    <div className={`modal-overlay ${isClosing ? "modal-exit" : "modal-enter"}`}>
      <div className={`modal-container shadow modal-cadastro-produto ${isClosing ? "modal-exit" : "modal-enter"}`}>
        <div className="modal-header">
          <h5>Cadastrar Produto</h5>
          <button onClick={handleClose} className="btn-login">&times;</button>
        </div>

        <div className="modal-body horizontal-layout">
          {/* Coluna 1 */}
          <div className="form-section">
            <div className="form-group">
              <label>Nome</label>
              <input
                name="nome"
                className="form-control"
                value={form.nome}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
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

            <div className="form-group">
              <label>Unidade de Medida</label>
              <select name="unidade" className="form-select form-control" value={form.unidade} onChange={handleChange}>
                <option value="kg">Quilo (kg)</option>
                <option value="g">Grama (g)</option>
                <option value="mg">Miligrama (mg)</option>
                <option value="L">Litro (L)</option>
                <option value="ml">Mililitro (ml)</option>
                <option value="un">Unidade (un.)</option>
              </select>
            </div>
          </div>

          {/* Coluna 2 */}
          <div className="form-section">
            <div className="form-group">
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

            <div className="form-group">
              <label>Descrição</label>
              <textarea
                name="descricao"
                rows="3"
                className="form-control"
                value={form.descricao}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-alt" onClick={handleClose}>Cancelar</button>
          <button className="btn-login" onClick={handleSubmit}>Salvar</button>
        </div>
      </div>
    </div>
  );
}

export default ModalCadastroProduto;