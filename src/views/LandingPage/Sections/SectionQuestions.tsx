import React, { Component } from 'react';
import '../../../styles/SectionQuestions.less';

class SectionQuestions extends Component {
  public render() {
    return (
      <div className="sectioncontainer">
        <div className="sectioncontainer--header">Spørsmål og svar</div>
        <p className="sectioncontainer--text" id="container--text">
          Her kan du lete etter svar blant allerede stilte spørsmål, eller
          <a
            href="http://www.digitalleksehjelp.no/sporsmal"
            className="sectioncontainer--text--colored"
          >
            {' '}
            stille et nytt spørsmål
          </a>{' '}
          hvis du ikke finner det du lurer på!
        </p>
        <form className="sectioncontainer--form">
          <div className="sectioncontainer--form--header">
            Søk etter spørsmål
          </div>
          <form className="sectioncontainer--form--input"></form>
        </form>
      </div>
    );
  }
}

export default SectionQuestions;
