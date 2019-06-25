interface ITheme {
  id: number;
  theme: string;
}

export default interface ICourse {
  id: number;
  name: string;
  themes: ITheme[];
  subject: string;
}
