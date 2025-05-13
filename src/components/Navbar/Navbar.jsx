import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css"; // Importando o CSS global

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <img
            src={`${import.meta.env.BASE_URL}midia/logo_caderno_do_chef.png`}
            alt="Logo Caderno do Chef"
            className="logo"
          />
        </Link>

        {/* Botão colapsável mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse navbar-links" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/produtos" ? "active" : ""
                }`}
                to="/produtos"
              >
                Produtos
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/receitas" ? "active" : ""
                }`}
                to="/receitas"
              >
                Receitas
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/relatorios" ? "active" : ""
                }`}
                to="/relatorios"
              >
                Relatórios
              </Link>
            </li>
            
          </ul>
          <button className="btn btn-outline-light btn-login ms-3 custom-btn">
            <i className="bi bi-box-arrow-right"></i> Sair
          </button>
        </div>
      </div>
    </nav>
  );
}
