import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import SessionPage from "../pages/Session";
import { connect } from "react-redux";
import AuthPage from "../pages/Auth";

const RootRoutes = () => (
  <Route path="/">
    <Route path="/auth" component={AuthPage} />
  </Route>
);

const SessionRoute = () => (
  <Route path="/session" component={SessionPage} exact />
);

class Routes extends React.Component {
  render() {
    console.log(this.props);
    return (
      <Router>
        <Switch>
          <Route path="/" component={AuthPage} exact />
          <Route path="/session" component={SessionPage} exact />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  const { logged_in, activeSessionId } = state.AuthReducer;
  return {
    logged_in,
    activeSessionId,
  };
};

export default connect(mapStateToProps)(Routes);
