interface ITheme {
  id: number;
  theme: string;
}

export default interface ISubject {
  id: number;
  name: string;
  themes: ITheme[];
  subject: string;
}
