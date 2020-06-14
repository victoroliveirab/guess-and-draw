
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import SessionPage  from '../pages/Session';
import { connect } from 'react-redux';

const RootRoutes = () => (
  <Route path='/'>
    <Route path='/auth' component={() => <></>} />
    <Route path='/home' component={() => <></>} />
  </Route>
)

const SessionRoute = () => (
    <Route path='/session' component={SessionPage} exact />
)

class Routes extends React.Component {
  render() {
    console.log(this.props);
    return (
      <Router>
        <Switch>
          <SessionRoute />
          <RootRoutes />
        </Switch>
      </Router>
    )
  }
};

const mapStateToProps = (state) => {
  const {logged_in,activeSessionId} = state.AuthReducer;
  return ({
    logged_in,
    activeSessionId
  })
}

export default connect(mapStateToProps)(Routes);