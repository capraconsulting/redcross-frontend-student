export function NorwegianDate(date): string {
  const tmpDate = new Date(date);
  return (
    tmpDate.getDate().toString() +
    '.' +
    (tmpDate.getMonth() + 1).toString() +
    '.' +
    tmpDate.getFullYear().toString()
  );
}

export const getTimeStringNow = (): string => {
  return new Date().getHours() + ':' + new Date().getMinutes();
};

export function NorwegianTime(date): string {
  const tmpDate = new Date(date);
  return tmpDate.getHours() + ':' + tmpDate.getMinutes();
}
