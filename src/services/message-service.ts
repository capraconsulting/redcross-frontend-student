import { ISocketFile } from '../interfaces';
import {
  IGenerateRoomMessage,
  IEnterQueueMessage,
  ISocketMessage,
  ITextMessage,
} from '../interfaces/IMessage';

const createMessage = (
  payload: ITextMessage | IEnterQueueMessage | IGenerateRoomMessage,
  type: string,
): ISocketMessage => {
  return {
    type,
    payload,
  };
};

export const createEnterQueueMessage = (
  uniqueID: string,
  nickname: string,
  grade: string,
  introText: string,
  subject: string,
  course: string): ISocketMessage => {
  const msg: IEnterQueueMessage = {
    uniqueID,
    nickname,
    grade,
    introText,
    course,
    subject,
    datetime: new Date(0),
  };
  return createMessage(msg, 'enterQueueMessage');
};

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
    datetime: new Date(),
  };
  return createMessage(msg, 'textMessage');
};
