import React, { Component } from 'react';
import '../../../styles/SectionHero.css';

const message = {
    header: "Gratis, trygt og anonymt for deg på ungdomsskolen og videregående.",
    tips: "Hvis det tar lang tid å få videohjelp anbefaler vi å prøve vanlig chat i stedet. Det går ofte raskere!"
}

class SectionQuestions extends Component {
    
  render() {
    return (
      <div className="hero">
        <div className="hero--description">
          <span style={{color: '#8b51c6'}}>Gratis, trygt </span> og <span style={{color: '#8b51c6'}}>anonymt</span> for deg på ungdomsskolen og videregående.
        </div>
        <div className="hero-tips">
          {message.tips}
        </div>

      </div>
    );
  }
}

export default SectionQuestions;