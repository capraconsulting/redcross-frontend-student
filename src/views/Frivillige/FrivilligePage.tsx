import React from 'react';

//Sections
import { SectionInfo, SectionRecruiting } from './Sections';

//Styles
import '../../styles/LandingPage.less';

export const FrivilligePage = () => {
  return (
    <div className="content">
      <div className="volunteersPage">
        <SectionInfo />
        <SectionRecruiting />
      </div>
    </div>
  );
};

export default FrivilligePage;
