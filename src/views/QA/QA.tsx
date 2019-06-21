import React from 'react';

import { getQuestionList } from '../../services/api-service';
import QAList from '../../ui/components/QAList';
import IQuestion from '../../interfaces/IQuestion';

const QA = () => {
  const [questions, setQuestions] = React.useState([] as IQuestion[]);

  React.useEffect(() => {
    getQuestionList().then(setQuestions);
  });

  return <div>{questions && QAList(questions)}</div>;
};

export default QA;
