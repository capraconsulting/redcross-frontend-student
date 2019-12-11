import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { withRouter, RouteComponentProps } from 'react-router';
import Zoom from 'react-reveal/Zoom';
//Material UI
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
//Styles
import '../../../styles/LandingPage.less';
import { InputSearch } from '../../../ui/components';

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
      <InputSearch
        placeholder="Hva lurer du på?"
        onClick={setSubmit}
        onChange={setSearchText}
        button={
          <IconButton
            style={{ padding: 10 }}
            aria-label={'Search'}
            onClick={() => setSubmit(true)}
          >
            <SearchIcon />
          </IconButton>
        }
      />
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
