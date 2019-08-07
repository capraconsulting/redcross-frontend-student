import React, { useState, useEffect } from 'react';
import Dropdown, { Option } from 'react-dropdown';
import { withRouter, RouteComponentProps } from 'react-router';
import qs from 'query-string';

//Interfaces
import { IQuestion, ISubject } from '../../interfaces';

//Services
import { getQuestionList, getSubjectList } from '../../services/api-service';

//Sections
import { SectionHelper, SectionQAList, SectionPagination } from './Sections';
import gradeList from '../../grades';

interface IProps {
  location;
}

export const QA = (props: IProps & RouteComponentProps) => {
  const { history, location } = props;
  //Fetched questions
  const [questions, setQuestions] = useState([] as IQuestion[]);
  //Dropdown alternatives
  const [subjects, setSubjects] = useState([] as ISubject[]);

  //Parsed query parameter string
  const values = qs.parse(location.search);

  //Returns option to be filled out based on query params
  const getDefaultOptions = type => {
    return { value: values[type] || type === 'page' ? '1' : '' };
  };

  //Query states
  const [search, setSearch] = useState(
    location.search.length > 0 ? (values.searchText as string) : ('' as string),
  );
  const [subject, setSubject] = useState(getDefaultOptions(
    'subjectID',
  ) as Option);
  const [grade, setGrade] = useState(getDefaultOptions('grade') as Option);
  const [orderByDate, setOrderByDate] = useState(getDefaultOptions(
    'filter',
  ) as Option);
  const [page, setPage] = useState(getDefaultOptions('page') as Option);

  //Function removing empty fields from query object
  const removeFalsyFields = obj => {
    let newObj = {};
    Object.keys(obj).forEach(prop => {
      if (obj[prop]) {
        newObj[prop] = obj[prop];
      }
    });
    return newObj;
  };

  const handleSubmit = () => {
    let queryObject = {
      searchText: search,
      subjectID: Number(subject.value),
      grade: Number(grade.value),
      orderByDate: orderByDate.value.toLocaleLowerCase() === 'true',
      page: parseInt(page.value),
    };
    let queryString = qs.stringify(removeFalsyFields(queryObject));
    history.push({ pathname: '/questions', search: queryString });
    // note that `search` automatically prepends a question mark in browser window
    getQuestionList(queryString.length > 0 ? '?' + queryString : '').then(
      setQuestions,
    );
  };

  //Fetch subject alternatives
  useEffect(() => {
    getSubjectList('?isMestring=0').then(setSubjects);
  }, []);

  // Runs every time pagination event occures (every time page changes).
  useEffect(() => {
    handleSubmit();
  }, [page]);

  useEffect(() => {
    questions.length < 1 &&
      page.value !== '1' &&
      setPage({ value: '1', label: '' });
  }, [questions]);

  useEffect(() => {});

  const getSubjectOptions = (): Option[] => {
    const subjectOptions = [{ value: '0', label: 'Alle fag' }] as Option[];
    subjects &&
      subjects.map(subject => {
        subjectOptions.push({
          value: subject.id.toString(),
          label: subject.subjectTitle,
        });
      });
    return subjectOptions;
  };

  const getFilterOptions = (): Option[] => {
    return [
      {
        label: 'Dato',
        value: 'true',
      },
      {
        label: 'Relevans',
        value: 'false',
      },
    ];
  };

  const getGradeOptions = (): Option[] => {
    const gradeOptions = [{ value: '0', label: 'Alle trinn' }] as Option[];
    gradeList.map(grade => {
      gradeOptions.push({
        value: grade.gradeID,
        label: grade.label,
      });
    });
    return gradeOptions;
  };

  const renderSearchForm = () => {
    return (
      history && (
        <div>
          <h1 className={'searchcontainer--header'} id="QAsearchForm--header">
            Søk blant spørsmål
          </h1>
          <div
            className={'searchcontainer'}
            onKeyDown={event => event.keyCode === 13 && handleSubmit()}
          >
            {' '}
            {/*input container start*/}
            <span className={'searchcontainer--input'}>
              <input
                className={'searchcontainer--input--searchkey'}
                value={search}
                onChange={event => setSearch(event.target.value)}
                type="text"
                placeholder="Hva lurer du på?"
              />{' '}
              <button
                onClick={() => handleSubmit()}
                className={'btn btn-submit btn-search'}
                type={'button'}
              >
                Søk
              </button>
            </span>
            <Dropdown
              className={'searchcontainer--input--gradeselector'}
              placeholderClassName={'dropdown-placeholder'}
              menuClassName={'dropdown-placeholder'}
              placeholder={'Velg fag'}
              options={getSubjectOptions()}
              value={(subject.value && subject.label && subject) || ''}
              onChange={event =>
                setSubject({ value: event.value, label: event.label })
              }
            />
            <Dropdown
              className={'searchcontainer--input--subjectselector'}
              placeholderClassName={'dropdown-placeholder'}
              menuClassName={'dropdown-placeholder'}
              placeholder={'Velg trinn'}
              options={getGradeOptions()}
              value={(grade.value && grade.label && grade) || ''}
              onChange={event =>
                setGrade({ value: event.value, label: event.label })
              }
            />
            <Dropdown
              className={'searchcontainer--input--subjectselector'}
              placeholderClassName={'dropdown-placeholder'}
              menuClassName={'dropdown-placeholder'}
              placeholder={'Sorter etter'}
              options={getFilterOptions()}
              value={
                (orderByDate.value && orderByDate.label && orderByDate) || ''
              }
              onChange={event =>
                setOrderByDate({
                  value: orderByDate.value === 'true' ? 'false' : 'true',
                  label: event.label,
                })
              }
            />
          </div>
        </div>
      )
    );
  };

  const totalHits =
    questions && questions.length > 0 ? questions[0].totalRows : 0;
  const pageLimit = 10;
  const pageCount = Math.ceil(totalHits / pageLimit);

  console.log(search);
  return (
    <div className="content">
      {renderSearchForm()}
      {questions && (
        <SectionQAList
          questions={questions}
          totalHits={totalHits}
          history={history}
        />
      )}
      <SectionPagination
        page={page}
        pageLimit={pageLimit}
        totalHits={totalHits}
        pageCount={pageCount}
        setPage={setPage}
      />
      <SectionHelper />
    </div>
  );
};

export default withRouter(QA);
