import React from 'react'
import { useNavigate } from 'react-router-dom'

import './navbar.css'

const Navbar = (props) => {
  const navigate = useNavigate()

  return (
    <header className="navbar-container1">
      <div className="navbar-navbar-interactive">
        <img
          alt={props.logoAlt}
          src={props.logoSrc}
          className="navbar-image1"
        />
        <div className="navbar-buttons1">
          <button
            className="navbar-action-login"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <button
            className="navbar-action-signup"
            onClick={() => navigate('/cadastro')}
          >
            Cadastro
          </button>
        </div>
      </div>
    </header>
  )
}

Navbar.defaultProps = {
  logoAlt: 'Caderno do Chef Logo',
  logoSrc:
    'https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/84ec08e8-34e9-42c7-9445-d2806d156403/fac575ac-7a41-484f-b7ac-875042de11f8?org_if_sml=1&force_format=original',
}

export default Navbar
