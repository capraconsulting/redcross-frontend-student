import React from 'react';
import '../../../styles/LandingPage.less';

const SectionQuestions = () => {
  return (
    <div className="sectioncontainer">
      <div className="sectioncontainer--header">Spørsmål og svar</div>
      <p className="sectioncontainer--text" id="sectionquestions--text">
        Her kan du lete etter svar blant{' '}
        <a href="/questions" className="sectioncontainer--text--colored">
          allerede stilte spørsmål
        </a>
        , eller
        <a href="questions/new" className="sectioncontainer--text--colored">
          {' '}
          stille et nytt spørsmål
        </a>{' '}
        hvis du ikke finner det du lurer på!
      </p>
      <form className="sectioncontainer--form">
        <div className="sectioncontainer--form--header">Søk etter spørsmål</div>
        <form className="sectioncontainer--form--input"></form>
      </form>
    </div>
  );
};

export default SectionQuestions;
