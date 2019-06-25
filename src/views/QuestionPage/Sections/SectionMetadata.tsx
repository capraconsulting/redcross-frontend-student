import React from 'react';
import '../../../styles/QuestionPage.less';

interface IProps {
  subject;
  questionDate?: string;
}

export const SectionMetadata = (props: IProps) => {
  const { subject, questionDate } = props;
  const date = new Date(questionDate || '');
  return (
    <div className="metadata">
      {subject +
        ', ' +
        date.getDate() +
        '.' +
        (date.getMonth() + 1) +
        '.' +
        date.getFullYear()}
    </div>
  );
};

export default SectionMetadata;
