export default interface IQuestion {
  id?: number;
  title: string;
  question: string;
  answer?: string;
  grade: string;
  date?: string;
  course: string;
  theme?: string;
}
