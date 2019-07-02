import { ISocketFile } from '.';

/*export default interface IMessage {
  author: string;
  roomID: string;
  uniqueID: string;
  message: string | ISocketFile;
  datetime: Date;
  enterWaitingRoom: boolean;
  createNewRoom: boolean;
}*/

export interface ITextMessage {
  author: string;
  roomID: string;
  uniqueID: string;
  message: string | ISocketFile;
  datetime: Date;
}

export interface IEnterQueueMessage {
  nickname: string;
  subject: string;
  grade: string;
  uniqueID: string;
  introText: string;
  course: string;
  datetime: Date;
}

export interface IGenerateRoomMessage {
  uniqueID: string;
  studentID: string;
}

export interface ISocketMessage {
  type: string;
  payload: ITextMessage | IGenerateRoomMessage | IEnterQueueMessage;
}
