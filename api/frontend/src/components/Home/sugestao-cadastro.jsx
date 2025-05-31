import React, { Fragment } from 'react'

import PropTypes from 'prop-types'

import './sugestao-cadastro.css'

const SugestaoCadastro = (props) => {
  return (
    <div className="thq-section-padding">
      <div className="thq-section-max-width">
        <div className="sugestao-cadastro-accent2-bg">
          <div className="sugestao-cadastro-accent1-bg">
            <div className="sugestao-cadastro-container2">
              <div className="sugestao-cadastro-content">
                <span className="thq-heading-2">
                  {props.heading1 ?? (
                    <Fragment>
                      <span className="sugestao-cadastro-text4">
                        Ready to Cook?
                      </span>
                    </Fragment>
                  )}
                </span>
                <p className="thq-body-large">
                  {props.content1 ?? (
                    <Fragment>
                      <span className="sugestao-cadastro-text5">
                        Explore our collection of delicious recipes and start
                        cooking like a pro!
                      </span>
                    </Fragment>
                  )}
                </p>
              </div>
              <div className="sugestao-cadastro-actions">
                <button
                  type="button"
                  className="thq-button-filled sugestao-cadastro-button"
                >
                  <span>
                    {props.action1 ?? (
                      <Fragment>
                        <span className="sugestao-cadastro-text6">
                          Get Cooking
                        </span>
                      </Fragment>
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

SugestaoCadastro.defaultProps = {
  heading1: undefined,
  content1: undefined,
  action1: undefined,
}

SugestaoCadastro.propTypes = {
  heading1: PropTypes.element,
  content1: PropTypes.element,
  action1: PropTypes.element,
}

export default SugestaoCadastro
