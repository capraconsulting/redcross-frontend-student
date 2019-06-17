import React, { Component } from 'react';
import IQuestion from '../../interfaces/IQuestion';
import ICourse from '../../interfaces/ICourse';
import '../../styles/QAForm.less';
import { get, post } from '../../services/api-service';
import Dropdown from 'react-dropdown';


interface IQAFormState {
  courses: ICourse[]
  grades: IGrade[]
  formControls: {
    email: {
      value: ''
    }
    course: {
      value: ''
      label: ''
    }
    theme: {
      value: ''
      label: ''
    }
    question: {
      value: ''
    }
    grade: {
      value: ''
      label: ''
    }
  }
}

interface IGrade {
  id: number
  name: string
}


export default class QAForm extends Component<{}, IQAFormState> {
  constructor(state: IQAFormState) {
    super(state);
    this.state = {
      courses: [] as ICourse[],
      grades: [] as IGrade[],
      formControls: {
        email: {
          value: '',
        },
        course: {
          value: '',
          label: '',
        },
        theme: {
          value: '',
          label: '',
        },
        question: {
          value: '',
        },
        grade: {
          value: '',
          label: '',
        },
      },
    };
  }

  componentDidMount(): void {
    get('courses').then(res => {
      this.setState({
        courses: res.data,
      });
    }).catch(e => console.error(e.getMessage));

    get('grades').then(res => {
      this.setState({
        grades: res.data,
      });
    }).catch(e => console.error(e.getMessage));
  }

  handleSubmit(): void {
    const { formControls } = this.state;
    const body = {
      email: formControls.email.value,
      grade: formControls.email.value,
      course: formControls.email.value,
      theme: formControls.email.value,
      question: formControls.email.value,
    };
    post('courses', body)
      .then(res => console.log(res.data))
      .catch(e => console.error(e.getMessage));
  }

  handleChange = (event, type) => {
    const formControls = this.state.formControls;
    let label, value;
    if (type === 'email' || type === 'question') {
      value = event.target.value;
      formControls[type] = { value };
    } else {
      label = event.label;
      value = event.value;
      formControls[type] = {
        label, value,
      };
    }
    this.setState({ formControls: formControls });
  };

  getCourseOptions(): any {
    return this.state.courses.map(course => {
      return {
        value: course.id,
        label: course.name,
      };
    });
  }

  getThemeOptions(): any {
    const chosenCourse = this.state.courses
      .filter(course => course.name === this.state.formControls.course.label)[0];  // Will always only be one entry in array
    if (chosenCourse) {
      return chosenCourse.themes.map(theme => {
        return {
          value: theme.id,
          label: theme.name,
        };
      });
    } else return [];
  }

  getGradeOptions(): any {
    return this.state.grades.map(grade => {
      return {
        value: grade.id,
        label: grade.name,
      };
    });
  }

  render(): React.ReactNode {
    return (
      <div className={'container'}>
        <form className={'form'}>
          <div className="form--input-container"> {/*input container start*/}
            <label className={'form--label'}>
              Tema:
            </label>
            <Dropdown
              placeholder={'Velg fag'}
              options={this.getCourseOptions()}
              value={this.state.formControls.course.value && this.state.formControls.course}
              onChange={event => this.handleChange(event, 'course')}
            />
            <Dropdown
              disabled={!this.state.formControls.course.value}
              placeholder={'Velg undertema'}
              options={this.getThemeOptions()}
              value={this.state.formControls.theme.value && this.state.formControls.theme}
              onChange={event => this.handleChange(event, 'theme')}
            />
            <label className={'form--label'}>
              Klassetrinn:
            </label>

            <Dropdown
              placeholder={'Velg klassetrinn'}
              options={this.getGradeOptions()}
              value={this.state.formControls.grade.value && this.state.formControls.grade}
              onChange={event => this.handleChange(event, 'grade')}
            />

            <label className="form--label">
            </label>
            <textarea
              placeholder={'Beskriv med egne ord hva du lurer på, og forklar gjerne hva det er du har kommet fram til på egenhånd.'}
              className={'textarea'}
              value={this.state.formControls.question.value}
              onChange={event => this.handleChange(event, 'question')}
            >
              </textarea>
            <label className={'form--label'}>
              E-post:
            </label>
            <input
              className={'email'}
              value={this.state.formControls.email.value}
              onChange={event => this.handleChange(event, 'email')}
              type="email"
              name={'email'}
            />
          </div>
          {/*Input container end*/}
          <input onSubmit={() => this.handleSubmit()} type="submit" value={'Send'}/>

        </form>
      </div>
    );
  }
}
