import React, { useState } from 'react';
import '../../../styles/LandingPage.less';

const SectionQuestions = () => {
  const [searchKey, setSearchKey] = useState('' as string);

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
        <input
          className={'sectioncontainer--form--search'}
          value={searchKey}
          onChange={event => setSearchKey(event.target.value)}
          type=""
          name={'searchKey'}
          placeholder="Hva lurer du på?"
        />
        <img
          className="sectioncontainer--form--img"
          src={require('../../../assets/images/search.svg')}
        />
      </form>
    </div>
  );
};

export default SectionQuestions;
