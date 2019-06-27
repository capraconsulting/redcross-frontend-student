import React, { useState } from 'react';

//Styles
import '../../../styles/QuestionPage.less';

//Services
import { postFeedback } from '../../../services/api-service';

interface IProps {
  questionId: number;
}

export const SectionFeedback = (props: IProps) => {
  const [feedbackText, setFeedbackText] = useState('' as string);

  const handleSubmit = () => {
    const { questionId } = props;
    const feedback = {
      questionId,
      feedbackText,
    };
    console.log(feedback);
    //postFeedback(feedback);
  };

  return (
    <div className="feedback">
      <div className="feedback--form">
        <h1 className="feedback--form--header">Var det noe som var uklart?</h1>
        <textarea
          placeholder="Du kan stille oss ett oppfølgningspørmsål, eller be oss utdype om noe var uklart i svaret."
          rows={8}
          className="feedback--form--textarea"
          onChange={event => setFeedbackText(event.target.value)}
        ></textarea>
        <button className="feedback--form--button" onClick={handleSubmit}>
          Send
        </button>
      </div>
    </div>
  );
};

export default SectionFeedback;
