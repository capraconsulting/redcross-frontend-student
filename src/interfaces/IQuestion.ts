export default interface IQuestion {
  id?: number;
  title?: string;
  userEmail?: string;
  questionText: string;
  answer?: string;
  studentGrade: number;
  questionDate?: string;
  answerDate?: string;
  subjectId: number;
  theme: number;
  anon?: boolean;
  subject?: string;
  totalRows: number;
}
