// Sections for this page
import React from 'react';
import Zoom from 'react-reveal/Zoom';

//Styles
import '../../styles/LandingPage.less';

// Sections
import {
  SectionHero,
  SectionQuestions,
  SectionLeksehjelp,
  SectionMestring,
  SectionFrivillig,
} from './Sections';

const LandingPage = () => {
  return (
    <div className="content">
      <Zoom>
        <SectionHero />
        <SectionQuestions />
        <SectionLeksehjelp />
        <SectionMestring />
        <SectionFrivillig />
      </Zoom>
    </div>
  );
};

export default LandingPage;
