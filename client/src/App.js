import React from 'react';
import { Router, Switch, Route } from 'react-router';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import WithNavBar from './components/hoc/WithNavBar';
import HomePage from './components/layout/HomePage';
import DashboardPage from './containers/layout/DashboardPage';
import LoginPage from './containers/layout/LoginPage';
import SignupPage from './containers/layout/SignupPage';
import ForgotPwdPage from './containers/layout/ForgotPwdPage';
import ResetPwdPage from './containers/layout/ResetPwdPage';
import reducers from './reducers';

const history = createBrowserHistory();

function App() {
  return (
    <Provider store={createStore(reducers, {
      global:{
        history: history
      }
    }, composeWithDevTools(applyMiddleware(reduxThunk)))}>
      <Router history={history}>
          <Switch>
            <Route exact path='/' component={WithNavBar(HomePage)} />
            <Route exact path='/dashboard' component={WithNavBar(DashboardPage)} />
            <Route path='/login' component={WithNavBar(LoginPage)} />
            <Route path='/signup' component={WithNavBar(SignupPage)} />
            <Route path='/forgotpwd' component={WithNavBar(ForgotPwdPage)} />
            <Route path='/resetpwd/:uid/:token' component={WithNavBar(ResetPwdPage)} />
          </Switch>
      </Router>
    </Provider>
  );
}

export default App;
