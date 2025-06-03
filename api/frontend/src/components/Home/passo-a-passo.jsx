import React, { Fragment } from 'react';
import './passo-a-passo.css';
import ChefFeliz from '/midia/chef_caderno.png';

const PassoAPasso = (props) => {
  return (
    <div className={`passo-a-passo-container1 thq-section-padding ${props.rootClassName}`}>
      <div className="passo-a-passo-max-width thq-section-max-width">
        <div className="passo-a-passo-container2 thq-grid-2">
          <div className="passo-a-passo-section-header">
            <h2 className="thq-heading-2">Descubra o poder do nosso caderno</h2>
            <img
              src={ChefFeliz}
              alt={props.imageAlt}
              className="passo-a-passo-image"
            />
          </div>
          <div className="passo-a-passo-container3">
            <div className="passo-a-passo-container4 thq-card">
              <h2 className="card-roxo">
                {props.step1Title ?? (
                  <Fragment>
                    <span className="passo-a-passo-text27">Cadastre os ingredientes</span>
                  </Fragment>
                )}
              </h2>
              <span className="passo-a-passo-text12 thq-body-small">
                {props.step1Description ?? (
                  <Fragment>
                    <span className="passo-a-passo-text23">Lore ipsum</span>
                  </Fragment>
                )}
              </span>
              <label className="passo-a-passo-text13 thq-heading-3">01</label>
            </div>
            <div className="passo-a-passo-container5 thq-card">
              <h2 className="thq-heading-2">
                {props.step2Title ?? (
                  <Fragment>
                    <span className="passo-a-passo-text25">Cadastre suas receitas</span>
                  </Fragment>
                )}
              </h2>
              <span className="passo-a-passo-text15 thq-body-small">
                {props.step2Description ?? (
                  <Fragment>
                    <span className="passo-a-passo-text26">Lore ipsum</span>
                  </Fragment>
                )}
              </span>
              <label className="passo-a-passo-text16 thq-heading-3">02</label>
            </div>
            <div className="passo-a-passo-container6 thq-card">
              <h2 className="card-roxo">
                {props.step3Title ?? (
                  <Fragment>
                    <span className="passo-a-passo-text28">Toques finais</span>
                  </Fragment>
                )}
              </h2>
              <span className="passo-a-passo-text18 thq-body-small">
                {props.step3Description ?? (
                  <Fragment>
                    <span className="passo-a-passo-text24">Lore ipsum</span>
                  </Fragment>
                )}
              </span>
              <label className="passo-a-passo-text19 thq-heading-3">03</label>
            </div>
            <div className="passo-a-passo-container7 thq-card">
              <h2 className="thq-heading-2">
                {props.step4Title ?? (
                  <Fragment>
                    <span className="passo-a-passo-text30">Aproveite!</span>
                  </Fragment>
                )}
              </h2>
              <span className="passo-a-passo-text21 thq-body-small">
                {props.step4Description ?? (
                  <Fragment>
                    <span className="passo-a-passo-text29">Lore ipsum</span>
                  </Fragment>
                )}
              </span>
              <label className="passo-a-passo-text22 thq-heading-3">04</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PassoAPasso.defaultProps = {
  step1Description: undefined,
  step3Description: undefined,
  step2Title: undefined,
  step2Description: undefined,
  step1Title: undefined,
  step3Title: undefined,
  step4Description: undefined,
  step4Title: undefined,
  rootClassName: '',
  imageSrc: 'https://play.teleporthq.io/static/svg/default-img.svg',
  imageAlt: 'image',
};

export default PassoAPasso;
