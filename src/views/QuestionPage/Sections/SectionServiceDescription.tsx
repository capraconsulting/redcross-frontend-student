import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

//Styles
import '../../../styles/QuestionPage.less';

export const SectionServiceDescription = (props: RouteComponentProps) => {
  const { history } = props;
  return (
    <div className="serviceDescription">
      <div>
        På Digital Leksehjelp kan du{' '}
        <a
          onClick={() => history.push('questions')}
          className="serviceDescription--link"
        >
          stille spørsmål
        </a>{' '}
        eller få{' '}
        <a
          onClick={() => history.push('')}
          className="serviceDescription--link"
        >
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

export default withRouter(SectionServiceDescription);
