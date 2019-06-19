interface ITheme {
  id: number;
  theme: string;
}

export default interface ICourse {
  id: number;
  course: string;
  themes: ITheme[];
}
