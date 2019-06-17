export default interface IQuestion {
  id?: number;
  title?: string;
  email?: string;
  question: string;
  answer?: string;
  grade: number;
  date?: string;
  course: number;
  theme: number;
}
