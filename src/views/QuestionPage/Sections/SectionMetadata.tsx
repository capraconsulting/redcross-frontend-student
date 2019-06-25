import React from 'react';
import '../../../styles/QuestionPage.less';

interface IProps {
  course;
  date?: string;
}

export const SectionMetadata = (props: IProps) => {
  const { course, date } = props;
  return <div className="metadata">{course + ', ' + date}</div>;
};

export default SectionMetadata;
