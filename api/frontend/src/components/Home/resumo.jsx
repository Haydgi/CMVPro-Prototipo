import React, { Fragment } from 'react';
import styles from './resumo.module.css';
import ChefInvestido from '../../assets/ChefInvestido.png'; // Importando a imagem

const Resumo = () => {
  return (
    <div className={styles['thq-section-padding']}>
      <div className={`${styles['resumo-container2']} ${styles['thq-section-max-width']}`}>
        <div className={styles['resumo-image-container']}>
          <div className={styles['resumo-tabs-menu']}>
            <div className={styles['resumo-tab-horizontal1']}>
              <div className={styles['resumo-content1']}>
                <h1>Quem cozinha bem, merece lucrar mais</h1>
                <h2 className={styles['thq-heading-2']}>
                  <Fragment>
                    <span className={styles['resumo-text4']}>Tenha controle dos seus custos, 
                      precifique com precisão e tome decisões com base nos dados reais do seu negócio</span>
                  </Fragment>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resumo;
