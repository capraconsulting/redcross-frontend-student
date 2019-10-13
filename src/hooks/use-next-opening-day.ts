import { useMemo } from 'react';

const weekDays = [
  'Søndag',
  'Mandag',
  'Tirsdag',
  'Onsdag',
  'Torsdag',
  'Fredag',
  'Lørdag',
];

export const useNextOpeningDay = () => {
  return useMemo(() => {
    const nextOpeningDay = new Date();
    if (nextOpeningDay.getHours() >= 17) {
      nextOpeningDay.setDate(nextOpeningDay.getDate() + 1);
    }
    while ([5, 6, 0].includes(nextOpeningDay.getDay())) {
      nextOpeningDay.setDate(nextOpeningDay.getDate() + 1);
    }
    return weekDays[nextOpeningDay.getDay()].toLowerCase();
  }, []);
};
