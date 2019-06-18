import React from 'react';
import '../../../styles/QuestionPage.less';

interface IProps {
  grade: number;
  question: string;
}

export default function SectionQuestion(props: IProps) {
  const { question, grade } = props;
  return (
    <div className="question">
      <p className="showAnswer--info">
        {' '}
        {'Spørmsålet er stilt av en elev i ' + grade + '.'}
      </p>
      {question}
    </div>
  );
}
