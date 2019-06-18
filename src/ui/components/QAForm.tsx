import React, { Component } from 'react';
import IQuestion from '../../interfaces/IQuestion';
import ICourse from '../../interfaces/ICourse';
import IGrade from '../../interfaces/IGrade';
import '../../styles/QAForm.less';
import {
  postQuestion,
  getGradeList,
  getCourseList,
} from '../../services/api-service';
import Dropdown, { Option } from 'react-dropdown';

interface IState {
  courses: ICourse[];
  grades: IGrade[];
  formControls: {
    userEmail: Option;
    course: Option;
    theme: Option;
    question: Option;
    grade: Option;
    anon: boolean;
  };
}

export default class QAForm extends Component<{}, IState> {
  public constructor(state: IState) {
    super(state);
    this.state = {
      courses: [] as ICourse[],
      grades: [] as IGrade[],
      formControls: {
        userEmail: {
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
        anon: true,
      },
    };
  }

  public componentDidMount(): void {
    getCourseList()
      .then(res => {
        this.setState({
          courses: res,
        });
      })
      .catch(e => console.error(e.getMessage));

    getGradeList()
      .then(res => {
        this.setState({
          grades: res,
        });
      })
      .catch(e => console.error(e.getMessage));
  }

  private handleSubmit(): void {
    const { formControls } = this.state;
    const question: IQuestion = {
      userEmail: formControls.userEmail.value,
      grade: Number(formControls.grade.value),
      course: Number(formControls.course.value),
      theme: Number(formControls.theme.value),
      question: formControls.question.value,
      anon: formControls.anon,
    };
    postQuestion(question)
      .then(res => console.log(res.data))
      .catch(e => console.error(e.getMessage));
  }

  private toggleAnon = () => {
    const { formControls } = this.state;
    formControls.anon = !formControls.anon;
    this.setState({ formControls });
  };

  private handleChange = (event, type) => {
    const { formControls } = this.state;
    let label, value;
    if (type === 'userEmail' || type === 'question') {
      value = event.target.value;
      formControls[type] = { value };
    } else {
      label = event.label;
      value = event.value;
      formControls[type] = {
        label,
        value,
      };
    }
    this.setState({ formControls });
  };

  private getCourseOptions(): Option[] {
    return this.state.courses.map(course => {
      return {
        value: course.id.toString(),
        label: course.name,
      };
    });
  }

  private getThemeOptions(): Option[] {
    const chosenCourse = this.state.courses.filter(
      course => course.name === this.state.formControls.course.label,
    )[0]; // Will always only be one entry in array
    if (chosenCourse) {
      return chosenCourse.themes.map(theme => {
        return {
          value: theme.id.toString(),
          label: theme.name,
        };
      });
    } else return [];
  }

  private getGradeOptions(): Option[] {
    return this.state.grades.map(grade => {
      return {
        value: grade.id.toString(),
        label: grade.name,
      };
    });
  }

  public render(): React.ReactNode {
    const { formControls } = this.state;
    return (
      <div className={'container'}>
        <form className={'form'} onSubmit={this.handleSubmit}>
          <div className="form--input-container">
            {' '}
            {/*input container start*/}
            <label className={'form--label'}>Tema:</label>
            <Dropdown
              placeholder={'Velg fag'}
              options={this.getCourseOptions()}
              value={formControls.course.value && formControls.course}
              onChange={event => this.handleChange(event, 'course')}
            />
            <Dropdown
              disabled={!formControls.course.value}
              placeholder={'Velg undertema'}
              options={this.getThemeOptions()}
              value={formControls.theme.value && formControls.theme}
              onChange={event => this.handleChange(event, 'theme')}
            />
            <label className={'form--label'}>Klassetrinn:</label>
            <Dropdown
              placeholder={'Velg klassetrinn'}
              options={this.getGradeOptions()}
              value={formControls.grade.value && formControls.grade}
              onChange={event => this.handleChange(event, 'grade')}
            />
            <textarea
              placeholder={
                'Beskriv med egne ord hva du lurer på, og forklar gjerne hva det er du har kommet fram til på egenhånd.'
              }
              className={'textarea'}
              value={formControls.question.value}
              onChange={event => this.handleChange(event, 'question')}
            />
            <label className={'form--label'}>E-post:</label>
            <input
              className={'email'}
              value={formControls.userEmail.value}
              onChange={event => this.handleChange(event, 'userEmail')}
              type="email"
              name={'email'}
            />
            <div className={'anon'}>
              <label>
                <input
                  type="checkbox"
                  checked={formControls.anon}
                  onChange={() => this.toggleAnon()}
                />
                Dere kan poste spørsmålet og svaret mitt på digitalleksehjelp.no
              </label>
            </div>
          </div>
          {/*Input container end*/}
          <button
            onClick={() => this.handleSubmit()}
            className={'btn btn-submit'}
            type={'button'}
          >
            Send
          </button>
        </form>
      </div>
    );
  }
}
