import React, { Component } from 'react';
import '../../../styles/SectionHero.less';

class SectionQuestions extends Component {
    
  render() {
    return (
      <div className="hero">
        <div className="hero--description">
          <span className="hero--description--colored">Gratis, trygt </span> og <span className="hero--description--colored">anonymt</span> for deg på ungdomsskolen og videregående.
        </div>
        <div className="hero--tips" id="hero--tips">
          Hvis det tar lang tid å få videohjelp anbefaler vi å prøve vanlig chat i stedet. Det går ofte raskere!
        </div>
      </div>
    );
  }
}

export default SectionQuestions;