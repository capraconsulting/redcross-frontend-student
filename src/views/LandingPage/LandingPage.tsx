// Sections for this page
import React from 'react';

//Styles
import '../../styles/LandingPage.less';

// Sections
import SectionHero from './Sections/SectionHero';
import SectionQuestions from './Sections/SectionQuestions';
import SectionLeksehjelp from './Sections/SectionLeksehjelp';
import SectionMestring from './Sections/SectionMestring';

const LandingPage = () => {
  return (
    <div className="content">
      <SectionHero />
      <SectionQuestions />
      <SectionLeksehjelp />
      <SectionMestring />
    </div>
  );
};

export default LandingPage;
