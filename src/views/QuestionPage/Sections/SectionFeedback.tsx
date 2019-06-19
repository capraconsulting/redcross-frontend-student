import React, { useState } from 'react';
import '../../../styles/QuestionPage.less';

interface IState {
  feedback: string;
}

interface IProps {
  questionId: number;
}

export const SectionFeedback = (props: IProps) => {
  const [feedback, setFeedback] = useState('' as string);

  const handleSubmit = () => {
    const { questionId } = props;
    //Data to pass API
    const body = {
      questionId,
      feedback,
    };
    /** post('feedback', body)
      .then(res => console.log(res.data))
      .catch(e => console.error(e.getMessage));
      */
  };

  const handleChange = event => {
    let { value } = event.target;
    setFeedback(value);
  };

  return (
    <div className="feedback">
      <div className="feedback--form">
        <h1 className="feedback--form--header">Var det noe som var uklart?</h1>
        <textarea
          placeholder="Du kan stille oss ett oppfølgningspørmsål, eller be oss utdype om noe var uklart i svaret."
          rows={8}
          className="feedback--form--textarea"
          onChange={handleChange}
        ></textarea>
        <button className="feedback--form--button" onClick={handleSubmit}>
          Send
        </button>
      </div>
    </div>
  );
};

export default SectionFeedback;
