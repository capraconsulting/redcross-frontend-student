import React, { useContext, useState } from 'react';
import { QueueContext, SocketContext } from '../../providers';
import { IPartialQueueMessage } from '../../interfaces/IMessage';
import { QueueMessageBuilder } from '../../services/message-service';
import { MESSAGE_TYPES } from '../../../config';

export const LeksehjelpPage = () => {
  const { studentInfo, updateStudentInfo } = useContext(QueueContext);
  const {socketSend} = useContext(SocketContext);
  const [partialStudentInfo, setPartialStudentInfo] = useState<
    IPartialQueueMessage
  >({} as IPartialQueueMessage);

  const update = () => {
    updateStudentInfo(partialStudentInfo);
    const msg = new QueueMessageBuilder(MESSAGE_TYPES.UPDATE_QUEUE)
      .withSubject(partialStudentInfo.subject)
      .withIntroText(partialStudentInfo.introText)
      .withGrade(partialStudentInfo.grade)
      .build();
    socketSend(msg.createMessage);
  };

  return <div className="content"></div>;
};

export default LeksehjelpPage;
