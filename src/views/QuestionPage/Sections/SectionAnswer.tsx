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
      <p>Hei, takk for at du bruker Digital Leksehjelp!</p>
      {answerText}
      <p>Med vennlig hilsen</p>
      <p>Digital Leksehjelp</p>
    </div>
  );
};

export default SectionAnswer;
