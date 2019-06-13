import React, { FunctionComponent } from 'react'; 

const Footer: FunctionComponent = () => (
  <p>
    Følg oss på <a href="https://www.facebook.com/digitalleksehjelp/">Facebook</a>)}
  </p>
);

const styles = {
    footer: {
        position: 'fixed',
        left: 0, 
        bottom: 0,
        width: '100%',
        backgroundColor: 'red',
        color: 'white',
        textAlign: 'center',
    }
}

export default Footer;

