import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SectionQuestions extends Component {
  render() {
    return (
      <div >
        <Link to='/react' style={{textDecoration: 'none'}}>
        <h2>
          Spørsmål og svar
        </h2>
        <h5>
          Her kan du lete etter svar blant allerede stilte spørsmål, eller stille et nytt spørsmål hvis du ikke finner det du lurer på!
        </h5>
        </Link>

      </div>
    );
  }
}

export default SectionQuestions;