import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './navbar.module.css';

const Navbar = (props) => {
    const navigate = useNavigate();

    return (
        <header className={styles['navbar-container1']}>
            <div className={styles['navbar-navbar-interactive']}>
                <img
                    alt="Logo Caderno do Chef"
                    src="/midia/logo_caderno_do_chef.png"
                    className={styles['navbar-image1']}
                />

                
                <div className={styles['navbar-buttons']}>
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
        </header>
    );
};

export default Navbar;
