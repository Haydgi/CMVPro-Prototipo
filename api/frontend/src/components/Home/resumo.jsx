import React, { Fragment } from 'react'
import './resumo.css'
import ChefInvestido from './ChefInvestido.png' // Importando a imagem

const Resumo = () => {
  return (
    <div className="thq-section-padding">
      <div className="resumo-container2 thq-section-max-width">
        <div className="resumo-image-container">
          <img
            alt="Chef Investido"
            src={ChefInvestido}
            className="resumo-image1 thq-img-ratio-16-9"
          />
        </div>
        <div className="resumo-tabs-menu">
          <div className="resumo-tab-horizontal1">
            <div className="resumo-content1">
              <h2 className="thq-heading-2">
                <Fragment>
                  <span className="resumo-text4">Inspiring Recipes</span>
                </Fragment>
              </h2>
              <span className="thq-body-small">
                <Fragment>
                  <span className="resumo-text5">
                    Explore a variety of mouth-watering recipes
                  </span>
                </Fragment>
              </span>
            </div>
          </div>
          <div className="resumo-tab-horizontal2">
            <div className="resumo-content2">
              <h2 className="thq-heading-2">
                <Fragment>
                  <span className="resumo-text6">Guided Cooking Instructions</span>
                </Fragment>
              </h2>
              <span className="thq-body-small">
                <Fragment>
                  <span className="resumo-text3">
                    Step-by-step guides for perfect dishes
                  </span>
                </Fragment>
              </span>
            </div>
          </div>
          <div className="resumo-tab-horizontal3">
            <div className="resumo-content3">
              <h2 className="thq-heading-2">
                <Fragment>
                  <span className="resumo-text2">Cooking Tips &amp; Tricks</span>
                </Fragment>
              </h2>
              <span className="thq-body-small">
                <Fragment>
                  <span className="resumo-text1">
                    Discover new cooking techniques and skills
                  </span>
                </Fragment>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Resumo
