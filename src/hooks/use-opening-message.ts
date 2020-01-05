import { useOpeningHours } from '../providers/LeksehjelpInformationProvider';
import { IOpeningHours } from '../interfaces/IOpeningHours';

const weekdays = {
  sunday: 'Søndag',
  monday: 'Mandag',
  tuesday: 'Tirsdag',
  wednesday: 'Onsdag',
  thursday: 'Torsdag',
  friday: 'Friday',
  saturday: 'Lørdag',
};

export const useOpeningMessage = (withHours: boolean) => {
  const openingHours = useOpeningHours();

  if (openingHours.other.enabled) {
    return openingHours.other.message;
  }

  const todayDate = new Date();

  const today = Object.keys(weekdays).find((e, i) => i === todayDate.getDay());

  const todayHours = today && (openingHours[today] as IOpeningHours);

  const isCurrentlyOpen =
    openingHours.isOpen &&
    !!todayHours &&
    todayHours.enabled &&
    parseInt(todayHours.start) <= todayDate.getHours() &&
    parseInt(todayHours.end) > todayDate.getHours();

  if (isCurrentlyOpen) {
    return withHours
      ? `åpent frem til ${(todayHours as IOpeningHours).end}`
      : 'åpen nå';
  }

  const nextOpeningDay = Object.entries(weekdays).find(
    ([key], i) => i % 7 >= todayDate.getDay() && openingHours[key].enabled,
  );

  if (!nextOpeningDay) {
    throw Error('No next opening day');
  }

  const day = nextOpeningDay[1].toLowerCase();
  const hours = (openingHours[nextOpeningDay[0]] as IOpeningHours).start;

  return `åpner ${day} kl. ${hours}`;
};
