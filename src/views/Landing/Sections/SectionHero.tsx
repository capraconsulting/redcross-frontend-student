import React from 'react';

//Styles
import '../../../styles/LandingPage.less';
import { useOpeningHours } from '../../../providers/OpeningHoursProvider';

export const SectionHero = () => {
  const { announcement } = useOpeningHours();

  return (
    <div className="hero">
      <div className="hero--description">
        <span className="hero--description--colored">Gratis, trygt </span> og{' '}
        <span className="hero--description--colored">anonymt</span> for deg på
        ungdomsskolen og videregående.
      </div>
      {announcement && announcement.length > 0 && (
        <div className="hero--tips" id="hero--tips">
          {announcement}
        </div>
      )}
      <img
        className="hero--svg"
        src={require('../../../assets/images/figure_1.svg')}
      />
    </div>
  );
};

export default SectionHero;
