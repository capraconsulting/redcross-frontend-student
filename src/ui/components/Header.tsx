import React, { useState, useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

//Styles
import '../../styles/Header.less';

//Services
import getApplicationTitle from '../../services/header-service';

export const Header = (props: RouteComponentProps) => {
  let { history } = props;

  //Constructing state
  const [time, setTime] = useState(new Date() as Date);
  const [isOpen] = useState(false as boolean);

  useEffect(() => {
    setInterval(() => setTime(new Date()), 10 * 1000);
  }, []);

  return (
    <div className="header">
      <a className="header--link" onClick={() => history.push('/')}>
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
};

export default withRouter(Header);
