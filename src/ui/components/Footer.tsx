import React from 'react';
import { SocialIcon } from 'react-social-icons';

//Styles
import '../../styles/Footer.less';

const Footer = () => (
  <div>
    <a
      href="https://www.rodekors.no/"
      className="rk_logo_container"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        className="rk-icon"
        src={require('../../assets/images/rk_logo.png')}
      />
    </a>
    <a className="facebook-icon" id="footer--content">
      <SocialIcon
        url="https://www.facebook.com/digitalleksehjelp/"
        style={{ height: '2rem', width: '2rem' }}
      />
    </a>
  </div>
);

export default Footer;
