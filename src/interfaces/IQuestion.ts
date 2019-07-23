import { IFile } from '.';

export default interface IQuestion {
  id?: number;
  title?: string;
  email?: string;
  questionText: string;
  answerText?: string;
  studentGrade: number;
  questionDate?: string;
  answerDate?: string;
  subjectID: number;
  themeID: number;
  isPublic?: boolean;
  subject?: string;
  totalRows: number;
  files: IFile[];
}
