import { ISocketFile } from '../interfaces';
import {
  IGenerateRoomMessage,
  IEnterQueueMessage,
  ISocketMessage,
  ITextMessage, IEnterMestringQueueMessage,
} from '../interfaces/IMessage';

const createMessage = (
  payload: ITextMessage | IEnterQueueMessage | IGenerateRoomMessage | IEnterMestringQueueMessage,
  msgType: string,
): ISocketMessage => {
  return {
    msgType,
    payload,
  };
};

export const createEnterQueueMessage = (
  uniqueID: string,
  nickname: string,
  grade: string,
  introText: string,
  subject: string,
  course: string,
): ISocketMessage => {
  const msg: IEnterQueueMessage = {
    uniqueID,
    nickname,
    grade,
    introText,
    course,
    subject
  };
  return createMessage(msg, 'ENTER_QUEUE');
};

export const createEnterMestringQueueMessage = (
  uniqueID: string,
  course: string,
  nickname: string,
  introText: string,
  subject: string,
  grade: string
): ISocketMessage => {
  const msg: IEnterMestringQueueMessage = {
    uniqueID,
    course,
    nickname,
    introText,
    subject,
    grade
  };
  return createMessage(msg, 'ENTER_QUEUE');
}
export const createTextMessage = (
  message: string | ISocketFile,
  uniqueID: string,
  roomID: string,
): ISocketMessage => {
  const msg: ITextMessage = {
    author: 'student',
    uniqueID,
    roomID,
    message,
  };
  return createMessage(msg, 'TEXT');
};
