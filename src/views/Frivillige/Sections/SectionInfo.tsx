import React from 'react';

//Styles
import '../../../styles/LandingPage.less';

const SectionInfo = () => {
  return (
    <div className="volunteer">
      <div className="volunteer--header">Våre frivillige</div>
      <p className="volunteer--text" id="volunteer--text">
        På samme måte som de fleste andre aktiviteter i Røde Kors, er Digital
        Leksehjelp drevet av frivillige. Våre frivillige er trygge
        voksenpersoner som bruker sine fagkunnskaper og sitt engasjement til å
        gjøre elevers skolehverdag bedre og legge til rette for mestring,
        motivasjon og lærelyst.{' '}
      </p>
      <a href="/frivillige" className="volunteer--text--colored">
        Les mer...
      </a>
      <div className="volunteer--image">
        <img
          src={require('../../../assets/images/volunteers_1.jpg')}
          className="volunteer--image--content"
        ></img>
      </div>
    </div>
  );
};

export default SectionInfo;
