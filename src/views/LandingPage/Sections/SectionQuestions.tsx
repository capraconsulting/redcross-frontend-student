import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/SectionQuestions.css';


class SectionQuestions extends Component {
  render() {
    return (
      <div className="container">
        <div className="content--header">
          Spørsmål og svar
        </div>
        <p className="content--text">
          Her kan du lete etter svar blant allerede stilte spørsmål, eller <a href="http://www.digitalleksehjelp.no/sporsmal" className="content--colored"> stille et nytt spørsmål</a> hvis du ikke finner det du lurer på!
        </p>
        <form className="content--form">
        <div className="content--form--header">Søk etter spørsmål</div>
        <form className="content--form--input">
        </form>
        </form>
      </div>
    );
  }
}

export default SectionQuestions;