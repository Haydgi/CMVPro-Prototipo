import { Link, useLocation } from 'react-router-dom';
import '../assets/Navbar.css'
import '../assets/global.css'

function Navbar({ onLogout }) {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <img src={`${import.meta.env.BASE_URL}midia/logoCMV.png`} alt="Logo" className="logo" />
        <Link className="nav-link" to="/">CMVPro</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/produtos' ? 'active' : ''}`} to="/produtos">Produtos</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/receitas' ? 'active' : ''}`} to="/receitas">Receitas</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Relatórios <i class="bi bi-printer"></i></a>
            </li>
          </ul>

          <button className="btn btn-outline-light btn-login ms-3 custom-btn" onClick={onLogout}>
            <i className="bi bi-box-arrow-right"></i> Sair
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
