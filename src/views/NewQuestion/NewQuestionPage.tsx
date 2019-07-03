import React from 'react';

// Styles
import '../../styles/NewQuestionPage.less';

// Sections
import { QAForm, SectionHeader } from './Sections';

const NewQuestionPage = () => {
  return (
    <div className="content">
      {SectionHeader()}
      {QAForm()}
    </div>
  );
};

export default NewQuestionPage;
