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
import LandingPage from './views/Landing/LandingPage';
import QAPage from './views/QA/QAPage';
import QuestionPage from './views/Question/QuestionPage';
import NewQuestionPage from './views/NewQuestion/NewQuestionPage';
import LeksehjelpPage from './views/Leksehjelp/LeksehjelpPage';
import MestringPage from './views/Mestring/MestringPage';
import FrivilligePage from './views/Frivillige/FrivilligePage';
import Chat from './views/Chat/Chat';

interface IProps {
  history?: {
    location;
  };
}

export const AppRouter = (props: IProps) => {
  return (
    <Router>
      <Route path="/" component={Header} />
      <Switch>
        <Route path="/questions" exact component={QAPage} />
        <Route path="/questions/new" exact component={NewQuestionPage} />
        <Route
          path="/questions/:id"
          exact
          render={({ match }) => <QuestionPage questionId={match.params.id} />}
        />
        <Route path="/leksehjelp" exact component={LeksehjelpPage} />
        <Route path="/mestring" exact component={MestringPage} />
        <Route path="/frivillige" exact component={FrivilligePage} />
        <Route path="/meldinger" exact component={Chat} />
        <Route path="/" exact component={LandingPage} />
        <Redirect to="/" />
      </Switch>
      <Route
        path="/"
        render={props => {
          return props.history.location.pathname !== '/meldinger' && <Footer />;
        }}
      />
    </Router>
  );
};

export default AppRouter;
