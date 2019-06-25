import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

// Styles
import '../../styles/QuestionPage.less';

// Services
import { getQuestion } from '../../services/api-service';

// Interfaces
import IQuestion from '../../interfaces/IQuestion';

// Sections
import SectionQuestion from './Sections/SectionQuestion';
import SectionAnswer from './Sections/SectionAnswer';
import SectionMetadata from './Sections/SectionMetadata';
import SectionServiceDescription from './Sections/SectionServiceDescription';
import SectionFeedback from './Sections/SectionFeedback';

interface IState {
  question: IQuestion;
  error: boolean;
  fetching: boolean;
}

interface IProps {
  questionId: string;
}

const QuestionPage = (props: IProps, state: IState) => {
  const [question, setQuestion] = useState(state.question as IQuestion);
  const [error, setError] = useState(state.error);

  useEffect(() => {
    getQuestion(`questions/${props.questionId}`).then(res => {
      res.data ? setQuestion(res.data[0]) : setError(res);
    });
  }, []);

  return (
    <div className="content">
      {question && (
        <div>
          <div className="showAnswer">
            <h1 className="showAnswer--header">{question.title}</h1>
            <SectionMetadata
              questionDate={question.questionDate}
              subject={question.subject}
            />
            <SectionQuestion
              questionText={question.questionText}
              studentGrade={question.studentGrade}
            />
            <SectionAnswer answer={question.answer} />
          </div>
          <SectionFeedback questionId={parseInt(props.questionId)} />
          <SectionServiceDescription />
        </div>
      )}
      {error && <Redirect to="/questions" />}
    </div>
  );
};

export default QuestionPage;
