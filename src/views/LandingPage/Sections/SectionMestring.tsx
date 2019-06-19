import React from 'react';
import '../../../styles/LandingPage.less';

const SectionMestring = () => {
  return (
    <div className="mestring">
      <a href="/mestring" style={{ textDecoration: 'none', color: 'black' }}>
        <div className="mestring--header">Mestring og motivasjon</div>
      </a>

      <form className="mestring--form">
        <div className="mestring--form--header">
          Se hvilke temaer vi kan hjelpe deg med
        </div>

        <form className="mestring--form--input"></form>
      </form>
    </div>
  );
};

export default SectionMestring;
