import { IFile } from './';

export interface ITextMessage {
  author: string;
  roomID: string;
  uniqueID: string;
  message: string;
  datetime?: string;
  files: IFile[];
}
