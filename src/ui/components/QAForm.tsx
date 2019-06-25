import React, { useState, useEffect } from 'react';
import Dropdown, { Option } from 'react-dropdown';

// Interfaces
import IQuestion from '../../interfaces/IQuestion';
import ISubject from '../../interfaces/ISubject';
import IGrade from '../../interfaces/IGrade';

//Services
import {
  postQuestion,
  getGradeList,
  getSubjectList,
} from '../../services/api-service';

//Styles
import '../../styles/QAForm.less';

const defaultOptions = {
  value: '',
  label: '',
};

const QAForm = () => {
  const [subjects, setSubjects] = useState([] as ISubject[]);
  const [grades, setGrades] = useState([] as IGrade[]);

  const [userEmail, setUserEmail] = useState('' as string);
  const [questionText, setQuestion] = useState('' as string);

  const [subject, setSubject] = useState(defaultOptions as Option);
  const [theme, setTheme] = useState(defaultOptions as Option);
  const [studentGrade, setGrade] = useState(defaultOptions as Option);
  const [anon, setAnon] = useState(true as boolean);

  useEffect(() => {
    getSubjectList().then(setSubjects);
    getGradeList().then(setGrades);
  }, []);

  const handleSubmit = () => {
    const questionForm: IQuestion = {
      userEmail,
      studentGrade: Number(studentGrade.value),
      subjectId: Number(subject.value),
      theme: Number(theme.value),
      questionText,
      anon,
    };
    // TODO: post question
    postQuestion(questionForm).then(data => console.log(data));
  };

  const getSubjectOptions = (): Option[] => {
    return subjects.map(subject => {
      return {
        value: subject.id.toString(),
        label: subject.subject,
      };
    });
  };

  const getThemeOptions = (): Option[] => {
    const chosenSubject = subjects.filter(c => c.subject === subject.label)[0]; // Will always only be one entry in array
    if (chosenSubject) {
      return chosenSubject.themes.map(theme => {
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
            options={getSubjectOptions()}
            value={subject.value && subject}
            onChange={event =>
              setSubject({ value: event.value, label: event.label })
            }
          />
          <Dropdown
            disabled={!subject.value}
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
            value={studentGrade.value && studentGrade}
            onChange={event =>
              setGrade({ value: event.value, label: event.label })
            }
          />
          <textarea
            placeholder={
              'Beskriv med egne ord hva du lurer på, og forklar gjerne hva det er du har kommet fram til på egenhånd.'
            }
            className={'textarea'}
            value={questionText}
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
