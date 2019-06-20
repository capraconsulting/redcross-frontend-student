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

const QAForm = () => {
  const [courses, setCourses] = useState([] as ICourse[]);
  const [grades, setGrades] = useState([] as IGrade[]);
  const [formControls, setFormControls] = useState({
    userEmail: {
      value: '',
    },
    course: {
      value: '',
      label: '',
    },
    theme: {
      value: '',
      label: '',
    },
    question: {
      value: '',
    },
    grade: {
      value: '',
      label: '',
    },
    anon: true,
  });

  useEffect(() => {
    getCourseList().then(setCourses);
    getGradeList().then(setGrades);
  }, []);

  const handleSubmit = () => {
    const question: IQuestion = {
      userEmail: formControls.userEmail.value,
      grade: Number(formControls.grade.value),
      courseID: Number(formControls.course.value),
      theme: Number(formControls.theme.value),
      question: formControls.question.value,
      anon: formControls.anon,
    };
    // TODO: post question
    postQuestion(question).then(data => console.log(data));
  };

  const toggleAnon = () => {
    const tmpFormControls = formControls;
    tmpFormControls.anon = !tmpFormControls;
    setFormControls(tmpFormControls);
  };

  const handleChange = (event, type) => {
    const tmpFormControls = formControls;
    let label, value;
    if (type === 'userEmail' || type === 'question') {
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

  return (
    <div className={'container'}>
      <form className={'form'} onSubmit={handleSubmit}>
        <div className="form--input-container">
          {' '}
          {/*input container start*/}
          <label className={'form--label'}>Tema:</label>
          <Dropdown
            placeholder={'Velg fag'}
            options={getCourseOptions()}
            value={formControls.course.value && formControls.course}
            onChange={event => handleChange(event, 'course')}
          />
          <Dropdown
            disabled={!formControls.course.value}
            placeholder={'Velg undertema'}
            options={getThemeOptions()}
            value={formControls.theme.value && formControls.theme}
            onChange={event => handleChange(event, 'theme')}
          />
          <label className={'form--label'}>Klassetrinn:</label>
          <Dropdown
            placeholder={'Velg klassetrinn'}
            options={getGradeOptions()}
            value={formControls.grade.value && formControls.grade}
            onChange={event => handleChange(event, 'grade')}
          />
          <textarea
            placeholder={
              'Beskriv med egne ord hva du lurer på, og forklar gjerne hva det er du har kommet fram til på egenhånd.'
            }
            className={'textarea'}
            value={formControls.question.value}
            onChange={event => handleChange(event, 'question')}
          />
          <label className={'form--label'}>E-post:</label>
          <input
            className={'email'}
            value={formControls.userEmail.value}
            onChange={event => handleChange(event, 'userEmail')}
            type="email"
            name={'email'}
          />
          <div className={'anon'}>
            <label>
              <input
                type="checkbox"
                checked={formControls.anon}
                onChange={() => toggleAnon()}
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
