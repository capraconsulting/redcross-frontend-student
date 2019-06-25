import React from 'react';
import Dropdown from 'react-dropdown';

// Styes
import '../../../styles/LandingPage.less';

const SectionMestring = () => {
  return (
    <div className="help">
      <div>
        <div className="mestring">
          <a
            href="/mestring"
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <div className="mestring--header">Mestring og motivasjon</div>
          </a>

          <form className="mestring--form">
            <div className="mestring--form--header">
              Se hvilke temaer vi kan hjelpe deg med
            </div>
            <Dropdown
              options={[]}
              placeholder="F.eks motivasjon, læringsmetoder"
            />
          </form>
        </div>
        <div className="cross-my-heart">
          Trenger du noen å snakke med?{' '}
          <a
            href="https://korspaahalsen.rodekors.no/"
            className="cross-my-heart--link"
          >
            Kors på halsen
          </a>
        </div>
      </div>
      <img
        src={require('../../../assets/images/figure_2.svg')}
        className="help--image"
      />
    </div>
  );
};

export default SectionMestring;
