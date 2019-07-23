import React, { useContext, useState } from 'react';
import { SocketContext } from '../../providers';
import { IPartialQueueMessage } from '../../interfaces/IMessage';
import { QueueMessageBuilder } from '../../services/message-service';
import { MESSAGE_TYPES } from '../../../config';
import '../../styles/LeksehjelpPage.less';

export const LeksehjelpPage = () => {
  const { socketSend, studentInfo, updateStudentInfo } = useContext(
    SocketContext,
  );
  const [partialStudentInfo, setPartialStudentInfo] = useState<
    IPartialQueueMessage
  >({
    subject: '' as string,
    grade: '' as string,
    introText: '' as string,
  });

  const update = () => {
    updateStudentInfo(partialStudentInfo);
    const msg = new QueueMessageBuilder(MESSAGE_TYPES.UPDATE_QUEUE)
      .withSubject(partialStudentInfo.subject)
      .withIntroText(partialStudentInfo.introText)
      .withGrade(partialStudentInfo.grade)
      .build();
    socketSend(msg.createMessage);
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
      </div>
    </div>
  );
};

export default LeksehjelpPage;
