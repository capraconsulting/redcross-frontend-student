import React, { useState, useEffect } from 'react';
import Dropdown, { Option } from 'react-dropdown';

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
}

let defaultoption = {
  value: '',
  label: '',
};

export const QA = (props: IProps) => {
  //Gets search key from landingpage redirection
  const { searchKey } = props.location.state;

  //Form fields
  const [questions, setQuestions] = useState([] as IQuestion[]);
  const [courses, setCourses] = useState([] as ICourse[]);
  const [grades, setGrades] = useState([] as IGrade[]);

  //Form controller
  const [search, setSearch] = useState(searchKey as string);
  const [course, setCourse] = useState(defaultoption as IOption);
  const [grade, setGrade] = useState(defaultoption as IOption);
  const [filter, setFilter] = useState(defaultoption as IOption);

  useEffect(() => {
    getCourseList().then(setCourses);
    getGradeList().then(setGrades);
    getQuestionList(searchKey).then(setQuestions);
  }, []);

  const handleSubmit = () => {
    let query = {
      searchKey: search,
      courseID: Number(course.value),
      grade: grade.value,
      filter: Number(filter.value),
    };
    console.log(query);
    // TODO: get questions
  };

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
        value: 'date',
      },
      {
        label: 'Relevans',
        value: 'relevance',
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
            value={course.value && course}
            onChange={event =>
              setCourse({ value: event.value, label: event.label })
            }
          />
          <Dropdown
            className={'searchcontainer--input--subjectselector'}
            placeholder={'Velg trinn'}
            options={getGradeOptions()}
            value={grade.value && grade}
            onChange={event =>
              setGrade({ value: event.value, label: event.label })
            }
          />
          <Dropdown
            className={'searchcontainer--input--subjectselector'}
            placeholder={'Sorter etter'}
            options={getFilterOptions()}
            value={filter.value && filter}
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
