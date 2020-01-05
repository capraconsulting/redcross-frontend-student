import { ReactNode, useContext, useEffect, useState } from 'react';
import { Option } from 'react-dropdown';
import { getSubjectList } from '../services/api-service';
import { SocketContext } from '../providers';
import { ISubject } from '../interfaces';

export const useSubjects = (
  isMestring: boolean,
  valueMapper: (s: ISubject) => string,
) => {
  const [subjects, setSubjects] = useState<Option[]>([]);
  const { activeSubjects } = useContext(SocketContext);

  const isActive = (label?: ReactNode) =>
    typeof label === 'string' && activeSubjects.includes(label);

  useEffect(() => {
    setSubjects(prevSubjects =>
      prevSubjects.sort((s1, s2) => {
        if (isActive(s1.label)) {
          return -1;
        } else if (isActive(s2.label)) {
          return 1;
        }

        return 0;
      }),
    );
  }, [activeSubjects, subjects.length]);

  useEffect(() => {
    getSubjectList(`?isMestring=${isMestring ? 1 : 0}`).then(rawSubjects =>
      setSubjects(
        rawSubjects.map(s => ({
          value: valueMapper(s),
          label: s.subjectTitle,
        })),
      ),
    );
  }, []);

  return subjects;
};
