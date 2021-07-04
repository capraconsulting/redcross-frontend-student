import React, { useContext, useEffect } from 'react';
import { SocketContext } from '../../providers';
import { QueueMessageBuilder } from '../../services/message-service';
import { MESSAGE_TYPES } from '../../../config';
import { setIntroTextAction } from '../../reducers';
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
  const { history } = props;
  const isChatRoomGenerated = roomID.length >= 1;

  const setBackgroundColor = backgroundColor => {
    document.body.style.backgroundColor = backgroundColor;
  };

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
              Du står nå i kø for{' '}
              <span className="course">{studentInfo.subject}</span>
            </p>
          </div>
          <div className="body">
            <div className="item">
              <p className="intro-text">
                Mens du venter kan du begynne å forklare hva du lurer på.
              </p>
              <textarea
                placeholder="Skriv her..."
                className="textarea"
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

export default withRouter(MestringPage);
