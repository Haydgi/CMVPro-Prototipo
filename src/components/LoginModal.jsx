function LoginModal({ onClose, onLogin }) {
    const handleSubmit = (e) => {
      e.preventDefault();
      onLogin();
    };
  
    return (
      <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <div className="modal-dialog">
          <div className="modal-content">
  
            <div className="modal-header">
              <h5 className="modal-title"><i className="bi bi-person-circle"></i> Login</h5>
              <button type="button" className="btn-close fechar" onClick={onClose}></button>
            </div>
  
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    <i className="bi bi-envelope-at"></i> E-mail
                  </label>
                  <input type="email" className="form-control" id="email" placeholder="Digite seu e-mail" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    <i className="bi bi-key"></i> Senha
                  </label>
                  <input type="password" className="form-control" id="password" placeholder="Digite sua senha" required />
                </div>
                <button type="submit" className="btn btn-login w-100">Entrar</button>
                <div className="text-end mt-2">
                  <a href="#" className="esqueci-senha">Esqueci minha senha</a>
                </div>
              </form>
            </div>
  
          </div>
        </div>
      </div>
    );
  }
  
  export default LoginModal;
  