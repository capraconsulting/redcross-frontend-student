import React from 'react';
import Zoom from 'react-reveal/Zoom';

//Sections
import { SectionInfo, SectionRecruiting } from './Sections';

//Styles
import '../../styles/LandingPage.less';

export const FrivilligePage = () => {
  return (
    <div className="content">
      <div className="volunteersPage">
        <Zoom>
          <SectionInfo />
          <SectionRecruiting />
        </Zoom>
      </div>
    </div>
  );
};

export default FrivilligePage;
