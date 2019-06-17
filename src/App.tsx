import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

// Styles
import './styles/base.less';

// Pages
import LandingPage from './views/LandingPage/LandingPage';

// Global components
import Header from './ui/components/Header';
import Footer from './ui/components/Footer';
import QA from './views/QA/QA';
import QAForm from './ui/components/QAForm';


//Global application types
type AppProps = {
  time?: Date,
}

class App extends Component<{}, AppProps> {
  //Constructing state
  state = {
    time: new Date(),
  };

  tick() {
    //Setting the date
    this.setState({
      time: new Date(),
    });
  }

  componentDidMount() {
    //Setting the date every 10th second.
    setInterval(() => this.tick(), 10 * 1000);
  }

  render() {
    const { time } = this.state;
    return (
      <div>
        <Header isOpen={false}/>
        <Router>
          <Switch>
            <Route path='/questions' exact component={QA}/>
            <Route path='/questions/new' exact component={QAForm}/>
            <Route path='/' exact component={LandingPage}/>
            <Redirect to='/'/>
          </Switch>
        </Router>
        <Footer/>
      </div>
    );
  }
}

export default App;

