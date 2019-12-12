import React, { useState, useEffect, useCallback, MouseEvent } from 'react';
import Dropdown, { Option } from 'react-dropdown';
import { useDropzone } from 'react-dropzone';
import jws from 'jws';
import secureRandom from 'secure-random';
import ThemePickerComponent from '../../../ui/components/ThemePickerComponent';
import { withRouter, RouteComponentProps } from 'react-router';

//Material UI Core
import Typography from '@material-ui/core/Typography';

//Interfaces
import { IQuestion, ISubject, IFile, ITheme } from '../../../interfaces';

//Services
import { postQuestion, getSubjectList } from '../../../services/api-service';
import { uploadFileToAzureBlobStorage } from '../../../services/azure-service';

//Styles
import '../../../styles/QAForm.less';

//Components
import {
  SimpleModal,
  IconButton,
  Checkbox,
  InputSearch,
} from '../../../ui/components';

//Persistent grade list
import gradeList from '../../../grades';

const defaultOption: Option = {
  value: '',
  label: '',
};

interface IOption {
  value: string;
  label: string;
}

const SectionForm = (props: RouteComponentProps) => {
  const { history } = props;
  const [subjects, setSubjects] = useState<ISubject[]>([]);
  const [email, setEmail] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [subject, setSubject] = useState<ISubject>();
  const [themeList, setThemeList] = useState<ITheme[]>([]);
  const [studentGrade, setGrade] = useState(defaultOption);
  const [isPublic, setIsPublic] = useState(true);
  const [azureToken, setAzureToken] = useState('');
  const [tempFiles, setTempFiles] = useState<any[]>([]);
  const [selectedThemes, setSelectedThemes] = useState<ITheme[]>([]);

  const addTheme = (selected: ITheme): void => {
    if (!selectedThemes.find(e => e.id === selected.id)) {
      setSelectedThemes([...[selected], ...selectedThemes]);
    }
    const themes = themeList.filter(e => e.id !== selected.id);
    setThemeList(themes);
  };

  const removeTheme = (theme: ITheme): void => {
    const list = selectedThemes.filter(({ id }) => id !== theme.id);
    setSelectedThemes(list);
    setThemeList([theme, ...themeList]);
  };

  useEffect(() => {
    getSubjectList('?isMestring=0').then(setSubjects);
  }, []);

  useEffect(() => {
    const localAzureToken = window.sessionStorage.getItem('azuretoken');
    const generatedToken = {
      token: localAzureToken
        ? JSON.parse(localAzureToken).token
        : jws.sign({
            header: { alg: 'HS256' },
            payload: 'Questionfiles',
            secret: secureRandom(256, { type: 'Buffer' }),
          }),
    };
    window.sessionStorage.setItem('azuretoken', JSON.stringify(generatedToken));
    setAzureToken(generatedToken.token);
  }, []);

  const isValidEmail = (email: string) => {
    return /.+@.+/.test(email);
  };

  const uploadPromises = tempFiles => {
    return tempFiles.map(async file => {
      return uploadFileToAzureBlobStorage('questionfiles', azureToken, file);
    });
  };

  const handleSubmit = () => {
    if (!subject) {
      return;
    }
    return Promise.all<IFile>(uploadPromises(tempFiles)).then(results => {
      const questionForm: IQuestion = {
        email,
        studentGrade: studentGrade.value,
        subjectID: subject.id,
        subject: subject.subjectTitle,
        questionText,
        isPublic,
        totalRows: 0,
        files: results,
        themes: selectedThemes,
      };
      console.log(questionForm.files);
      postQuestion(questionForm).then(() => {
        history.push({ pathname: '/questions/new/success' });
      });
    });
  };

  function MyDropzone() {
    if (window.event) {
      window.event.preventDefault();
    }
    const onDrop = useCallback(acceptedFiles => {
      setTempFiles([...tempFiles, ...acceptedFiles]);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
    });

    return (
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <React.Fragment>
            <button className="upload">+</button>
            <span className="message-text">
              <span>Legg til filer </span>
              <span className="grey">(max 5 mb)</span>
            </span>
          </React.Fragment>
        )}
      </div>
    );
  }

  const FileList = () => {
    return (
      <ul className="filelist">
        {tempFiles.map((file, index) => {
          const { name } = file;
          return (
            <li className="element" key={index}>
              <span>
                <a
                  className="filelist-ankertag"
                  href={URL.createObjectURL(file)}
                  title={name}
                  download={name}
                >
                  {name}{' '}
                </a>
                <IconButton
                  onClick={() => {
                    setTempFiles(tempFiles.filter((_, i) => i !== index));
                  }}
                />{' '}
              </span>
            </li>
          );
        })}
      </ul>
    );
  };

  const getSubjectOptions = (): Option[] => {
    return subjects.map(subject => ({
      value: subject.id.toString(),
      label: subject.subjectTitle,
    }));
  };

  const getGradeOptions = (): Option[] => {
    return gradeList.map(grade => {
      return {
        value: grade.gradeID,
        label: grade.label,
      };
    });
  };

  const isInvalidForm = () => {
    return (
      questionText.length < 1 ||
      !subject ||
      studentGrade.value.length < 1 ||
      !isValidEmail(email)
    );
  };

  return (
    <div className={'form-container'}>
      <form className={'form'}>
        <div className="form--input-container">
          {' '}
          {/*input container start*/}
          <label className={'formLabel'}>
            Tema <span className="error-message">*</span>
          </label>
          <Dropdown
            placeholder={'Velg fag'}
            placeholderClassName={'dropdown-placeholder'}
            menuClassName={'dropdown-placeholder'}
            options={getSubjectOptions()}
            value={subject ? subject.subjectTitle : undefined}
            onChange={event => {
              setSubject(subjects.find(s => s.subjectTitle === event.label));
              setSelectedThemes([]);
            }}
          />
          {subject && (
            <ThemePickerComponent
              title="Velg undertema"
              placeholder="Legg til undertema"
              themes={subject.themes}
              addTheme={addTheme}
              selectedThemes={selectedThemes}
              removeTheme={removeTheme}
            />
          )}
          <label className={'formLabel'}>
            Klassetrinn <span className="error-message">*</span>
          </label>
          <Dropdown
            placeholder={'Velg klassetrinn'}
            placeholderClassName={'dropdown-placeholder'}
            menuClassName={'dropdown-placeholder'}
            options={getGradeOptions()}
            value={studentGrade.value && studentGrade}
            onChange={event =>
              setGrade({ value: event.value, label: event.label })
            }
          />
          <label className={'formLabel'}>
            Spørsmål <span className="error-message">*</span>
          </label>
          <textarea
            placeholder={
              'Beskriv med egne ord hva du lurer på, og forklar gjerne hva det er du har kommet fram til på egenhånd.'
            }
            className={'textarea'}
            value={questionText}
            onChange={event => setQuestionText(event.target.value)}
          />
          <MyDropzone />
          <FileList />
          <label className={'formLabel'}>
            E-post <span className="error-message">*</span>
          </label>
          <input
            placeholder={'Skriv e-postadressen din'}
            className={'email'}
            value={email}
            onChange={event => setEmail(event.target.value)}
            type="email"
            name={'email'}
            key={1}
          />
          <div className="error-message--text">
            {!isValidEmail(email) && email.length > 0 ? (
              <p>Eposten er ikke gyldig</p>
            ) : (
              <p> </p>
            )}
          </div>
          <div className={'anon'} onClick={() => setIsPublic(!isPublic)}>
            <Checkbox
              label={
                'Dere kan poste spørsmålet og svaret mitt på digitalleksehjelp.no'
              }
              value={isPublic}
            />
          </div>
        </div>

        {/*Input container end*/}
      </form>
      <SimpleModal
        content={
          <div className="searchcontainer">
            <Typography variant="h6" id="modal-title">
              Er dette din epostadresse?
            </Typography>
            <InputSearch
              defaultValue={email}
              placeholder="Skriv e-posten din"
              onClick={handleSubmit}
              onChange={setEmail}
              button={
                <button
                  className="btn btn-submit"
                  disabled={email.length < 1}
                  onClick={handleSubmit}
                >
                  Ja, send spørsmål
                </button>
              }
            />
          </div>
        }
        buttonText={'Send'}
        disabled={isInvalidForm()}
      />
    </div>
  );
};

export default withRouter(SectionForm);
