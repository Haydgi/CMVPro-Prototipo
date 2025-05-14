import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const handleLogout = () => {
    // Lógica para logout
    console.log("Usuário saiu");
  };

  return (
    <div className="container-fluid">
      <nav className="navbar">
        {/* Logo no canto esquerdo */}
        

        {/* Links de navegação */}
        <ul className="nav-list">
          <li>
            <NavLink
              to="/receitas"
              className="hoverable"
              activeClassName="active"
            >
              Receitas
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/relatorios"
              className="hoverable"
              activeClassName="active"
            >
              Relatórios
            </NavLink>
          </li>
          <li>
          <img src={`${import.meta.env.BASE_URL}midia/logo_caderno_do_che2.png`} alt="Logo" className="logo" />
         </li>
          
          <li>
            <NavLink
              to="/ingredientes"
              className="hoverable"
              activeClassName="active"
            >
              Ingredientes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/despesas"
              className="hoverable"
              activeClassName="active"
            >
              Despesas
            </NavLink>
          </li>
        </ul>

        {/* Botão de sair no canto direito */}
        <button className="btnLogout" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right"></i> Sair
        </button>
        
      </nav>
    </div>
  );
}
