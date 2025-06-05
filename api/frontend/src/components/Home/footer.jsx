import React, { Fragment } from 'react'
import logomanuscrito from '../../assets/logotipo-manuscrito.png'

import PropTypes from 'prop-types'

import './footer.css'

const Footer = (props) => {
  return (
    <footer className="footer-footer7 thq-section-padding">
      <div className="footer-max-width thq-section-max-width">
        <div className="footer-content">
          <div className="footer-links"></div>
        </div>
        <div className="footer-credits">
          <div className="thq-divider-horizontal"></div>
          <div className="footer-row">
            <div className="footer-container">
              <span className="thq-body-small">© 2025 Caderno do Chef</span>
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
