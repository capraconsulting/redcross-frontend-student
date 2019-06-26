import React, { useState, useEffect } from 'react';
import Dropdown, { Option } from 'react-dropdown';
import qs from 'query-string';

//Interfaces
import IQuestion from '../../interfaces/IQuestion';
import ISubject from '../../interfaces/ISubject';
import IGrade from '../../interfaces/IGrade';
import ReactPaginate from 'react-paginate';

//Services
import {
  getQuestionList,
  getSubjectList,
  getGradeList,
} from '../../services/api-service';

//Components
import { SectionHelper, SectionQAList } from './Sections';

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
      ? (values.searchKey as string)
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
      searchKey: search,
      subjectID: Number(subject.value),
      grade: Number(grade.value),
      orderByDate: orderByDate.value.toLocaleLowerCase() == 'true',
      page: page.value,
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
    handleSubmit();
  }, []);

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
    return grades.map(grade => {
      return {
        value: grade.id.toString(),
        label: grade.grade,
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
        <button
          onClick={() => handleSubmit()}
          className={'btn btn-submit'}
          type={'button'}
        >
          Send
        </button>
      </div>
    );
  };

  const renderPagination = () => {
    console.log(page);
    return (
      <ReactPaginate
        //Label for the previous button
        previousLabel={page.value === '0' ? '' : '<'}
        //Label for the next button
        nextLabel={'>'}
        //Label for elipsis
        breakLabel={'..'}
        //Classname on tag li of the ellipsis element
        breakClassName={'pagination-component--break'}
        //Required. Total number of pages
        pageCount={10}
        //Required. Number of pages to display of margins
        marginPagesDisplayed={2}
        //Required. The range of pages displayed
        pageRangeDisplayed={4}
        //Method to call when a page is clicked. Expose the current page object as an argument.
        onPageChange={event =>
          setPage({ value: event.selected.toString(), label: '' })
        }
        //Classname of the pagination container
        containerClassName={'pagination-component'}
        //Classname of the pagination sub container
        pageClassName={'pagination-component--page'}
        //Classname of the active page
        activeClassName={'pagination-component--active'}
      />
    );
  };

  return (
    <div>
      {renderSearchForm()}
      {questions && SectionQAList(questions)}
      {renderPagination()}
      <SectionHelper />
    </div>
  );
};

export default QA;
