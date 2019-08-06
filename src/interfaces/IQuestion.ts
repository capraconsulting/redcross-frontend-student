import { IFile, ITheme } from '.';

export interface IQuestion {
  id?: number;
  title?: string;
  email?: string;
  questionText: string;
  answerText?: string;
  studentGrade: string;
  questionDate?: string;
  answerDate?: string;
  subjectID: number;
  isPublic?: boolean;
  subject?: string;
  totalRows: number;
  files: IFile[];
  themes: ITheme[];
}
