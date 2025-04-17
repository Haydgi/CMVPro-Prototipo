import '../assets/Modal.css';

function CadastroModal({ onClose }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Cadastro enviado!");
    onClose(); // Fecha o modal após o envio
  };

  return (
    <div className="modal-overlay" onClick={onClose}> {/* Fundo escuro clicável */}
      <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}> {/* Impede o fechamento ao clicar dentro do modal */}
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">
              <i className="bi bi-person-plus"></i> Cadastro
            </h5>
            <button type="button" className="btn-close fechar" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="nome" className="form-label">Nome</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nome"
                    placeholder="Digite seu nome"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="sobrenome" className="form-label">Sobrenome</label>
                  <input
                    type="text"
                    className="form-control"
                    id="sobrenome"
                    placeholder="Digite seu sobrenome"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">E-mail</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Digite seu e-mail"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="senha" className="form-label">Senha</label>
                  <input
                    type="password"
                    className="form-control"
                    id="senha"
                    placeholder="Digite sua senha"
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-login w-100 mt-4">Criar Conta</button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CadastroModal;
