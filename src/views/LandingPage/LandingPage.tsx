// Sections for this page
import React, { Component } from 'react';
import SectionQuestions from './Sections/SectionQuestions';
import SectionHero from './Sections/SectionHero';
import '../../styles/LandingPage.less';

class LandingPage extends Component {
  render(){
    return(
      <div className="content">
        <SectionHero />
        <SectionQuestions />
      </div>
    );
  }
}
  

export default LandingPage;
