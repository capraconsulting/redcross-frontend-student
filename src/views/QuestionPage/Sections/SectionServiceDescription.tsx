import React from 'react';

//Styles
import '../../../styles/QuestionPage.less';

export const SectionServiceDescription = () => {
  return (
    <div className="serviceDescription">
      <div>
        På Digital Leksehjelp kan du{' '}
        <a href="/questions" className="serviceDescription--link">
          stille spørsmål
        </a>{' '}
        eller få{' '}
        <a href="/" className="serviceDescription--link">
          direkte hjelp
        </a>{' '}
        fra en frivillig med leksene.
      </div>
      <img
        className="serviceDescription--svg"
        src={require('../../../assets/images/figure_4.svg')}
      />
    </div>
  );
};

export default SectionServiceDescription;
