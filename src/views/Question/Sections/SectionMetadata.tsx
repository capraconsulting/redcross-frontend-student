import React from 'react';

//Services
import { NorwegianDate } from '../../../services/date-service';

//Styles
import '../../../styles/QuestionPage.less';

interface IProps {
  subject;
  questionDate?: string;
}

export const SectionMetadata = (props: IProps) => {
  const { subject, questionDate } = props;
  return (
    <div className="metadata">
      {subject} {NorwegianDate(new Date(questionDate || ''))}
    </div>
  );
};

export default SectionMetadata;
