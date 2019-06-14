import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './styles/base.less';
// Pages
import LandingPage from './views/LandingPage/LandingPage';

// Global components
import Header from './ui/components/Header';
import Footer from './ui/components/Footer';
import QA from './QA';

type AppProps = {
  time: Date,
}

class App extends Component<{}, AppProps> {
  tick() {
    this.setState({
      time: new Date()
    })
  }

  componentWillMount() {
    this.tick();
  }

  componentDidMount() {
    setInterval (() => this.tick(), 10000);
  }

  render() {
    const { time } = this.state;
    return (
      <div>
        <div className="base">
          <Header isOpen={false} day={time.getDay()}/>
          <Router>
            <Switch>
              <Route path='/questions' component={QA} />
              <Route path='/' exact component={LandingPage} />
              <Redirect to='/' />
            </Switch>
          </Router>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;

