import { ISocketFile } from '../interfaces';
import {
  IGenerateRoomMessage,
  IEnterQueueMessage,
  ISocketMessage,
  ITextMessage,
} from '../interfaces/IMessage';

const createMessage = (
  payload: ITextMessage | IEnterQueueMessage | IGenerateRoomMessage,
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
