import React from 'react';
import '../../../styles/LandingPage.less';

const SectionLeksehjelp = () => {
  return (
    <div className="sectioncontainer">
      <div className="sectioncontainer--header">Leksehjelp</div>
      <p className="sectioncontainer--text" id="container--text">
        Få{' '}
        <a href="/leksehjelp" className="sectioncontainer--text--colored">
          gratis leksehjelp
        </a>{' '}
        over chat eller video av våre frivillige!{' '}
      </p>
      <form className="sectioncontainer--form">
        <div className="sectioncontainer--form--header">
          Se når ditt fag er tilgjengelig
        </div>
        <form className="sectioncontainer--form--input"></form>
      </form>
    </div>
  );
};

export default SectionLeksehjelp;
