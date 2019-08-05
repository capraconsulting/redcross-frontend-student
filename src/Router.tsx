import React from 'react';

// Router library
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

// Pages
import {
  LandingPage,
  QAPage,
  QuestionPage,
  NewQuestionPage,
  LeksehjelpPage,
  MestringPage,
  FrivilligePage,
  NewQuestionSuccessPage,
  Chat,
  MestringChat,
} from './views';

//Components
import { Header, Footer } from './ui/components';

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
          path="/questions/new/success"
          exact
          component={NewQuestionSuccessPage}
        />
        <Route
          path="/questions/public/:id"
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
