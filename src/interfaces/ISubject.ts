import { ITheme } from './';

export interface ISubject {
  id: number;
  themes: ITheme[];
  subjectTitle: string;
}
