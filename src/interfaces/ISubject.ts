interface ITheme {
  id: number;
  theme: string;
}

export default interface ISubject {
  id: number;
  themes: ITheme[];
  subjectTitle: string;
}
