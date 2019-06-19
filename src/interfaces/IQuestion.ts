export default interface IQuestion {
  id?: number;
  title?: string;
  userEmail?: string;
  question: string;
  answer?: string;
  grade: number;
  questionDate?: string;
  courseID: number;
  theme: number;
  anon?: boolean;
}
