import React, { useState, useEffect } from 'react';
import Dropdown, { Option } from 'react-dropdown';

//Interfaces
import IQuestion from '../../interfaces/IQuestion';
import ICourse from '../../interfaces/ICourse';
import IGrade from '../../interfaces/IGrade';

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

export const QA = (props: IProps) => {
  const { searchKey } = props.location.state;

  const [questions, setQuestions] = useState([] as IQuestion[]);
  const [courses, setCourses] = useState([] as ICourse[]);
  const [grades, setGrades] = useState([] as IGrade[]);

  const [formControls, setFormControls] = useState({
    searchKey: {
      value: '',
      label: ',',
    },
    course: {
      value: '',
      label: '',
    },
    grade: {
      value: '',
      label: '',
    },
    theme: {
      value: '',
      label: '',
    },
  });

  const handleSubmit = () => {
    const query = {
      searchKey: formControls.searchKey,
      courseID: Number(formControls.course.value),
      grade: formControls.grade.value,
      theme: Number(formControls.theme.value),
    };
    // TODO: get questions
  };

  const handleChange = (event, type) => {
    const tmpFormControls = formControls;
    let label, value;
    if (type === 'searchKey') {
      value = event.target.value;
      tmpFormControls[type] = { value };
    } else {
      label = event.label;
      value = event.value;
      tmpFormControls[type] = {
        label,
        value,
      };
    }
    setFormControls(tmpFormControls);
  };

  const getCourseOptions = (): Option[] => {
    return courses.map(course => {
      return {
        value: course.id.toString(),
        label: course.name,
      };
    });
  };

  const getThemeOptions = (): Option[] => {
    const chosenCourse = courses.filter(
      course => course.name === formControls.course.label,
    )[0]; // Will always only be one entry in array
    if (chosenCourse) {
      return chosenCourse.themes.map(theme => {
        return {
          value: theme.id.toString(),
          label: theme.theme,
        };
      });
    } else return [];
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
            value={formControls.searchKey.value}
            onChange={event => handleChange(event, 'searchKey')}
            type="text"
            placeholder="Hva lurer du på?"
          />
          <Dropdown
            className={'searchcontainer--input--subjectSelector'}
            placeholder={'Velg fag'}
            options={getCourseOptions()}
            value={formControls.course.value && formControls.course}
            onChange={event => handleChange(event, 'course')}
          />
          <Dropdown
            className={'searchcontainer--input--gradeselector'}
            placeholder={'Velg trinn'}
            options={getGradeOptions()}
            value={formControls.grade.value && formControls.grade}
            onChange={event => handleChange(event, 'grade')}
          />
          <Dropdown
            className={'searchcontainer--input--gradeselector'}
            placeholder={'Sorter etter'}
            options={getThemeOptions()}
            value={formControls.theme.value && formControls.theme}
            onChange={event => handleChange(event, 'theme')}
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

  useEffect(() => {
    getCourseList().then(setCourses);
    getGradeList().then(setGrades);
    getQuestionList(searchKey).then(setQuestions);
    console.log(searchKey);
  }, []);

  return (
    <div>
      {renderSearchForm()}
      {questions && QAList(questions)}
    </div>
  );
};

export default QA;
