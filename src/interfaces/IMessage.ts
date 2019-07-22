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
  datetime?: Date;
}

export interface IEnterQueueMessage {
  nickname: string;
  subject: string;
  grade: string;
  uniqueID: string;
  introText: string;
  course: string;
}

export interface IEnterMestringQueueMessage {
  uniqueID: string;
  course: string;
  nickname: string;
  introText: string;
  subject: string;
  grade: string;
}

export interface IGenerateRoomMessage {
  uniqueID: string;
  studentID: string;
}

export interface ISocketMessage {
  msgType: string;
  payload: ITextMessage | IGenerateRoomMessage | IEnterQueueMessage | IEnterMestringQueueMessage;
}
