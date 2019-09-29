import { IFile } from './';

export interface ITextMessage {
  author: string;
  roomID: string;
  uniqueID: string;
  message: string;
  imgUrl: string;
  datetime?: string;
  files: IFile[];
  activeSubjects?: string;
}
