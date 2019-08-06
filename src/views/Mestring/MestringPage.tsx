import React, { useContext, useEffect, useState } from 'react';
import { DropZone, Picker } from '../../ui/components';
import { SocketContext } from '../../providers';
import { Option } from 'react-dropdown';
import { getSubjectList } from '../../services/api-service';
import { QueueMessageBuilder } from '../../services/message-service';
import { MESSAGE_TYPES } from '../../../config';
import {
  addThemeAction,
  removeThemeAction,
  setIntroTextAction,
} from '../../reducers';
import { RouteComponentProps, withRouter } from 'react-router';
import Textarea from 'react-textarea-autosize';
import '../../styles/LeksehjelpPage.less';

export const MestringPage = (props: RouteComponentProps) => {
  const {
    socketSend,
    studentInfo,
    dispatchStudentInfo,
    roomID,
    talkyID,
  } = useContext(SocketContext);
  const [themes, setThemes] = useState<Option[]>();
  const { history } = props;

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

  const update = () => {
    const msg = new QueueMessageBuilder(MESSAGE_TYPES.UPDATE_QUEUE)
      .withGrade(studentInfo.grade)
      .withChatType(studentInfo.chatType)
      .withNickname(studentInfo.nickname)
      .withSubject(studentInfo.subject)
      .withIntroText(studentInfo.introText)
      .withUniqueID(studentInfo.uniqueID)
      .build();
    socketSend(msg.createMessage);
  };

  const openTalky = () => {
    if (talkyID) {
      window.open(`https://talky.io/${talkyID}`);
    }
  };

  return (
    <div className="content">
      <div className="header">
        <p className="text">
          Du står nå i kø for{' '}
          <span className="course">{studentInfo.subject}</span>
        </p>
        <span className="queue">
          Du er nr. {studentInfo.positionInQueue} i køen.
        </span>
      </div>
      <div className="body">
        <div className="item">
          <p className="text">
            Mens du venter kan du begynne å forklare hva du lurer på.
          </p>
          <Textarea
            autoFocus
            cols={window.scrollX}
            minRows={15}
            value={studentInfo.introText}
            onChange={event =>
              dispatchStudentInfo(setIntroTextAction(event.target.value))
            }
          />
        </div>
      </div>

      <div className="button-container">
        <button className="btn btn-submit" onClick={update}>
          Oppdater Informasjon
        </button>
        <button
          disabled={roomID.length < 1}
          className="btn btn-submit"
          onClick={() => {
            openTalky();
            history.push('meldinger');
          }}
        >
          Gå til chat
        </button>
      </div>
    </div>
  );
};

export default withRouter(MestringPage);
