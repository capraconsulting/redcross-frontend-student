import React, { createContext, FunctionComponent, useContext, useState } from 'react';
import { IPartialQueueMessage, IQueueMessage } from '../interfaces/IMessage';

export const QueueContext = createContext({
  studentInfo: {} as IQueueMessage,
  updateStudentInfo(partial: IPartialQueueMessage) {},
});

export const QueueProvider: FunctionComponent = ({ children }: any) => {
  const [studentInfo, setStudentInfo] = useState<IQueueMessage>(
    {} as IQueueMessage,
  );

  const updateStudentInfo = (partial: IPartialQueueMessage) => {
    const newStudentInfo: IQueueMessage = studentInfo;
    newStudentInfo.subject = partial.subject;
    newStudentInfo.introText = partial.introText;
    newStudentInfo.grade = partial.grade;
    setStudentInfo(newStudentInfo);
  };

  return (
    <QueueContext.Provider value={{ studentInfo, updateStudentInfo }}>
      {children}
    </QueueContext.Provider>
  );
};
