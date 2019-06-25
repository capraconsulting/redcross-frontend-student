// Sections for this page
import React from 'react';

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
      <SectionHero />
      <SectionQuestions />
      <SectionLeksehjelp />
      <SectionMestring />
      <SectionFrivillig />
    </div>
  );
};

export default LandingPage;
