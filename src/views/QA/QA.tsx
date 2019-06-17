import * as React from 'react';

import { get } from '../../services/api-service';
import QAList from '../../ui/components/QAList';
import IQuestion from '../../interfaces/IQuestion';

interface IState {
  questions: IQuestion[];
}

export default class QA extends React.Component<{}, IState> {
  public constructor(state: IState) {
    super(state);
    this.state = {
      questions: [] as IQuestion[],
    };
  }

  public componentDidMount(): void {
    get('questions')
      .then(res => {
        console.log(res);
        this.setState({
          questions: res.data,
        });
      })
      .then(() => console.log(this.state.questions));
  }

  public render(): React.ReactNode {
    return <div>{QAList(this.state.questions)}</div>;
  }
}
