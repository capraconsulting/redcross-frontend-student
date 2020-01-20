import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from 'react';
import { RouteComponentProps } from 'react-router';
import { Option } from 'react-dropdown';
import Textarea from 'react-textarea-autosize';
import { Picker } from '../../ui/components';
import '../../styles/LeksehjelpPage.less';
import { getSubjectList } from '../../services/api-service';
import { SocketContext } from '../../providers';
import {
  addThemeAction,
  removeThemeAction,
  setIntroTextAction,
} from '../../reducers';
import { MESSAGE_TYPES } from '../../../config';

const LeksehjelpPage: FunctionComponent<RouteComponentProps> = ({
  history,
}) => {
  const {
    socketSend,
    studentInfo,
    dispatchStudentInfo,
    roomID,
    talkyID,
  } = useContext(SocketContext);
  const [themes, setThemes] = useState<Option[]>([]);
  const [selectedList, setSelectedList] = useState<string[]>([]);
  const isChatRoomGenerated = roomID.length >= 1;

  const setBackgroundColor = backgroundColor => {
    document.body.style.backgroundColor = backgroundColor;
  };

  useEffect(() => {
    getSubjectList('?isMestring=0').then(data => {
      const tmpSubject = data.find(
        subject => subject.subjectTitle === studentInfo.subject,
      );
      if (tmpSubject) {
        const tmpThemes: Option[] = tmpSubject.themes.map(theme => {
          return {
            value: theme.theme,
            label: theme.theme,
          };
        });
        if (tmpThemes) {
          setThemes(tmpThemes);
        }
      }
    });
  }, [studentInfo.subject]);

  useEffect(() => {
    return () => {
      setBackgroundColor('#FFFFFF');
    };
  }, []);

  const getThemeOptions = (): Option[] => {
    return themes
      .filter(theme => !selectedList.find(x => x === theme.label))
      .map(theme => ({
        value: theme.value,
        label: theme.label,
      }));
  };

  const update = () => {
    socketSend({
      payload: studentInfo,
      msgType: MESSAGE_TYPES.UPDATE_QUEUE,
    });
  };

  const openTalky = () => {
    if (talkyID) {
      window.open(`https://talky.io/${talkyID}`);
    }
  };

  const addSelectedTheme = (option: Option) => {
    setSelectedList(oldValue => [...oldValue, option.value]);
    dispatchStudentInfo(addThemeAction(option.value));
  };

  const removeSelectedTheme = (option: string) => {
    setSelectedList(oldValue => oldValue.filter(el => el !== option));
    dispatchStudentInfo(removeThemeAction(option));
  };

  const searchString = () => {
    if (studentInfo.themes) {
      return `https://www.google.com/search?q=${
        studentInfo.subject
      },${studentInfo.themes.toString()}`;
    }
    return `https://www.google.com/search?q=${studentInfo.subject}`;
  };

  const { positionInQueue, subject, introText } = studentInfo;

  const renderNotInQueue = () => {
    setBackgroundColor('#FFFFFF');

    return (
      <div>
        Du står ikke lengre i kø, vennligst gå tilbake til forsiden og prøv på
        nytt.
      </div>
    );
  };

  if (!positionInQueue) {
    return renderNotInQueue();
  } else if (!isChatRoomGenerated) {
    setBackgroundColor('#FFFFFF');

    return (
      <div className="waiting-container">
        <div className="content">
          <div className="header">
            <p className="text">
              Du står nå i kø for <span className="course">{subject}</span>
            </p>
          </div>
          <div className="body">
            <div className="item">
              <Textarea
                autoFocus
                cols={window.scrollX}
                placeHolder="Skriv her..."
                minRows={6}
                value={introText}
                onChange={event =>
                  dispatchStudentInfo(setIntroTextAction(event.target.value))
                }
              />
            </div>
            {themes && (
              <div className="item">
                <Picker
                  optionList={getThemeOptions()}
                  placeholder="Legg til tema"
                  addSelected={addSelectedTheme}
                  removeSelected={removeSelectedTheme}
                  selectedList={selectedList}
                />
              </div>
            )}
            <p className="intro-text">
              Mens du venter kan du begynne å forklare hva du lurer på.
            </p>
          </div>

          <div className="button-container">
            <button className="btn btn-submit btn-queue" onClick={update}>
              Lagre
            </button>
          </div>

          <div className="queue-link">
            <a href={searchString()} target="_blank" rel="noopener noreferrer">
              Prøv gjerne å søke på google ved å trykke på denne linken mens du
              venter!
            </a>
          </div>
        </div>
      </div>
    );
  } else if (isChatRoomGenerated) {
    setBackgroundColor('#8C52C7');

    return (
      <div className="start-chat-container">
        <div className="content">
          <span className="start-chat-text">Du er nå fremme i køen</span>
          <button
            disabled={roomID.length < 1}
            className="btn btn-submit btn-queue"
            onClick={() => {
              openTalky();
              history.push('meldinger');
            }}
          >
            Gå til chatten
          </button>
        </div>
      </div>
    );
  } else {
    return renderNotInQueue();
  }
};

export default LeksehjelpPage;
