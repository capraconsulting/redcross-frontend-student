import React, { useState, useEffect, useCallback } from 'react';
import Dropdown, { Option } from 'react-dropdown';
import ReactFilestack from 'filestack-react';
import azure from 'azure-storage';
import stream from 'stream';
import { useDropzone } from 'react-dropzone';

//Material UI Core
import Typography from '@material-ui/core/Typography';

//Interfaces
import { IQuestion, ISubject, IFile } from '../../../interfaces';

//Services
import { postQuestion, getSubjectList } from '../../../services/api-service';

//Styles
import '../../../styles/QAForm.less';

//Components
import { SimpleModal, IconButton } from '../../../ui/components';

//Persistent grade list
import gradeList from '../../../grades';
import azureConfig from '../../../../azureconfig';

const defaultOptions = {
  value: '',
  label: '',
};

const fileService = azure.createFileService(
  azureConfig.accountName,
  azureConfig.accountKey,
);

const downloadLink = fileService.getUrl(
  'student',
  'questions',
  'Itinerary.pdf',
  azureConfig.SAS_TOKEN,
);

console.log(downloadLink + '&sr=f&sv=2018-03-28');

const SectionForm = () => {
  const [subjects, setSubjects] = useState([] as ISubject[]);
  const [email, setEmail] = useState('' as string);
  const [questionText, setQuestionText] = useState('' as string);
  const [subject, setSubject] = useState(defaultOptions as Option);
  const [theme, setTheme] = useState(defaultOptions as Option);
  const [studentGrade, setGrade] = useState(defaultOptions as Option);
  const [isPublic, setIsPublic] = useState(true as boolean);
  const [files, setFiles] = useState([] as IFile[]);
  const [azureToken, setAzureToken] = useState('' as string);
  useEffect(() => {
    getSubjectList().then(setSubjects);
  }, []);

  useEffect(() => {
    const currentTime = new Date(Date.now());
    const expiredTime = new Date(Date.now());
    const weekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
    expiredTime.setTime(expiredTime.getTime() + weekInMilliseconds);
    const localAzureToken = window.localStorage.getItem('azuretoken');
    const generatedToken = {
      token: localAzureToken
        ? JSON.parse(localAzureToken).token
        : fileService.generateSharedAccessSignature(
            'student',
            'questions',
            '',
            {
              AccessPolicy: {
                Start: currentTime,
                Expiry: expiredTime,
                Permissions: 'rw',
              },
            },
          ),
    };
    window.localStorage.setItem('azuretoken', JSON.stringify(generatedToken));
    setAzureToken(generatedToken.token);

    const downloadLinkUSER = fileService.getUrl(
      'student',
      'questions',
      'Itinerary.pdf',
      generatedToken.token,
    );
    console.log(downloadLinkUSER);
  }, []);

  const handleSubmit = () => {
    const questionForm: IQuestion = {
      email,
      studentGrade: Number(studentGrade.value),
      subjectID: Number(subject.value),
      themeID: Number(theme.value),
      questionText,
      isPublic,
      totalRows: 0,
      files: [] as string[],
    };
    postQuestion(questionForm).then(res => console.log(res));
  };

  function MyDropzone() {
    const onDrop = useCallback(acceptedFiles => {
      var file = acceptedFiles[0];
      const fr = new FileReader();
      fr.readAsArrayBuffer(file);
      const fileStream = new stream.Readable();
      fr.onload = () => {
        let myFileBuffer: ArrayBuffer = fr.result as ArrayBuffer;
        if (myFileBuffer) {
          fileStream.push(myFileBuffer[0]);
          fileStream.push(null);
          fileService.createFileFromStream(
            'student',
            'questions',
            file.name,
            fileStream,
            myFileBuffer.byteLength,
            function(error, result, response) {
              if (!error) {
                const fileLink = fileService.getUrl(
                  'student',
                  'questions',
                  result.name,
                  azureToken,
                );
                let file = { filename: result.name, url: fileLink };
                setFiles([...files, file]);
              }
            },
          );
        }
      };
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
        {files.map((file, index) => (
          <li key={index}>
            <span>
              <a href={file.url}>{file.filename} </a>
              <IconButton
                onClick={() => {
                  setFiles(files.filter((_, i) => i !== index)),
                    fileService.deleteFileIfExists(
                      'student',
                      'questions',
                      file.filename,
                      function(error, result, response) {
                        if (!error) {
                          //let ber = readFileSync(result, 'utf8');
                        }
                      },
                    );
                }}
              ></IconButton>
            </span>
          </li>
        ))}
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
  console.log(files);
  return (
    <div className={'form-container'}>
      <form className={'form'} onSubmit={handleSubmit}>
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
            <label>
              <input
                type="checkbox"
                checked={isPublic}
                onChange={() => setIsPublic(!isPublic)}
              />
              Dere kan poste spørsmålet og svaret mitt på digitalleksehjelp.no
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

export default SectionForm;
