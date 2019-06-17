import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

// Styles
import './styles/base.less';

// Pages
import LandingPage from './views/LandingPage/LandingPage';

// Global components
import Header from './ui/components/Header';
import Footer from './ui/components/Footer';
import QA from './views/QA/QA';
import QAForm from './ui/components/QAForm';

interface IState {
  time: Date;
  isOpen: boolean;
}

class App extends Component<{}, IState> {
  //Constructing state
  public readonly state: Readonly<IState> = {
    time: new Date(),
    isOpen: false,
  };

  private tick() {
    //Setting the date
    this.setState({
      time: new Date(),
    });
  }

  public componentDidMount() {
    //Setting the date every 10th second.
    setInterval(() => this.tick(), 10 * 1000);
  }

  public render() {
    return (
      <div>
        <div className="base">
          {Header(this.state)}
          {/*<Header isOpen={false} day={time.getDay()} />*/}
          <Router>
            <Switch>
              <Route path="/questions" component={QA} />
              <Route path="/questions/new" exact component={QAForm} />
              <Route path="/" exact component={LandingPage} />
              <Redirect to="/" />
            </Switch>
          </Router>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
