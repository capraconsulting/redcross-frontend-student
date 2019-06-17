import React, { FunctionComponent } from 'react';
import '../../styles/Footer.less';

const Footer: FunctionComponent = () => (
  <div className="footer">
    <h1 className="footer--content" id="footer--content">
      Følg oss på{' '}
      <a
        className="footer-content-link"
        href="https://www.facebook.com/digitalleksehjelp/"
      >
        Facebook
      </a>
    </h1>
  </div>
);

export default Footer;
