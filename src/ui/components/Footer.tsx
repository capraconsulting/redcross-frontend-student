import React from 'react';

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
      <h1 className="footer--container--text" id="footer--content">
        Følg oss på{' '}
        <a
          className="footer--container--text--link"
          href="https://www.facebook.com/digitalleksehjelp/"
        >
          Facebook
        </a>
      </h1>
    </div>
  </div>
);

export default Footer;
