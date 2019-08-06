import React, { useContext, useState } from 'react';
import { SocketContext } from '../../providers';
import { IPartialQueueMessage, ITheme } from '../../interfaces/';
import { QueueMessageBuilder } from '../../services/message-service';
import { MESSAGE_TYPES } from '../../../config';
import '../../styles/LeksehjelpPage.less';
import { RouteComponentProps } from 'react-router';

export const LeksehjelpPage = (props: RouteComponentProps) => {
  const {
    socketSend,
    studentInfo,
    updateStudentInfo,
    roomID,
    talkyID,
  } = useContext(SocketContext);
  const [partialStudentInfo, setPartialStudentInfo] = useState<
    IPartialQueueMessage
  >({
    subject: '' as string,
    grade: '' as string,
    introText: '' as string,
  });
  const [themes, setThemes] = useState<ITheme[]>([])
  const { history } = props;

  const update = () => {
    updateStudentInfo(partialStudentInfo);
    const msg = new QueueMessageBuilder(MESSAGE_TYPES.UPDATE_QUEUE)
      .withSubject(partialStudentInfo.subject)
      .withIntroText(partialStudentInfo.introText)
      .withGrade(partialStudentInfo.grade)
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
          <span className="course">{studentInfo.course}</span>
        </p>
      </div>
      <div className="body">
        <p className="text">
          Mens du venter kan du begynne å forklare hva du lurer på.
        </p>
        {(window.innerWidth >= 770) &&
          <div className="iframe-container">
            <iframe
              src={`http://www.google.com/search?igu=1&ei=&q=${themes.map(e => e + " ")}`}
              className="frame"
              allowFullScreen
              width="600"
              height="450"
            />
          </div>
        }
      </div>

      <div className="button-container">
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

export default LeksehjelpPage;
