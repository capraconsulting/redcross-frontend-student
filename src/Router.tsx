import React from 'react';

// Router library
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

// Pages and components
import Header from './ui/components/Header';
import Footer from './ui/components/Footer';
import LandingPage from './views/LandingPage/LandingPage';
import QA from './views/QA/QA';
import Question from './views/QuestionPage/QuestionPage';
import Leksehjelp from './views/Leksehjelp/LeksehjelpPage';
import Mestring from './views/Mestring/MestringPage';
import Frivillige from './views/Frivillige/FrivilligePage';
import NewQuestionPage from './views/NewQuestion/NewQuestionPage';
import Chat from './views/Chat/Chat';

export const AppRouter = () => {
  return (
    <Router>
      <Route path="/" component={Header} />
      <Switch>
        <Route path="/questions" exact component={QA} />
        <Route path="/questions/new" exact component={NewQuestionPage} />
        <Route
          path="/questions/:id"
          exact
          render={({ match }) => <Question questionId={match.params.id} />}
        />
        <Route path="/leksehjelp" exact component={Leksehjelp} />
        <Route path="/mestring" exact component={Mestring} />
        <Route path="/frivillige" exact component={Frivillige} />
        <Route path="/meldinger" exact component={Chat} />
        <Route path="/" exact component={LandingPage} />
        <Redirect to="/" />
      </Switch>
      <Route path="/" component={Footer} />
    </Router>
  );
};

export default AppRouter;
