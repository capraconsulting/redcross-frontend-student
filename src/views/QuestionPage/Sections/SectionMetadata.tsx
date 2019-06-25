import React from 'react';
import '../../../styles/QuestionPage.less';

interface IProps {
  course;
  date: string;
}

export const SectionMetadata = (props: IProps) => {
  const { course, date } = props;
  const d = new Date(date);
  return (
    <div className="metadata">
      {course +
        ', ' +
        d.getDate() +
        '.' +
        (d.getMonth() + 1) +
        '.' +
        d.getFullYear()}
    </div>
  );
};

export default SectionMetadata;
