import React, { useState, useEffect } from 'react';
import Dropdown, { Option } from 'react-dropdown';
import { Link } from 'react-router-dom';
import qs from 'query-string';

//Interfaces
import { IQuestion, ISubject, IGrade } from '../../interfaces';

//Services
import {
  getQuestionList,
  getSubjectList,
  getGradeList,
} from '../../services/api-service';

//Sections
import { SectionHelper, SectionQAList, SectionPagination } from './Sections';
import gradeList from './grades';

interface IProps {
  location;
  history;
}

export const QA = (props: IProps) => {
  //Fetched questions
  const [questions, setQuestions] = useState([] as IQuestion[]);
  //Dropdown alternatives
  const [subjects, setSubjects] = useState([] as ISubject[]);
  const [grades, setGrades] = useState([] as IGrade[]);

  //Parsed query parameter string
  const values = qs.parse(props.location.search);

  //Returns option to be filled out based on query params
  const getDefaultOptions = type => {
    return { value: values[type] || type === 'page' ? '0' : '' };
  };

  //Query states
  const [search, setSearch] = useState(
    props.location.search.length > 0
      ? (values.searchText as string)
      : ('' as string),
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
      orderByDate: orderByDate.value.toLocaleLowerCase() == 'true',
      page: search === values.searchText ? parseInt(page.value) : 0,
    };
    let queryString = qs.stringify(removeFalsyFields(queryObject));
    props.history.push({ pathname: '/questions', search: queryString });
    // note that `search` automatically prepends a question mark
    console.log(queryString);
    getQuestionList(queryString).then(setQuestions);
  };

  useEffect(() => {
    getSubjectList().then(setSubjects);
    getGradeList().then(setGrades);
  }, []);

  useEffect(() => {
    handleSubmit();
  }, [page]);

  const getSubjectOptions = (): Option[] => {
    return subjects.map(subject => {
      return {
        value: subject.id.toString(),
        label: subject.subject,
      };
    });
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
    return gradeList.map(grade => {
      return {
        value: grade.gradeID,
        label: grade.label,
      };
    });
  };

  const renderSearchForm = () => {
    return (
      <div>
        <h1 className={'searchcontainer--header'}>Søk blant spørsmål</h1>
        <form className={'searchcontainer'} onSubmit={handleSubmit}>
          {' '}
          {/*input container start*/}
          <input
            className={'searchcontainer--input--searchkey'}
            value={search}
            onChange={event => setSearch(event.target.value)}
            type="text"
            placeholder="Hva lurer du på?"
          />
          <Dropdown
            className={'searchcontainer--input--gradeselector'}
            placeholder={'Velg fag'}
            options={getSubjectOptions()}
            value={(subject.value && subject.label && subject) || ''}
            onChange={event =>
              setSubject({ value: event.value, label: event.label })
            }
          />
          <Dropdown
            className={'searchcontainer--input--subjectselector'}
            placeholder={'Velg trinn'}
            options={getGradeOptions()}
            value={(grade.value && grade.label && grade) || ''}
            onChange={event =>
              setGrade({ value: event.value, label: event.label })
            }
          />
          <Dropdown
            className={'searchcontainer--input--subjectselector'}
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
        </form>
        <div className="helpText">
          <button
            onClick={() => handleSubmit()}
            className={'btn btn-submit'}
            type={'button'}
          >
            Send
          </button>
          <div>
            Eller{' '}
            <Link to="questions/new" className="helpText--colored">
              still et spørsmål
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const totalHits =
    questions && questions.length > 0 ? questions[0].totalRows : 0;
  const pageLimit = 10;
  const pageCount = Math.ceil(totalHits / pageLimit);

  return (
    <div className="content">
      {renderSearchForm()}
      {questions && SectionQAList(questions, totalHits)}
      {SectionPagination({ page, pageLimit, totalHits, pageCount, setPage })}
      <SectionHelper />
    </div>
  );
};

export default QA;
