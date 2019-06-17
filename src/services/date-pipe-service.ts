export function NorwegianDate(date): string {
  const tmpDate = new Date(date);
  return (
    tmpDate.getDay().toString() +
    '.' +
    tmpDate.getMonth().toString() +
    '.' +
    tmpDate.getFullYear().toString()
  );
}
