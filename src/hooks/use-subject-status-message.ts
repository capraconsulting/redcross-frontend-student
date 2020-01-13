import { Option } from 'react-dropdown';
import { useOpeningHours } from '../providers/OpeningHoursProvider';
import { useContext } from 'react';
import { SocketContext } from '../providers';

export const useSubjectStatusMessage = (subject: Option) => {
  const { activeSubjects } = useContext(SocketContext);
  const { isOpen } = useOpeningHours();

  if (typeof subject.label === 'string' && subject.label.length > 0 && isOpen) {
    if (activeSubjects.includes(subject.label)) {
      return `${subject.label} er tilgjengelig.`;
    } else {
      return `Det er dessverre ingen som kan hjelpe deg med ${subject.label.toLowerCase()} nå.`;
    }
  }

  return null;
};
