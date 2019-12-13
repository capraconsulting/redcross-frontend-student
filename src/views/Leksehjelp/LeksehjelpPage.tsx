import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from 'react';
import { RouteComponentProps } from 'react-router';
import { Option } from 'react-dropdown';
import Textarea from 'react-textarea-autosize';

//Components and styles
import { Picker, ThemePickerComponent } from '../../ui/components';
import '../../styles/LeksehjelpPage.less';

//Services
import { getSubjectList } from '../../services/api-service';
import { QueueMessageBuilder } from '../../services/message-service';

//Providers and reducers
import { SocketContext } from '../../providers';
import {
  addThemeAction,
  removeThemeAction,
  setIntroTextAction,
} from '../../reducers';

//Config
import { MESSAGE_TYPES } from '../../../config';
import { ITheme } from '../../interfaces';

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
  const [themes, setThemes] = useState<ITheme[]>([]);
  const [selectedThemes, setSelectedThemes] = useState<ITheme[]>([]);
  //console.log('themes', themes);
  console.log('studeninfo', studentInfo);
  //console.log('selected', selectedThemes);

  useEffect(() => {
    getSubjectList('?isMestring=0').then(data => {
      const tmpSubject = data.find(
        subject => subject.subjectTitle === studentInfo.subject,
      );
      console.log(data, tmpSubject);
      if (tmpSubject) {
        const themes: ITheme[] = tmpSubject.themes;
        setThemes(themes);
        const selected: ITheme[] = [];
        studentInfo.themes
          .map(x => themes.find(theme => x === theme.theme))
          .forEach(x => {
            if (x) selected.push(x);
          });
        setSelectedThemes(selected);
      }
    });
  }, [studentInfo]);

  const update = () => {
    socketSend({
      payload: {
        themes: selectedThemes.map(theme => '' + theme.theme),
        ...studentInfo,
      },
      msgType: MESSAGE_TYPES.UPDATE_QUEUE,
    });
  };

  const openTalky = () => {
    if (talkyID) {
      window.open(`https://talky.io/${talkyID}`);
    }
  };

  const addSelectedTheme = (option: ITheme) => {
    setSelectedThemes([option, ...selectedThemes]);
    //dispatchStudentInfo(addThemeAction('' + option.id));
  };

  const removeSelectedTheme = (option: ITheme) => {
    setSelectedThemes(
      selectedThemes.filter(selected => selected.id !== option.id),
    );
    //dispatchStudentInfo(removeThemeAction('' + option.id));
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
  return (
    <div className="waiting-container">
      <div className="content">
        <div className="header">
          <p className="text">
            Du står nå i kø for <span className="course">{subject}</span>
          </p>
          <span className="queue">Du er nr. {positionInQueue} i køen.</span>
        </div>
        <div className="body">
          <div className="item">
            <p className="text">
              Mens du venter kan du begynne å forklare hva du lurer på.
            </p>
            <Textarea
              autoFocus
              cols={window.scrollX}
              minRows={6}
              value={introText}
              onChange={event =>
                dispatchStudentInfo(setIntroTextAction(event.target.value))
              }
            />
          </div>
          {themes && (
            <div className="item">
              <ThemePickerComponent
                title="Legg til underkategorier"
                themes={themes}
                placeholder="Velg en kategori"
                addTheme={addSelectedTheme}
                removeTheme={removeSelectedTheme}
                selectedThemes={selectedThemes}
              />
            </div>
          )}
        </div>

        <div className="button-container">
          <button className="btn btn-submit btn-queue" onClick={update}>
            Oppdater Informasjon
          </button>
          <button
            disabled={roomID.length < 1}
            className="btn btn-submit btn-queue"
            onClick={() => {
              openTalky();
              history.push('meldinger');
            }}
          >
            Gå til chat
          </button>
        </div>

        <div className="queue-link">
          <a href={searchString()} target="_blank" rel="noopener noreferrer">
            Prøv gjerne å søke på google ved å trykke på denne linken mens du
            venter!
          </a>
        </div>
        <div className="header">
          <span className="queue">Du er nr. {positionInQueue} i køen.</span>
        </div>
      </div>
    </div>
  );
};

export default LeksehjelpPage;
