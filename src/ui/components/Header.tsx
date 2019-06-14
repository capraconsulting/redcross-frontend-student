import React, { FunctionComponent } from 'react';
import '../../styles/Header.css';

type HeaderState = {
  isOpen?: boolean,
}

const Header: FunctionComponent<HeaderState> = ({isOpen}) => (
  <div className="header">
    <a className="header--link" href="https://www.digitalleksehjelp.no/">
    <span className="header--logo">Digital Leksehjelp </span> 
    <span className="header--serviceStatusMessage">{isOpen ? "åpen nå" : "åpner kl. 17:00"}</span> 
    </a>
    <span>
      <img className="header--rk_logo"src={require('../../assets/images/rk_logo.png')} />
    </span>
  </div>
);

export default Header;