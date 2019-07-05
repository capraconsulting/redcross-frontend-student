import React from 'react';

// Styles
import '../../styles/NewQuestionPage.less';

// Sections
import { SectionForm, SectionHeader } from './Sections';

const NewQuestionPage = () => {
  return (
    <div className="content">
      {SectionHeader()}
      {SectionForm()}
    </div>
  );
};

export default NewQuestionPage;
