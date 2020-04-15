import React from 'react';
import { connect } from 'react-redux';
import { Router, Switch, Route } from 'react-router';
import { Loader } from 'semantic-ui-react';
import OnlyIf from './components/utils/OnlyIf';
import UserRoute from './containers/route/UserRoute';
import GuestRoute from './containers/route/GuestRoute';
import NotFound from './components/layout/NotFound';
import HomePage from './components/layout/HomePage';
import EmailConfirmation from './containers/mitm/EmailConfirmation';
import DashboardPage from './containers/DashboardPage';
import ProductPage from './containers/ProductPage';
import LoginPage from './containers/auth/LoginPage';
import SignupPage from './containers/auth/SignupPage';
import ForgotPwdPage from './containers/auth/ForgotPwdPage';
import ResetPwdPage from './containers/auth/ResetPwdPage';
import history from './utils/history';

const App = ({ isUserInitialized }) => {
  
  return (
      <Router history={history}>
        <OnlyIf condition={isUserInitialized}>
          <Switch>
            <GuestRoute exact path='/' component={HomePage} />
            <GuestRoute path='/login' component={LoginPage} />
            <GuestRoute path='/signup' component={SignupPage} />
            <GuestRoute path='/forgotpwd' component={ForgotPwdPage} />
            <GuestRoute path='/resetpwd/:uid/:token' component={ResetPwdPage} />
            <Route path='/email_confirmation/:uid/:token' component={EmailConfirmation} />
            <UserRoute exact path='/dashboard' component={DashboardPage} />
            <UserRoute exact path='/products' component={ProductPage} />
            <GuestRoute component={NotFound} />
          </Switch>
        </OnlyIf>
        <OnlyIf condition={!isUserInitialized}>
          <Loader />
        </OnlyIf>
      </Router>
  );
}

const mapStateToProps = state => ({
  isUserInitialized: state.init.isUserInitialized
});

export default connect(mapStateToProps)(App);
