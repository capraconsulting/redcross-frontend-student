import React from 'react';
import '../../../styles/QuestionPage.less';

interface IProps {
  course: any;
  date?: string;
}

export default function SectionMetadata(props: IProps) {
  const { course, date } = props;
  return (
    <div>
      <div className="showAnswer">
        <SectionMetadata date={question.date} course={question.course} />
        <SectionQuestion question={question.question} grade={question.grade} />
        <SectionAnswer answer={question.answer} />
      </div>
      <SectionFeedback questionId={parseInt(props.questionId)} />
      <SectionServiceDescription />
    </div>
  );
}
