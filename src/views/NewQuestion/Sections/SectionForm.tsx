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
  const [subject, setSubject] = useState(defaultOption);
  const [themeList, setThemeList] = useState<IOption[]>([]);
  const [studentGrade, setGrade] = useState(defaultOption);
  const [isPublic, setIsPublic] = useState(true);
  const [azureToken, setAzureToken] = useState('');
  const [tempFiles, setTempFiles] = useState<any[]>([]);
  const [selectedList, setSelectedList] = useState<ITheme[]>([]);

  const addTheme = (theme: IOption): void => {
    const { value, label } = theme;
    const selected = { theme: label, id: Number(value) };
    if (!(selectedList.filter(e => e.id === Number(value)).length > 0)) {
      setSelectedList([...[selected], ...selectedList]);
    }
    const themes = themeList.filter(e => e.value !== theme.value);
    setThemeList(themes);
  };

  const removeTheme = (item: number, theme: string, e: MouseEvent): void => {
    const list = selectedList.filter(({ id }) => id !== Number(item));
    setSelectedList(list);
    const themeObj = { label: theme, value: item.toString() };
    setThemeList([...[themeObj], ...themeList]);
    e.preventDefault();
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
    return Promise.all<IFile>(uploadPromises(tempFiles)).then(results => {
      const questionForm: IQuestion = {
        email,
        studentGrade: studentGrade.value,
        subjectID: Number(subject.value),
        subject: subject.label ? subject.label.toString() : undefined,
        questionText,
        isPublic,
        totalRows: 0,
        files: results,
        themes: selectedList,
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
          <span className="message-text">
            <button className="upload">+</button>
            <span>Legg til filer </span>
            <span className="grey">(max 5 mb)</span>
          </span>
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
    let subjectOptions: Option[] = [];
    subjects &&
      subjects.map(subject => {
        subjectOptions.push({
          value: subject.id.toString(),
          label: subject.subjectTitle,
        });
      });
    return subjectOptions;
  };

  const getThemeOptions = (): Option[] => {
    const chosenSubject =
      subjects && subjects.filter(c => c.subjectTitle === subject.label)[0]; // Will always only be one entry in array
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
    return gradeList.map(grade => {
      return {
        value: grade.gradeID,
        label: grade.label,
      };
    });
  };

  const isInvalidForm = () => {
    return (
      email.length < 1 ||
      questionText.length < 1 ||
      subject.value.length < 1 ||
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
            value={subject.value && subject}
            onChange={event => {
              setSubject({ value: event.value, label: event.label });
              setSelectedList([]);
            }}
          />
          <ThemePickerComponent
            title="Velg undertema"
            placeholder="Legg til undertema"
            optionList={getThemeOptions()}
            addTheme={addTheme}
            selectedList={selectedList}
            removeTheme={removeTheme}
          />
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
