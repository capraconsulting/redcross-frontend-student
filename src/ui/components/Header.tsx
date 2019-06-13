import React, { FunctionComponent } from 'react'; 

type HeaderState = {
  isOpen?: boolean,
}

const Header: FunctionComponent<HeaderState> = ({isOpen}) => (
  <p>Digital Leksehjelp {isOpen ? "Åpent" : "Åpner kl. 17:00"}</p>
);

export default Header;