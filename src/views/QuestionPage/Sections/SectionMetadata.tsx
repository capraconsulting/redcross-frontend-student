import React from 'react';
import '../../../styles/QuestionPage.less';

interface IProps {
  course: any;
  date?: string;
}

export default function SectionMetadata(props: IProps) {
  const { course, date } = props;
  return <div className="metadata">{course + ', ' + date}</div>;
}
