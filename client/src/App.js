import React from 'react';
import { Router, Switch, Route } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import WithNavBar from './components/hoc/WithNavBar';
import PrivateRoute from './components/hoc/PrivateRoute';
import HomePage from './components/layout/HomePage';
import EmailConfirmation from './components/mitm/EmailConfirmation';
import DashboardPage from './containers/layout/DashboardPage';
import LoginPage from './containers/auth/LoginPage';
import SignupPage from './containers/auth/SignupPage';
import ForgotPwdPage from './containers/auth/ForgotPwdPage';
import ResetPwdPage from './containers/auth/ResetPwdPage';
import reducers from './reducers';
import history from './utils/history';

function App() {
  return (
    <Provider store={createStore(reducers, {}, composeWithDevTools(applyMiddleware(reduxThunk)))}>
      <Router history={history}>
          <Switch>
            <Route exact path='/' component={WithNavBar(HomePage)} />
            <Route path='/login' component={WithNavBar(LoginPage)} />
            <Route path='/signup' component={WithNavBar(SignupPage)} />
            <Route path='/forgotpwd' component={WithNavBar(ForgotPwdPage)} />
            <Route path='/resetpwd/:uid/:token' component={WithNavBar(ResetPwdPage)} />
            <Route path='/email_confirmation/:uid/:token' component={EmailConfirmation} />
            <PrivateRoute exact path='/dashboard' component={WithNavBar(DashboardPage)} />
          </Switch>
      </Router>
    </Provider>
  );
}

export default App;
