// Sections for this page
import React, { Component } from 'react';
import SectionQuestions from './Sections/SectionQuestions';
import SectionHero from './Sections/SectionHero';

class LandingPage extends Component {
  render(){
    return(
      <div >
        <SectionHero />
        <SectionQuestions />
      </div>
    );
  }
}
  

export default LandingPage;
