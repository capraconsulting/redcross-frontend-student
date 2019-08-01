import React from 'react';

// Sections
import { SectionForm, SectionHeader } from './Sections';

const NewQuestionPage = () => {
  return (
    <div className="content">
      {SectionHeader()}
      <SectionForm />
    </div>
  );
};

export default NewQuestionPage;
