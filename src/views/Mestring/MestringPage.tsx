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

  const update = () => {
    const msg = new QueueMessageBuilder(MESSAGE_TYPES.UPDATE_QUEUE)
      .withGrade(studentInfo.grade)
      .withChatType(studentInfo.chatType)
      .withNickname(studentInfo.nickname)
      .withSubject(studentInfo.subject)
      .withIntroText(studentInfo.introText)
      .withUniqueID(studentInfo.uniqueID)
      .withVolName(studentInfo.volName)
      .build();
    socketSend(msg.createMessage);
  };

  const openTalky = () => {
    if (talkyID) {
      window.open(`https://talky.io/${talkyID}`);
    }
  };

  const { positionInQueue } = studentInfo;

  if (!isChatRoomGenerated) {
    setBackgroundColor('#FFFFFF');

    return (
      <div className="waiting-container">
        <div className="content">
          <div className="header">
            <p className="text">
              Du står nå i kø for{' '}
              <span className="course">{studentInfo.subject}</span>
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
              Lagre
            </button>
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
            className="btn btn-submit"
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
    setBackgroundColor('#FFFFFF');

    return (
      <div>
        Du står ikke i kø akkurat nå, vennligst gå tilbake til forsiden og prøv
        nytt.
      </div>
    );
  }
};

export default withRouter(MestringPage);
