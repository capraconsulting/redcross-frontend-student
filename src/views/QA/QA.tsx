import React, { useState, useEffect } from 'react';
import Dropdown, { Option } from 'react-dropdown';
import qs from 'query-string';

//Interfaces
import IQuestion from '../../interfaces/IQuestion';
import ICourse from '../../interfaces/ICourse';
import IGrade from '../../interfaces/IGrade';
import IOption from '../../interfaces/IOption';

//Services
import {
  getQuestionList,
  getCourseList,
  getGradeList,
} from '../../services/api-service';

//Components
import QAList from '../../ui/components/QAList';

interface IProps {
  location?: any;
  history?: any;
}

export const QA = (props: IProps) => {
  //Fetched questions
  const [questions, setQuestions] = useState([] as IQuestion[]);
  //Dropdown alternatives
  const [courses, setCourses] = useState([] as ICourse[]);
  const [grades, setGrades] = useState([] as IGrade[]);

  //Parsed query parameter string
  const values = qs.parse(props.location.search);

  //Returns option to be filled out based on query params
  const getDefaultOptions = type => {
    //return values[type] ? {value: values[type, label: courses[values[type]]]}
    return { value: values[type] || '' };
  };

  //Query states
  const [search, setSearch] = useState(
    props.location.search.length > 0
      ? (values.searchKey as string)
      : ('' as string),
  );
  const [course, setCourse] = useState(getDefaultOptions(
    'courseId',
  ) as IOption);
  const [grade, setGrade] = useState(getDefaultOptions('grade') as IOption);
  const [filter, setFilter] = useState(getDefaultOptions('filter') as IOption);

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
      courseId: Number(course.value),
      grade: grade.value,
      filter: Number(filter.value),
    };
    let queryString = qs.stringify(removeFalsyFields(queryObject));
    props.history.push({ pathname: '/questions', search: queryString });
    // note that `search` automatically prepends a question mark
    getQuestionList(queryString).then(setQuestions);
  };

  useEffect(() => {
    getCourseList().then(setCourses);
    getGradeList().then(setGrades);
    handleSubmit();
  }, []);

  const getCourseOptions = (): Option[] => {
    return courses.map(course => {
      return {
        value: course.id.toString(),
        label: course.name,
      };
    });
  };

  const getFilterOptions = (): Option[] => {
    return [
      {
        label: 'Dato',
        value: '1',
      },
      {
        label: 'Relevans',
        value: '2',
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
            options={getCourseOptions()}
            value={course.value && course.label && course}
            onChange={event =>
              setCourse({ value: event.value, label: event.label })
            }
          />
          <Dropdown
            className={'searchcontainer--input--subjectselector'}
            placeholder={'Velg trinn'}
            options={getGradeOptions()}
            value={grade.value && grade.label && grade}
            onChange={event =>
              setGrade({ value: event.value, label: event.label })
            }
          />
          <Dropdown
            className={'searchcontainer--input--subjectselector'}
            placeholder={'Sorter etter'}
            options={getFilterOptions()}
            value={filter.value && filter.label && filter}
            onChange={event =>
              setFilter({ value: event.value, label: event.label })
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

  return (
    <div>
      {renderSearchForm()}
      {questions && QAList(questions)}
    </div>
  );
};

export default QA;
