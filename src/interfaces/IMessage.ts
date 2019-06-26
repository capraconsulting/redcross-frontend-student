import { ISocketFile } from '.';

export default interface IMessage {
  author: string;
  roomID: string;
  uniqueID: string;
  message: string | ISocketFile;
  datetime: Date;
  enterWaitingRoom: boolean;
  createNewRoom: boolean;
}
