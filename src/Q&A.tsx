import * as React from 'react';

import getHelloWorldMessage from './services/hello-world-service';
import { get } from './services/api-service';
import AllignItemList from './ui/components/ItemList';
import IQuestion from './interfaces/IQuestion';

// const QA = () => <h1>{getHelloWorldMessage('some-app', 'some-version')}</h1>;


export default class QA extends React.Component {
  state = {
    questions: [],
  };

  componentDidMount(): void {
    get('questions').then(res => {
      console.log(res.data);
      this.setState({
        questions: res.data,
      });
    }).then(() => console.log(this.state.questions));
  }


  render(): React.ReactNode {
    return (
      <div>
        {AllignItemList(this.state.questions)}
      </div>
    );
  }
}
