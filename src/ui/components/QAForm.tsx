import React, { Component } from 'react';
import IQuestion from '../../interfaces/IQuestion';
import ICourse from '../../interfaces/ICourse';
import '../../styles/QAForm.less';
import { get } from '../../services/api-service';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


interface IQAFormState {
  question: IQuestion
  courses: ICourse[]
  grades: IGrade[]
  formControls: {
    email: {
      value: ''
      label: ''
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
      label: ''
    }
    grade: {
      value: ''
      label: ''
    }
    title: {
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
      question: {} as IQuestion,
      courses: [] as ICourse[],
      grades: [] as IGrade[],
      formControls: {
        email: {
          value: '',
          label: '',
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
          label: '',
        },
        grade: {
          value: '',
          label: '',
        },
        title: {
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

  changeHandler = (event, type) => {
    const formControls = this.state.formControls;
    const label = event.label;
    const value = event.value;

    formControls[type] = {
      label, value,
    };

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
    const chosenCourse =  this.state.courses
      .filter(course => course.name === this.state.formControls.course.label)[0];  // Will always only be one entry in array
    if (chosenCourse) {
      return chosenCourse.themes.map(theme => {
        return {
          value: theme.id,
          label: theme.name
        }
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
    console.log(this.getThemeOptions());
    return (
      <div className={'container'}>
        <form className={'form'}>
          <div className="form--input-container"> {/*input container start*/}
            <label className={'form--label'}>
              Tema:
              <Dropdown
                placeholder={'Velg fag'}
                options={this.getCourseOptions()}
                value={this.state.formControls.course}
                onChange={event => this.changeHandler(event, 'course')}
              />
              <Dropdown
                placeholder={'Velg undertema'}
                options={this.getThemeOptions()}
                value={this.state.formControls.theme}
                onChange={event => this.changeHandler(event, 'theme')}
              />
            </label>
            <label className={'form-label'}>
              Klassetrinn:
              <Dropdown
                placeholder={'Velg klassetrinn'}
                options={this.getGradeOptions()}
                value={this.state.formControls.grade}
                onChange={event => this.changeHandler(event, 'grade')}
              />
            </label>

            <label className="form-label">
    <textarea
      value={this.state.question.question}
      onChange={() => console.log('hei')}
    >

    </textarea>
            </label>

            <label className={'form-label'}>
              E-post:
              <input type="email" name={'email'}/>
            </label>
          </div>
          {/*Input container end*/}
          <input type="submit" value={'Send'}/>
        </form>
      </div>
    );
  }
}
