import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { MdMenu } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const handleLogout = () => {
    console.log("Usuário saiu");
    navigate('/');
  };

  // Fecha o menu ao clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAberto(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="container-fluid">
      <nav className="navbar d-none d-md-flex">
        {/* Navbar Desktop original */}
        <ul className="nav-list">
          <li>
            <NavLink to="/receitas" className="hoverable" activeClassName="active">Receitas</NavLink>
          </li>
          <li>
            <NavLink to="/relatorios" className="hoverable" activeClassName="active">Relatórios</NavLink>
          </li>
          <li>
            <img src={`${import.meta.env.BASE_URL}midia/logo_caderno_do_che2.png`} alt="Logo" className="" />
          </li>
          <li>
            <NavLink to="/ingredientes" className="hoverable" activeClassName="active">Ingredientes</NavLink>
          </li>
          <li>
            <NavLink to="/despesas" className="hoverable" activeClassName="active">Despesas</NavLink>
          </li>
        </ul>
        <button className="btnLogout" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right"></i> Sair
        </button>
      </nav>

      {/* Navbar Mobile com Bootstrap */}
      <nav className="navbar navbar-expand-md d-flex d-md-none px-3">
        <img src={`${import.meta.env.BASE_URL}midia/logo_caderno_do_che2.png`} alt="Logo" className="navbar-logo" style={{ height: "40px" }} />
        
        <button
          className="btn"
          type="button"
          onClick={() => setMenuAberto(!menuAberto)}
        >
          <i className="MdMenu"><MdMenu /></i>
        </button>

        {menuAberto && (
          <div ref={menuRef} className="mobile-bootstrap-menu w-100 mt-2 bg-white rounded shadow-sm p-3">
            <ul className="navbar-nav flex-column">
              <li className="nav-item">
                <NavLink to="/receitas" className="nav-link" onClick={() => setMenuAberto(false)}>Receitas</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/relatorios" className="nav-link" onClick={() => setMenuAberto(false)}>Relatórios</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/ingredientes" className="nav-link" activeClassName="active" onClick={() => setMenuAberto(false)}>Ingredientes</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/despesas" className="nav-link" onClick={() => setMenuAberto(false)}>Despesas</NavLink>
              </li>
              <li className="nav-item mt-2">
                <button className="btnLogoutCelular" onClick={handleLogout}>
                  Sair <i className="bi bi-box-arrow-right"></i> 
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
}
