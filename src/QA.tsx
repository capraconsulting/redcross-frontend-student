import * as React from 'react';

import { get } from './services/api-service';
import QAList from './ui/components/QAList';
import IQuestion from './interfaces/IQuestion';

interface IState {
  questions: IQuestion[]
}

export default class QA extends React.Component<{},IState> {

  constructor(state: IState) {
    super(state);
    this.state = {
      questions: []
    };
  }

  componentDidMount(): void {
    get('questions').then(res => {
      this.setState({
        questions: res.data,
      });
    }).then(() => console.log(this.state.questions));
  }

  render(): React.ReactNode {
    return (
      <div>
        {this.state.questions ? QAList(this.state.questions) : ''}
      </div>
    );
  }
}
