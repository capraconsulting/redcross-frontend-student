import React, { Component } from 'react';
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
  id: string;
}

export default class Question extends Component<IProps, IState> {
  public constructor(props: IProps, state: IState) {
    super(props, state);
    this.state = state;
  }

  public componentDidMount() {
    getQuestion(`questions/${this.props.id}`).then(res => {
      res.data
        ? this.setState({
            question: res.data,
          })
        : this.setState({ error: res });
    });
  }

  public render() {
    let { question, error } = this.state;
    return (
      <div className="content">
        {question && (
          <div>
            <div className="showAnswer">
              <SectionMetadata date={question.date} course={question.course} />
              <SectionQuestion
                question={question.question}
                grade={question.grade}
              />
              <SectionAnswer answer={question.answer} />
            </div>
            <SectionFeedback questionId={parseInt(this.props.id)} />
            <SectionServiceDescription />
          </div>
        )}
        {error && <Redirect to="/questions" />}
      </div>
    );
  }
}
