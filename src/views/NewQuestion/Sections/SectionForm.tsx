import React, { useState, useEffect, useCallback } from 'react';
import Dropdown, { Option } from 'react-dropdown';
import { useDropzone } from 'react-dropzone';
import jws from 'jws';
import secureRandom from 'secure-random';
import { withRouter, RouteComponentProps } from 'react-router';

//Material UI Core
import Typography from '@material-ui/core/Typography';

//Interfaces
import { IQuestion, ISubject, IFile } from '../../../interfaces';

//Services
import { postQuestion, getSubjectList } from '../../../services/api-service';
import { uploadFileToAzureFileStorage } from '../../../services/azure-service';

//Styles
import '../../../styles/QAForm.less';

//Components
import { SimpleModal, IconButton } from '../../../ui/components';

//Persistent grade list
import gradeList from '../../../grades';

const defaultOptions = {
  value: '',
  label: '',
};

const SectionForm = (props: RouteComponentProps) => {
  const { history } = props;
  const [subjects, setSubjects] = useState([] as ISubject[]);
  const [email, setEmail] = useState('' as string);
  const [questionText, setQuestionText] = useState('' as string);
  const [subject, setSubject] = useState(defaultOptions as Option);
  const [theme, setTheme] = useState(defaultOptions as Option);
  const [studentGrade, setGrade] = useState(defaultOptions as Option);
  const [isPublic, setIsPublic] = useState(true as boolean);
  const [azureToken, setAzureToken] = useState('' as string);
  const [tempFiles, setTempFiles] = useState([] as any[]);

  useEffect(() => {
    getSubjectList().then(setSubjects);
  }, []);

  useEffect(() => {
    window.sessionStorage.clear();
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

  /** KEEP TO USE IN FRIVILLIG APP TO HANDLE FILE AND DIRECTORY DELETION
  const handleDirectoryDelete = () => {
    console.log('Kjører frem til if check');
    files.length > 0 &&
      azureToken.length > 0 &&
      files.map((file, index) => {
        console.log(file);
        fileService.deleteFileIfExists(
          'questionfiles',
          azureToken,
          file.fileName,
          function(error, response) {
            if (!error) {
            }
          },
        );
        if (index == files.length - 1) {
          setFiles([] as IFile[]);
          fileService.deleteDirectoryIfExists(
            'questionfiles',
            azureToken,
            function(error, result, response) {
              if (!error) {
                console.log(result);
                console.log(response);
              }
            },
          );
        }
      });
  };*/

  const uploadPromises = tempFiles => {
    return tempFiles.map(async file => {
      return uploadFileToAzureFileStorage(
        'questionfiles',
        azureToken,
        file,
        azureToken,
      );
    });
  };

  const handleSubmit = () => {
    return Promise.all<IFile>(uploadPromises(tempFiles)).then(results => {
      const questionForm: IQuestion = {
        email,
        studentGrade: Number(studentGrade.value),
        subjectID: Number(subject.value),
        themeID: Number(theme.value),
        questionText,
        isPublic,
        totalRows: 0,
        files: results,
      };
      postQuestion(questionForm).then(() => {
        history.push({ pathname: '/questions/new/success' });
      });
    });
  };

  function MyDropzone() {
    const onDrop = useCallback(acceptedFiles => {
      var file = acceptedFiles[0];
      setTempFiles([...tempFiles, file]);
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
            <li key={index}>
              <span>
                <a style={{ color: 'black', textDecoration: 'none' }} download>
                  {name}{' '}
                </a>
                <IconButton
                  onClick={() => {
                    setTempFiles(tempFiles.filter((_, i) => i !== index));
                  }}
                ></IconButton>
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

  const formControls = () => {
    return (
      email.length < 1 ||
      questionText.length < 1 ||
      subject.value.length < 1 ||
      studentGrade.value.length < 1 ||
      theme.value.length < 1
    );
  };

  interface IContent {
    email;
    method;
  }

  const ModalContent = (props: IContent) => {
    return (
      <div>
        <Typography variant="h6" id="modal-title">
          Er dette din epostadresse?
        </Typography>
        <input
          placeholder={'Skriv e-postadressen din'}
          className={'email'}
          value={props.email}
          onChange={event => props.method(event.target.value)}
          type="email"
          name={'email'}
          key={1}
        />
        <button
          className="btn btn-submit"
          disabled={email.length < 1}
          onClick={() => handleSubmit()}
        >
          Ja, send spørsmål
        </button>
      </div>
    );
  };
  return (
    <div className={'form-container'}>
      <form className={'form'}>
        <div className="form--input-container">
          {' '}
          {/*input container start*/}
          <label className={'form--label'}>Tema</label>
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
          <label className={'form--label'}>Klassetrinn</label>
          <Dropdown
            placeholder={'Velg klassetrinn'}
            options={getGradeOptions()}
            value={studentGrade.value && studentGrade}
            onChange={event =>
              setGrade({ value: event.value, label: event.label })
            }
          />
          <label className={'form--label'}>Spørsmål</label>
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
          <label className={'form--label'}>E-post</label>
          <input
            placeholder={'Skriv e-postadressen din'}
            className={'email'}
            value={email}
            onChange={event => setEmail(event.target.value)}
            type="email"
            name={'email'}
            key={1}
          />
          <div className={'anon'}>
            <label className="checkboxcontainer">
              Dere kan poste spørsmålet og svaret mitt på digitalleksehjelp.no
              <input
                type="checkbox"
                checked={isPublic}
                onChange={() => setIsPublic(!isPublic)}
                className=""
              />
              <span className="checkmark"></span>
            </label>
          </div>
        </div>

        {/*Input container end*/}
      </form>
      <SimpleModal
        content={<ModalContent method={setEmail} email={email} />}
        buttonText={'Send'}
        disabled={formControls()}
      ></SimpleModal>
    </div>
  );
};

export default withRouter(SectionForm);
