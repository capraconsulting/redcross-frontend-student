import React from 'react';
import '../../../styles/QuestionPage.less';

interface IProps {
  answer?: string;
}

export default function SectionAnswer(props: IProps) {
  const { answer } = props;
  return (
    <div className="answer">
      <p className="showAnswer--info">
        {'Svaret er skrevet av en frivillig hos Digital Leksehjelp.'}
      </p>
      {answer}
    </div>
  );
}
