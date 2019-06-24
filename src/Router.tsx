import React from 'react';

// Router library
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

// Pages and components
import LandingPage from './views/LandingPage/LandingPage';
import QA from './views/QA/QA';
import Question from './views/QuestionPage/QuestionPage';
import Leksehjelp from './views/Leksehjelp/LeksehjelpPage';
import Mestring from './views/Mestring/MestringPage';
import QAForm from './ui/components/QAForm';
import Chat from './views/Chat/Chat';

export const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/questions" exact component={QA} />
        <Route path="/questions/new" exact component={QAForm} />
        <Route
          path="/questions/:id"
          render={({ match }) => <Question questionId={match.params.id} />}
        />
        <Route path="/leksehjelp" exact component={Leksehjelp} />
        <Route path="/mestring" exact component={Mestring} />
        <Route path="/meldinger" exact component={Chat} />
        <Route path="/" exact component={LandingPage} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default AppRouter;
