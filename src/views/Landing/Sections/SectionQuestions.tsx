import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { withRouter, RouteComponentProps } from 'react-router';

//Styles
import '../../../styles/LandingPage.less';

const SectionQuestions = (props: RouteComponentProps) => {
  const { history } = props;
  const [searchText, setSearchText] = useState('' as string);
  const [submit, setSubmit] = useState(false as boolean);

  return (
    <div className="sectioncontainer">
      <div
        onClick={() => history.push('questions')}
        className="sectioncontainer--badge_new"
      >
        Alltid åpen!
      </div>
      <div className="sectioncontainer--header">Spørsmål og svar</div>
      <p className="sectioncontainer--text" id="sectionquestions--text">
        Her kan du lete etter svar blant{' '}
        <a
          onClick={() => history.push('questions')}
          className="sectioncontainer--text--colored"
        >
          allerede stilte spørsmål
        </a>
        , eller{' '}
        <a
          onClick={() => history.push('questions/new')}
          className="sectioncontainer--text--colored"
        >
          stille et nytt spørsmål
        </a>{' '}
        hvis du ikke finner det du lurer på!
      </p>
      <form className="sectioncontainer--form" onSubmit={() => setSubmit(true)}>
        <div className="sectioncontainer--form--header">Søk etter spørsmål</div>
        <input
          className={'sectioncontainer--form--search'}
          value={searchText}
          onChange={event => setSearchText(event.target.value)}
          type="text"
          name={''}
          placeholder="Hva lurer du på?"
        />
        <img
          className="sectioncontainer--form--img"
          src={require('../../../assets/images/search.svg')}
          onClick={() => setSubmit(true)}
        />
      </form>
      {submit && (
        <Redirect
          push
          to={{
            pathname: `questions/`,
            search: `searchText=${searchText}`,
          }}
        />
      )}
    </div>
  );
};

export default withRouter(SectionQuestions);
