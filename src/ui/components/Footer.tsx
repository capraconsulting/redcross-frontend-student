import React from 'react';
import Zoom from 'react-reveal/Zoom';
import { SocialIcon } from 'react-social-icons';

//Styles
import '../../styles/Footer.less';

const Footer = () => (
  <div className="footer">
    <div className="footer--container">
      <a href="https://www.rodekors.no/" className="footer--container--logo">
        <img
          className="footer--rk_logo"
          src={require('../../assets/images/rk_logo.png')}
        />
      </a>
      <a className="footer--container--icon" id="footer--content">
        <SocialIcon
          url="https://www.facebook.com/digitalleksehjelp/"
          style={{ height: 40, width: 40 }}
        />
      </a>
    </div>
  </div>
);

export default Footer;
