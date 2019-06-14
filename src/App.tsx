import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

// Pages
import LandingPage from './views/LandingPage/LandingPage';

// Global components
import Header from './ui/components/Header';
import Footer from './ui/components/Footer';
import QA from './views/QA/QA';
import QAForm from './ui/components/QAForm';


class App extends Component {
  render(){
    return(
      <div>
        <Header isOpen={false}/>
        <Router>
          <Switch>
            <Route path='/questions' exact component={QA} />
            <Route path='/questions/new' exact component={QAForm}/>
            <Route path='/' exact component={LandingPage} />
            <Redirect to='/' />
          </Switch>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;

