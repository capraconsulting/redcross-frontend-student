import React, { Component } from 'react';
import '../../../styles/QuestionPage.less';

interface IState {
  feedback: string;
}

interface IProps {
  questionId: number;
}

export default class Question extends Component<IProps, IState> {
  public constructor(props: IProps, state: IState) {
    super(props, state);
    this.state = state;
  }

  private handleSubmit(event): void {
    const { questionId } = this.props;
    const { feedback } = this.state;
    const body = {
      questionId,
      feedback,
    };
    /** post('feedback', body)
      .then(res => console.log(res.data))
      .catch(e => console.error(e.getMessage));
      */
  }

  private handleChange = event => {
    let { value } = event.target;
    this.setState({
      feedback: value,
    });
  };

  public render() {
    let { feedback } = this.state;
    return (
      <div className="feedback">
        <div className="feedback--form">
          <h1 className="feedback--form--header">
            Var det noe som var uklart?
          </h1>
          <textarea
            placeholder="Du kan stille oss ett oppfølgningspørmsål, eller be oss utdype om noe var uklart i svaret."
            rows={8}
            className="feedback--form--textarea"
            onChange={this.handleChange}
          ></textarea>
          <button
            className="feedback--form--button"
            onClick={e => this.handleSubmit(e)}
          >
            Send
          </button>
        </div>
      </div>
    );
  }
}
