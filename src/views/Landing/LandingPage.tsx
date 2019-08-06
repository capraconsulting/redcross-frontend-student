// Sections for this page
import React, { useContext, useEffect, useState } from 'react';
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
import { getIsLeksehjelpOpen } from '../../services/api-service';

const LandingPage = () => {
  const [isLeksehjelpOpen, setIsLeksehjelpOpen] = useState<boolean>(false);

  useEffect(() => {
    getIsLeksehjelpOpen().then(data => setIsLeksehjelpOpen(data.isopen));
  }, []);

  return (
    <div className="content">
      <SectionHero />
      {isLeksehjelpOpen ? (
        <div>
          <SectionLeksehjelp />
          <SectionMestring />
          <SectionQuestions />
        </div>
      ) : (
        <div>
          <SectionQuestions />
          <SectionLeksehjelp />
          <SectionMestring />
        </div>
      )}
      <SectionFrivillig />
    </div>
  );
};

export default LandingPage;
