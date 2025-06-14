import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "../../../Styles/global.css";
import styles from "./ModalCadastroDespesa.module.css";
import { IoWalletSharp } from "react-icons/io5";

function ModalCadastroDespesa({ onClose, onSave }) {
  const [form, setForm] = useState({
    nome: "",
    custoMensal: "",
    tempoOperacional: "",
  });

  const [isClosing, setIsClosing] = useState(false);
  const [camposInvalidos, setCamposInvalidos] = useState({});

  const handleClose = () => setIsClosing(true);

  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => onClose(), 300);
      return () => clearTimeout(timer);
    }
  }, [isClosing, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue =
      name === "custoMensal" || name === "tempoOperacional"
        ? value.replace(/[^\d,]/g, "").replace(/(,.*?),/g, "$1")
        : value;

    setForm((prev) => ({ ...prev, [name]: newValue }));

    if (camposInvalidos[name]) {
      setCamposInvalidos((prev) => {
        const novo = { ...prev };
        delete novo[name];
        return novo;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const campos = {};
    if (!form.nome.trim()) campos.nome = true;
    if (!form.custoMensal) campos.custoMensal = true;
    if (!form.tempoOperacional) campos.tempoOperacional = true;

    if (Object.keys(campos).length > 0) {
      setCamposInvalidos(campos);
      toast.error("Preencha todos os campos obrigatórios!");
      return;
    }

    const despesa = {
      nome: form.nome.trim(),
      custoMensal: parseFloat(form.custoMensal.replace(",", ".")),
      tempoOperacional: parseFloat(form.tempoOperacional.replace(",", ".")),
    };

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Usuário não autenticado");
        return;
      }

      const response = await fetch("http://localhost:3001/api/despesas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(despesa),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Despesa cadastrada com sucesso!");
        onSave?.(data);
        handleClose();
      } else {
        let errorData = {};
        try {
          errorData = await response.json();
        } catch {
          // resposta não é JSON, ignora
        }
        toast.error(errorData.error || "Erro ao cadastrar despesa");
      }
    } catch (error) {
      toast.error("Erro de conexão com o servidor");
      console.error(error);
    }
  };

  return (
    <div
      className={`${styles.modalOverlay} ${
        isClosing ? styles.modalExit : styles.modalEnter
      }`}
    >
      <div className={`${styles.modalContainer} shadow`}>
        <div className={styles.modalHeader}>
          <div className={styles.headerIconTitle}>
            <IoWalletSharp className={styles.walletIcon} />
            <h5>Cadastrar Despesa</h5>
          </div>
          <button onClick={handleClose} className={styles.btnClose}>
            &times;
          </button>
        </div>

        <form className={styles.modalBody} onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={`${styles.formGroup} ${styles.colSpan2}`}>
              <label>Nome da Despesa</label>
              <input
                name="nome"
                autoComplete="off"
                className={`form-control ${
                  camposInvalidos.nome ? styles.erroInput : ""
                }`}
                value={form.nome}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Custo Mensal (R$)</label>
              <input
                name="custoMensal"
                autoComplete="off"
                className={`form-control ${
                  camposInvalidos.custoMensal ? styles.erroInput : ""
                }`}
                inputMode="decimal"
                value={form.custoMensal}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Tempo Operacional (horas)</label>
              <input
                name="tempoOperacional"
                autoComplete="off"
                className={`form-control ${
                  camposInvalidos.tempoOperacional ? styles.erroInput : ""
                }`}
                inputMode="decimal"
                value={form.tempoOperacional}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.modalFooter}>
            <button
              type="button"
              className={styles.btnCancel}
              onClick={handleClose}
            >
              Cancelar
            </button>
            <button type="submit" className={styles.btnSave}>
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalCadastroDespesa;
