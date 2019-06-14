import React, { Component } from 'react';
import IQuestion from '../../interfaces/IQuestion';
import ICourse from '../../interfaces/ICourse';
import '../../styles/QAForm.css';
import { get } from '../../services/api-service';

interface IQAFormState {
  email: string,
  question: IQuestion,
  courses: ICourse[],
}

export default class QAForm extends Component<{}, IQAFormState> {
  constructor(state: IQAFormState) {
    super(state);
    this.state = {
      email: '' as string,
      question: {} as IQuestion,
      courses: {} as ICourse[],
    };
  }

  componentDidMount(): void {
    get('courses').then(res => {
      this.setState({
        courses: res.data,
      });
    })
      .then(() => console.log(this.state))
      .catch(e => console.error(e.getMessage));
  }

  render(): React.ReactNode {
    console.log(this.state.courses);
    return (
      <div className={'container'}>
        <form>
          <label className={'form-label'}>
            Tema:
            <select name={'courses'}>
              {
                Object.entries(this.state.courses).map(course => (
                  <option value={course.name}>{course.name.charAt(0).toUpperCase()}</option>
                ))
              }
            </select>
            <input type="text" name={'theme'}/>
          </label>
          <label className={'form-label'}>
            Klassetrinn:
            <input type="text" name={'grade'}/>
          </label>
          <label className={'form-label'}>
            E-post:
            <input type="text" name={'email'}/>
          </label>
          <input type="submit" value={'Send'}/>
        </form>
      </div>
    );
  }

}
