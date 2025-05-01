import { useState, useEffect } from "react";
import "../ModalCadastro.css"; // Reutilizando o CSS do ModalCadastroProduto
import '../../../Styles/global.css'; 

function ModalCadastroReceita({ onClose, onSave }) {
  const [form, setForm] = useState({
    nome: "",
    categoria: "",
    imagem: null,
    cmv: "",
    margemLucro: "",
    ingredientes: [],
  });

  const [pesquisa, setPesquisa] = useState("");
  const [isClosing, setIsClosing] = useState(false);

  const [erros, setErros] = useState({
    nome: false, 
    categoria: false,
  });

  const todosProdutos = [
    "Chocolate",
    "Trigo",
    "Ovo",
    "Açúcar",
    "Leite",
    "Fermento",
    "café",
  ];

  const sugestoes = pesquisa
    ? todosProdutos.filter((nome) =>
      nome.toLowerCase().includes(pesquisa.toLowerCase())
    )
    : [];

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
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    const nomeInvalido = !form.nome.trim();
    const categoriaInvalida = !form.categoria;

    setErros({
      nome: nomeInvalido,
      categoria: categoriaInvalida,
    });

    if (nomeInvalido || categoriaInvalida) return;

    onSave(form);
    handleClose();
  };

  const adicionarIngrediente = (nome) => {
    if (!form.ingredientes.find((ing) => ing.nome === nome)) {
      const novo = { nome, quantidade: "", unidade: "g" };
      setForm((prev) => ({
        ...prev,
        ingredientes: [...prev.ingredientes, novo],
      }));
    }
    setPesquisa("");
  };

  const atualizarIngrediente = (index, campo, valor) => {
    const novosIngredientes = [...form.ingredientes];
    novosIngredientes[index][campo] = valor;
    setForm((prev) => ({
      ...prev,
      ingredientes: novosIngredientes,
    }));
  };

  const removerIngrediente = (index) => {
    const novosIngredientes = form.ingredientes.filter((_, i) => i !== index);
    setForm((prev) => ({
      ...prev,
      ingredientes: novosIngredientes,
    }));
  };

  return (
    <div className={`modal-overlay ${isClosing ? "modal-exit" : "modal-enter"}`}>
      <div className="modal-container shadow modal-cadastro-produto">
        <div className="modal-header">
          <h5>Cadastrar Receita</h5>
          <button onClick={handleClose} className="btn-close">&times;</button>
        </div>

        <div className="modal-body horizontal-layout">
          {/* Coluna da esquerda */}
          <div className="form-section">
            <div className="image-upload-area">
              <label className="upload-box">
                <span>+</span>
                Anexar Imagem
                <input type="file" name="imagem" onChange={handleChange} hidden />
              </label>
            </div>

            <div className="form-group">
              <label>Nome da Receita</label>
              <input
                name="nome"
                className={`form-control ${erros.nome ? "is-invalid" : ""}`}
                value={form.nome}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Selecionar Categoria</label>
              <select
                name="categoria"
                className={`form-control ${erros.categoria ? "is-invalid" : ""}`}
                value={form.categoria}
                onChange={handleChange}
              >
                <option value="">Selecione...</option>
                <option value="Sobremesa">Sobremesa</option>
                <option value="Salgado">Salgado</option>
                <option value="Bebida">Bebida</option>
                <option value="Outros">Outros</option>
              </select>
            </div>

            <div className="linha-cmv">

              <div className="form-group">
                <label>Margem de Lucro (%)</label>
                <input
                  type="number"
                  name="margemLucro"
                  value={form.margemLucro}
                  onChange={handleChange}
                  className="form-control"
                  min="0"
                  max="100"
                  step="0.01"
                />
              </div>
            </div>

            <div className="preco-final">
              Preço Final: R$ 0,00
            </div>
          </div>

          {/* Coluna da direita */}
          <div className="form-section">
            <div className="form-group" style={{ position: "relative" }}>
              <label>Pesquisar Produtos</label>
              <input
                type="text"
                className="form-control"
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
                placeholder="Buscar por nome..."
              />
              {pesquisa && sugestoes.length > 0 && (
                <ul className="autocomplete-list">
                  {sugestoes.map((nome, index) => (
                    <li
                      key={index}
                      onClick={() => adicionarIngrediente(nome)}
                      className="autocomplete-item"
                    >
                      {nome}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {form.ingredientes.length > 0 && (
              <table className="tabela-ingredientes">
                <thead>
                  <tr>
                    <th>Ingrediente</th>
                    <th>Quantidade</th>
                    <th>Unidade</th>
                  </tr>
                </thead>
                <tbody>
                  {form.ingredientes.map((ing, index) => (
                    <tr key={index}>
                      <td>
                        {ing.nome}
                        <button
                          type="button"
                          className="btn-remove-ingrediente"
                          onClick={() => removerIngrediente(index)} // Função para remover o ingrediente
                        >
                          <i className="bi bi-x-circle"></i>
                        </button>
                      </td>
                      <td>
                        <input
                          type="number"
                          value={ing.quantidade}
                          onChange={(e) => atualizarIngrediente(index, "quantidade", e.target.value)}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <select
                          value={ing.unidade}
                          onChange={(e) => atualizarIngrediente(index, "unidade", e.target.value)}
                          className="form-control"
                        >
                          <option value="g">g</option>
                          <option value="kg">kg</option>
                          <option value="ml">ml</option>
                          <option value="L">L</option>
                          <option value="un">un</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
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

export default ModalCadastroReceita;
