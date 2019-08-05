export interface ITheme {
  id: number;
  theme: string;
}

export interface ISubject {
  id: number;
  themes: ITheme[];
  subjectTitle: string;
}
