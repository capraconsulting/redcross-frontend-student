import { IFile } from './';

export interface ITextMessage {
  author: string;
  roomID: string;
  uniqueID: string;
  message: string;
  datetime?: Date;
  files: IFile[];
}
