import React, { createContext, useContext, useEffect, useState } from 'react';
import { IOpeningHours } from '../interfaces/IOpeningHours';
import { getLeksehjelpInformation } from '../services/api-service';

const defaultOpeningHours = (enabled: boolean): IOpeningHours => ({
  start: '17:00',
  end: '21:00',
  enabled,
});

const defaultValue = {
  isOpen: false,
  announcement:
    'Hvis det tar lang tid å få videohjelp anbefaler vi å prøve vanlig chat i stedet. Det går ofte raskere!',
  monday: defaultOpeningHours(true),
  tuesday: defaultOpeningHours(true),
  wednesday: defaultOpeningHours(true),
  thursday: defaultOpeningHours(true),
  friday: defaultOpeningHours(false),
  saturday: defaultOpeningHours(false),
  sunday: defaultOpeningHours(false),
  other: {
    enabled: false,
    message: '',
  },
};
const OpeningHoursContext = createContext<typeof defaultValue>(defaultValue);

export const useOpeningHours = () => useContext(OpeningHoursContext);

const OpeningHoursProvider: React.FC = ({ children }) => {
  const [value, setValue] = useState(defaultValue);
  useEffect(() => {
    getLeksehjelpInformation().then(setValue);
  }, []);
  return (
    <OpeningHoursContext.Provider value={value}>
      {children}
    </OpeningHoursContext.Provider>
  );
};
export default OpeningHoursProvider;
