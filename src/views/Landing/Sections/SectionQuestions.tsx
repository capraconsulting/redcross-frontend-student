import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { withRouter, RouteComponentProps } from 'react-router';
import Zoom from 'react-reveal/Zoom';
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
        <Zoom>Alltid åpen!</Zoom>
      </div>
      <div className="sectioncontainer--header">Spørsmål og svar</div>
      <p className="sectioncontainer--text" id="sectionquestions--text">
        Her kan du lete etter svar blant{' '}
        <Link
          to="/questions?page=1"
          className="sectioncontainer--text--colored"
        >
          allerede stilte spørsmål
        </Link>
        , eller{' '}
        <Link to="/questions/new" className="sectioncontainer--text--colored">
          stille et nytt spørsmål
        </Link>{' '}
        hvis du ikke finner det du lurer på!
      </p>
      <form className="sectioncontainer--form" onSubmit={() => setSubmit(true)}>
        <div className="sectioncontainer--form--header">Søk etter spørsmål</div>
      </form>

      <span className="search--input">
        <input
          className="search--input--searchkey"
          value={searchText}
          onChange={event => setSearchText(event.target.value)}
          type="text"
          placeholder="Hva lurer du på?"
        />
        <button
          onClick={() => setSubmit(true)}
          className="btn btn-submit btn-search"
          type="button"
        >
          Søk
        </button>
      </span>
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
