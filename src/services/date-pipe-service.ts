export function NorwegianDate(date): any {
  const tmpDate = new Date(date);
  return tmpDate.getDay().toString() + '.'
    + tmpDate.getMonth().toString() + '.'
    + tmpDate.getFullYear().toString()
}
