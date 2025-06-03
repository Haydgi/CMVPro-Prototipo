import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './navbar.module.css';

const Navbar = (props) => {
    const navigate = useNavigate();

    return (
        <h1 className={styles['navbar-container1']}>
            <div className={styles['navbar-navbar-interactive']}>
                <img
                    alt="Logo Caderno do Chef"
                    src="/midia/logo_caderno_do_chef.png"
                    className={styles['navbar-image1']}
                />

                <div className={styles.links}>
                    <a
                        href="/"
                        className={styles.links}
                    >
                        Home
                    </a>
                    <a
                        href="/sobre"
                        className={styles.links}
                    >
                        Sobre
                    </a>
                    <a
                        href="/contato"
                        className={styles.links}
                    >
                        Contato
                    </a>
                </div>

                <div className={styles['navbar-buttons1']}>
                    <button
                        className={`btnUltraViolet ${styles.btnUltraViolet}`}
                        onClick={() => navigate('/sign-in')}
                    >
                        Login
                    </button>
                    <button
                        className={`btnUltraViolet ${styles.btnUltraViolet}`}
                        onClick={() => navigate('/sign-up')}
                    >
                        Cadastro
                    </button>
                </div>
            </div>
        </h1>
    );
};

export default Navbar;
