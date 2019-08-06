import React from 'react';

//Styles
import '../../../styles/QuestionPage.less';

interface IProps {
  answerText?: string;
}

export const SectionAnswer = (props: IProps) => {
  const { answerText } = props;
  return (
    <div className="answer">
      <p className="showAnswer--info" id="showAnswer--info">
        {'Svaret er skrevet av en frivillig hos Digital Leksehjelp.'}
      </p>
      {answerText}
    </div>
  );
};

export default SectionAnswer;
