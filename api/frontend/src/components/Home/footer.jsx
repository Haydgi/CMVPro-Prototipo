import React, { Fragment } from 'react'

import PropTypes from 'prop-types'

import './footer.css'

const Footer = (props) => {
  return (
    <footer className="footer-footer7 thq-section-padding">
      <div className="footer-max-width thq-section-max-width">
        <div className="footer-content">
          <div className="footer-logo1">
            <img
              alt={props.logoAlt}
              src={props.logoSrc}
              className="footer-logo2"
            />
          </div>
          <div className="footer-links"></div>
        </div>
        <div className="footer-credits">
          <div className="thq-divider-horizontal"></div>
          <div className="footer-row">
            <div className="footer-container">
              <span className="thq-body-small">© 2024 TeleportHQ</span>
            </div>
            <div className="footer-footer-links">
              <span className="footer-text2 thq-body-small">
                {props.privacyLink ?? (
                  <Fragment>
                    <span className="footer-text7">Privacy Policy</span>
                  </Fragment>
                )}
              </span>
              <span className="thq-body-small">
                {props.termsLink ?? (
                  <Fragment>
                    <span className="footer-text5">Terms of Use</span>
                  </Fragment>
                )}
              </span>
              <span className="thq-body-small">
                {props.cookiesLink ?? (
                  <Fragment>
                    <span className="footer-text6">Cookies Policy</span>
                  </Fragment>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

Footer.defaultProps = {
  termsLink: undefined,
  logoAlt: 'Caderno do Chef Logo',
  cookiesLink: undefined,
  logoSrc: 'https://presentation-website-assets.teleporthq.io/logos/logo.png',
  privacyLink: undefined,
}

Footer.propTypes = {
  termsLink: PropTypes.element,
  logoAlt: PropTypes.string,
  cookiesLink: PropTypes.element,
  logoSrc: PropTypes.string,
  privacyLink: PropTypes.element,
}

export default Footer
