interface ITheme {
  id: number;
  name: string;
}

export default interface ICourse {
  id: number;
  name: string;
  themes: ITheme[];
}
