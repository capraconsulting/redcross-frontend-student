import React, { createContext, useContext, useEffect, useState } from 'react';
import { IOpeningHours } from '../interfaces/IOpeningHours';
import { getLeksehjelpInformation } from '../services/api-service';
import { IInformation } from '../interfaces/IInformation';

const defaultValue = {
  isOpen: false,
  announcement:
    'Hvis det tar lang tid å få videohjelp anbefaler vi å prøve vanlig chat i stedet. Det går ofte raskere!',
  openingMessage: '',
};

const weekdays = {
  sunday: 'Søndag',
  monday: 'Mandag',
  tuesday: 'Tirsdag',
  wednesday: 'Onsdag',
  thursday: 'Torsdag',
  friday: 'Friday',
  saturday: 'Lørdag',
};

const OpeningHoursContext = createContext<typeof defaultValue>(defaultValue);

export const useOpeningHours = () => useContext(OpeningHoursContext);

function getMessage(openingHours: IInformation) {
  if (openingHours.other.enabled) {
    return openingHours.other.message;
  }

  const todayDate = new Date();

  const today = Object.keys(weekdays).find((e, i) => i === todayDate.getDay());

  const todayHours = today && (openingHours[today] as IOpeningHours);

  if (openingHours.isOpen) {
    return `åpent frem til ${(todayHours as IOpeningHours).end}`;
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
}

const OpeningHoursProvider: React.FC = ({ children }) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    getLeksehjelpInformation().then(openingHours => {
      setValue({
        announcement: openingHours.announcement,
        isOpen: openingHours.isOpen,
        openingMessage: getMessage(openingHours),
      });
    });
  }, []);

  return (
    <OpeningHoursContext.Provider value={value}>
      {children}
    </OpeningHoursContext.Provider>
  );
};
export default OpeningHoursProvider;
