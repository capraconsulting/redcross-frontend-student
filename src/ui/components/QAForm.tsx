import React, { useState, useEffect } from 'react';
import IQuestion from '../../interfaces/IQuestion';
import ICourse from '../../interfaces/ICourse';
import IGrade from '../../interfaces/IGrade';
import '../../styles/QAForm.less';
import {
  postQuestion,
  getGradeList,
  getCourseList,
} from '../../services/api-service';
import Dropdown, { Option } from 'react-dropdown';

const defaultOptions = {
  value: '',
  label: '',
};

const QAForm = () => {
  const [courses, setCourses] = useState([] as ICourse[]);
  const [grades, setGrades] = useState([] as IGrade[]);

  const [userEmail, setUserEmail] = useState('' as string);
  const [question, setQuestion] = useState('' as string);

  const [course, setCourse] = useState(defaultOptions as Option);
  const [theme, setTheme] = useState(defaultOptions as Option);
  const [grade, setGrade] = useState(defaultOptions as Option);
  const [anon, setAnon] = useState(true as boolean);

  useEffect(() => {
    getCourseList().then(setCourses);
    getGradeList().then(setGrades);
  }, []);

  const handleSubmit = () => {
    const questionForm: IQuestion = {
      userEmail,
      grade: Number(grade.value),
      courseID: Number(course.value),
      theme: Number(theme.value),
      question,
      anon,
    };
    // TODO: post question
    postQuestion(questionForm).then(data => console.log(data));
  };

  const getCourseOptions = (): Option[] => {
    return courses.map(course => {
      return {
        value: course.id.toString(),
        label: course.subject,
      };
    });
  };

  const getThemeOptions = (): Option[] => {
    const chosenCourse = courses.filter(c => c.name === course.label)[0]; // Will always only be one entry in array
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

  return (
    <div className={'form-container'}>
      <form className={'form'} onSubmit={handleSubmit}>
        <div className="form--input-container">
          {' '}
          {/*input container start*/}
          <label className={'form--label'}>Tema:</label>
          <Dropdown
            placeholder={'Velg fag'}
            options={getCourseOptions()}
            value={course.value && course}
            onChange={event =>
              setCourse({ value: event.value, label: event.label })
            }
          />
          <Dropdown
            disabled={!course.value}
            placeholder={'Velg undertema'}
            options={getThemeOptions()}
            value={theme.value && theme}
            onChange={event =>
              setTheme({ value: event.value, label: event.label })
            }
          />
          <label className={'form--label'}>Klassetrinn:</label>
          <Dropdown
            placeholder={'Velg klassetrinn'}
            options={getGradeOptions()}
            value={grade.value && grade}
            onChange={event =>
              setGrade({ value: event.value, label: event.label })
            }
          />
          <textarea
            placeholder={
              'Beskriv med egne ord hva du lurer på, og forklar gjerne hva det er du har kommet fram til på egenhånd.'
            }
            className={'textarea'}
            value={question}
            onChange={event => setQuestion(event.target.value)}
          />
          <label className={'form--label'}>E-post:</label>
          <input
            className={'email'}
            value={userEmail}
            onChange={event => setUserEmail(event.target.value)}
            type="email"
            name={'email'}
          />
          <div className={'anon'}>
            <label>
              <input
                type="checkbox"
                checked={anon}
                onChange={() => setAnon(!anon)}
              />
              Dere kan poste spørsmålet og svaret mitt på digitalleksehjelp.no
            </label>
          </div>
        </div>
        {/*Input container end*/}
        <button
          onClick={() => handleSubmit()}
          className={'btn btn-submit'}
          type={'button'}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default QAForm;
