import React, { Component } from 'react';
import '../../../styles/SectionQuestions.less';

class SectionQuestions extends Component {
  public render() {
    return (
      <div className="container">
        <div className="container--header">Spørsmål og svar</div>
        <p className="container--text" id="container--text">
          Her kan du lete etter svar blant allerede stilte spørsmål, eller
          <a
            href="http://www.digitalleksehjelp.no/sporsmal"
            className="container--text--colored"
          >
            {' '}
            stille et nytt spørsmål
          </a>{' '}
          hvis du ikke finner det du lurer på!
        </p>
        <form className="container--form">
          <div className="container--form--header">Søk etter spørsmål</div>
          <form className="container--form--input"></form>
        </form>
      </div>
    );
  }
}

export default SectionQuestions;
