import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import Zoom from 'react-reveal/Zoom';

//Styles
import '../../../styles/LandingPage.less';

const SectionFrivillig = (props: RouteComponentProps) => {
  const { history } = props;
  return (
    <div className="volunteer">
      <div className="volunteer--header">Våre frivillige</div>
      <p className="volunteer--text" id="sectionVolunteer--text">
        På samme måte som de fleste andre aktiviteter i Røde Kors, er Digital
        Leksehjelp drevet av frivillige. Våre frivillige er trygge
        voksenpersoner som bruker sine fagkunnskaper og sitt engasjement til å
        gjøre elevers skolehverdag bedre og legge til rette for mestring,
        motivasjon og lærelyst.{' '}
      </p>
      <a
        onClick={() => history.push('frivillige')}
        className="volunteer--text--colored"
      >
        Les mer...
      </a>
      <div className="volunteer--image">
        <a
          className="volunteer--image--badge_new"
          onClick={() => history.push('frivillige')}
        >
          <Zoom>Bli frivillig!</Zoom>
        </a>
        <img
          src={require('../../../assets/images/volunteers_1.jpg')}
          className="volunteer--image--content"
          alt="frivillig"
        ></img>
      </div>
    </div>
  );
};

export default withRouter(SectionFrivillig);
