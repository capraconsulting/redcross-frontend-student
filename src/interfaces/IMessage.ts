import { ISocketFile } from '.';

export default interface IMessage {
  author: string;
  message: string | ISocketFile;
  datetime: Date;
}
