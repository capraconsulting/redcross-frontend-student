import React from 'react';
import '../../styles/Header.less';
import getApplicationTitle from '../../services/header-service';

interface IProps {
  isOpen: boolean;
  time: Date;
}

export default function Header(props: IProps) {
  return (
    <div className="header">
      <a className="header--link" href="https://www.digitalleksehjelp.no/">
        <span className="header--logo" id="header--logo">
          {getApplicationTitle('Digital Leksehjelp')}
        </span>
        <span className="header--serviceStatusMessage">
          {!props.isOpen &&
            props.time.getDay() >= 5 &&
            ' åpner mandag kl. 17:00'}
          {!props.isOpen && props.time.getDay() < 5 && ' åpner kl. 17:00'}
          {props.isOpen && ' åpen'}
        </span>
      </a>
      <span>
        <img
          className="header--rk_logo"
          src={require('../../assets/images/rk_logo.png')}
        />
      </span>
    </div>
  );
}
