interface ITheme {
  name: string
}

export default interface ICourse {
  name: string,
  theme: ITheme[]
}
