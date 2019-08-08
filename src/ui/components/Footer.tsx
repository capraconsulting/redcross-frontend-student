import React from 'react';
import Zoom from 'react-reveal/Zoom';
import Roll from 'react-reveal/Roll';
import { SocialIcon } from 'react-social-icons';

//Styles
import '../../styles/Footer.less';

const Footer = () => (
  <div>
    <Zoom>
      <a href="https://www.rodekors.no/" className="footer--container--logo">
        <img
          className="rk-icon"
          src={require('../../assets/images/rk_logo.png')}
        />
      </a>
    </Zoom>
    <Zoom>
      <a className="facebook-icon" id="footer--content">
        <SocialIcon
          url="https://www.facebook.com/digitalleksehjelp/"
          style={{ height: 40, width: 40 }}
        />
      </a>
    </Zoom>
  </div>
);

export default Footer;
