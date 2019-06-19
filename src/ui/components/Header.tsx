import React from 'react';
import '../../styles/Header.less';
import getApplicationTitle from '../../services/header-service';

interface IProps {
  isOpen: boolean;
  time: Date;
}

export default function Header(props: IProps) {
  const { isOpen, time } = props;
  return (
    <div className="header">
      <a className="header--link" href="/">
        <span className="header--logo" id="header--logo">
          {getApplicationTitle('Digital Leksehjelp')}
        </span>
        <span className="header--serviceStatusMessage">
          {!isOpen && time.getDay() >= 5 && ' åpner mandag kl. 17:00'}
          {!isOpen && time.getDay() < 5 && ' åpner kl. 17:00'}
          {isOpen && ' åpen'}
        </span>
      </a>
      <span>
        <a href="https://www.rodekors.no/">
          <img
            className="header--rk_logo"
            src={require('../../assets/images/rk_logo.png')}
          />
        </a>
      </span>
    </div>
  );
}
