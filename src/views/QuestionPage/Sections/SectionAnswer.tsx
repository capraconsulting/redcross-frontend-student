import React from 'react';

//Styles
import '../../../styles/QuestionPage.less';

interface IProps {
  answer?: string;
}

export const SectionAnswer = (props: IProps) => {
  const { answer } = props;
  return (
    <div className="answer">
      <p className="showAnswer--info" id="showAnswer--info">
        {'Svaret er skrevet av en frivillig hos Digital Leksehjelp.'}
      </p>
      {answer}
    </div>
  );
};

export default SectionAnswer;
