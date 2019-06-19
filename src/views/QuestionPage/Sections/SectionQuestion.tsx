import React from 'react';
import '../../../styles/QuestionPage.less';

interface IProps {
  grade: number;
  question: string;
}

export const SectionQuestion = (props: IProps) => {
  const { question, grade } = props;
  return (
    <div className="question">
      <p className="showAnswer--info">
        {' '}
        {'Spørmsålet er stilt av en elev i ' + grade + '.'}
      </p>
      <p id="singleQuestion">{question}</p>
    </div>
  );
};

export default SectionQuestion;
