import React from 'react';

//Services
import { NorwegianDate } from '../../../services/date-service';

//Styles
import '../../../styles/QuestionPage.less';

interface IProps {
  subject;
  answerDate?: string;
}

export const SectionMetadata = (props: IProps) => {
  const { subject, answerDate } = props;
  return (
    <div className="metadata">
      {subject} {NorwegianDate(new Date(answerDate || ''))}
    </div>
  );
};

export default SectionMetadata;
