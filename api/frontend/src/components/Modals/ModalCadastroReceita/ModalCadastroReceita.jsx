import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "../../../Styles/global.css";
import styles from "./ModalCadastroReceita.module.css";
import { FaTrash } from 'react-icons/fa';
import axios from "axios";

function ModalCadastroReceita({ onClose, onSave, }) {

  const fileInputRef = useRef(null); // <-- aqui


  const [form, setForm] = useState({

    ID_Usuario: "", // ou o id do usuário logado
    Nome_Receita: "",
    Descricao: "",
    Tempo_Preparo: "",
    Custo_Total_Ingredientes: "",
    Porcentagem_De_Lucro: "",
    Categoria: "",
    imagem_URL: null,
    Data_Receita: "", // pode ser preenchido automaticamente no backend
  });

  const [isClosing, setIsClosing] = useState(false);
  const [ingredienteBusca, setIngredienteBusca] = useState("");
  const [ingredientesSelecionados, setIngredientesSelecionados] = useState([]);
  const [camposInvalidos, setCamposInvalidos] = useState({});

  const categorias = [
    "Carnes", "Aves", "Peixes e Frutos do Mar", "Massas", "Arroz e Grãos",
    "Doces", "Sobremesas", "Bolos e Tortas", "Pães e Biscoitos", "Sopas e Caldos",
    "Molhos e Pastas", "Bebidas", "Vegano", "Vegetariano", "Sem Glúten", "Sem Lactose"
  ];

  const [ingredientesDisponiveis, setIngredientesDisponiveis] = useState([
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
  ]);


  const handleClose = () => setIsClosing(true);

  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => onClose(), 300);
      return () => clearTimeout(timer);
    }
  }, [isClosing, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Impede letras nos campos Tempo_Preparo e Porcentagem_De_Lucro
    if (name === "Tempo_Preparo" || name === "Porcentagem_De_Lucro") {
      // Permite apenas números e ponto ou vírgula
      const onlyNumbers = value.replace(/[^0-9.,]/g, "");
      setForm((prev) => ({ ...prev, [name]: onlyNumbers }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }

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
      setForm((prev) => ({ ...prev, imagem_URL: file }));
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
        if (jaExiste) return prevDisponiveis; // já está lá, não adiciona de novo

        return [...prevDisponiveis, {
          nome: ingredienteRemovido.nome,
          unidade: ingredienteRemovido.unidade,
        }];
      });

      return prevSelecionados.filter((_, i) => i !== index);
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  // Validação: Categoria obrigatória
  if (!form.Categoria) {
    setCamposInvalidos((prev) => ({ ...prev, categoria: true }));
    toast.error("Selecione uma categoria para a receita.");
    return;
  }

  // Não faz validação para Descricao, permitindo que fique vazio

  // Converter para número — se for vazio ou inválido, usar 0
  const custoTotal = Number(form.Custo_Total_Ingredientes);
  const custoParaEnvio = isNaN(custoTotal) || custoTotal < 0 ? 0 : custoTotal;

  const formData = new FormData();
  formData.append('Nome_Receita', form.Nome_Receita);
  formData.append('Descricao', form.Descricao || ""); // Permite vazio
  formData.append('Tempo_Preparo', form.Tempo_Preparo);
  formData.append('Custo_Total_Ingredientes', custoParaEnvio);
  formData.append('Porcentagem_De_Lucro', form.Porcentagem_De_Lucro);
  formData.append('Categoria', form.Categoria);

  // Agora a imagem é opcional
  if (fileInputRef.current?.files?.[0]) {
    formData.append('imagem_URL', fileInputRef.current.files[0]);
  }

  const token = localStorage.getItem("token");

  try {
    const response = await fetch("http://localhost:3001/api/receitas", {
      method: "POST",
      body: formData,
      headers: {
        "Authorization": `Bearer ${token}`,
        // Não defina 'Content-Type' aqui, o navegador cuida disso para FormData
      },
    });

    const responseText = await response.text();

    if (!response.ok) {
      try {
        const errorData = JSON.parse(responseText);
        throw new Error(`Erro ${response.status}: ${errorData.message || JSON.stringify(errorData)}`);
      } catch {
        throw new Error(`Erro ${response.status}: ${responseText}`);
      }
    }

    try {
      const data = JSON.parse(responseText);
      console.log("✅ Receita salva com sucesso!", data);
      toast.success("Receita salva com sucesso!");
      onSave && onSave(data);
      onClose && onClose();
    } catch (parseError) {
      throw new Error("Resposta do servidor não é um JSON válido");
    }
  } catch (err) {
    console.error("❌ Erro ao salvar receita:", err.message);
    toast.error(`Erro ao salvar receita: ${err.message}`);
  }
};



  return (
    <div className={`${styles.modalOverlay} ${isClosing ? styles.modalExit : styles.modalEnter}`}>
      <div className={`${styles.modalContainer} shadow`}>
        <div className={styles.modalHeader}>
          <h5>Cadastrar Receita</h5>
          <button onClick={handleClose} className={styles.btnClose}>&times;</button>
        </div>

        <div className={styles.modalBody}>
          <div className="row">
            {/* Coluna Esquerda */}

            <div className="col-6">

              <div className="row">

                <div className="col-6">

                  {/* imagem */}
                  <div className={`${styles.formGroup} align-items-center`}>
                    <input
                      type="file"
                      id="imagemInput"
                      accept="image/png, image/jpeg, image/jpg, image/webp"
                      onChange={handleImageChange}
                      className={styles.hiddenFileInput}
                      ref={fileInputRef}  // <-- aqui, pra acessar o arquivo depois
                    />

                    <label htmlFor="imagemInput" className={styles.imagePreviewBox}
                      style={{
                        backgroundImage: form.imagem ? `url(${form.imagem})` : 'none',
                      }}
                    >
                      {!form.imagem && <span>Selecione uma imagem</span>}
                    </label>
                  </div>
                  {/* Tempo de Preparo */}
                  <div className={`${styles.formGroup} mt-4`}>
                    <label>Tempo de Preparo (Min.)</label>
                    <input
                      name="Tempo_Preparo"
                      autoComplete="off"
                      className={`form-control ${camposInvalidos.Tempo_Preparo ? styles.erroInput : ""}`}
                      inputMode="decimal"
                      value={form.Tempo_Preparo}
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
                      name="Nome_Receita"
                      autoComplete="off"
                      className={`form-control ${camposInvalidos.Nome_Receita ? styles.erroInput : ""}`}
                      value={form.Nome_Receita}
                      onChange={handleChange}
                      placeholder="Ex: Bolo de Chocolate"
                    />
                  </div>

                  {/* Categoria */}
                  <div className={`${styles.formGroup} mt-4`}>
                    <label>Categoria</label>
                    <select
                      name="Categoria"
                      className={`form-control ${camposInvalidos.categoria ? styles.erroInput : ""}`}
                      value={form.Categoria}
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
                      name="Porcentagem_De_Lucro"
                      autoComplete="off"
                      className={`form-control ${camposInvalidos.porcentagemDeLucro ? styles.erroInput : ""}`}
                      inputMode="decimal"
                      value={form.Porcentagem_De_Lucro}
                      onChange={handleChange}
                      placeholder="Ex: 20"
                    />
                  </div>
                </div>
              </div>

              <div className={`${styles.formGroup} mt-3`}>
                <label>Descrição</label>
                <textarea
                  name="Descricao"
                  className="form-control"
                  value={form.Descricao}
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
                  <div className={`${styles.tabelaCabecalho}`}>
                    <span className={`${styles.nomeIngrediente}`}>Nome</span>
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

export default ModalCadastroReceita;
