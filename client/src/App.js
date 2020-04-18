import React from 'react';
import { connect } from 'react-redux';
import { Router, Switch, Route } from 'react-router';
import OnlyIf from './components/utils/OnlyIf';
import PublicRoute from './containers/route/PublicRoute';
import GuestRoute from './containers/route/GuestRoute';
import UserRoute from './containers/route/UserRoute';
import NotFound from './components/pages/NotFoundPage';
import HomePage from './components/pages/HomePage';
import EmailConfirmation from './containers/mitm/EmailConfirmation';
import DashboardPage from './containers/pages/DashboardPage';
import ProductPage from './containers/pages/ProductPage';
import LoginPage from './containers/pages/LoginPage';
import SignupPage from './containers/pages/SignupPage';
import ForgotPwdPage from './containers/pages/ForgotPwdPage';
import ResetPwdPage from './containers/pages/ResetPwdPage';
import LoginPopup from './containers/pages/LoginPopup';
import history from './config/history';

const App = ({ isUserInitialized }) => {
  
  return (
      <Router history={history}>
        <OnlyIf condition={isUserInitialized}>
          <Switch>
            <PublicRoute exact path='/' component={HomePage} />
            <GuestRoute exact path='/login' component={LoginPage} />
            <GuestRoute exact path='/signup' component={SignupPage} />
            <GuestRoute exact path='/forgotpwd' component={ForgotPwdPage} />
            <GuestRoute path='/resetpwd/:uid/:token' component={ResetPwdPage} />
            <Route path='/email_confirmation/:uid/:token' component={EmailConfirmation} />
            <UserRoute exact path='/dashboard' component={DashboardPage} />
            <UserRoute exact path='/products' component={ProductPage} />
            <PublicRoute path component={NotFound} />
          </Switch>
          <LoginPopup />
        </OnlyIf>
      </Router>
  );
}

const mapStateToProps = state => ({
  isUserInitialized: state.init.isUserInitialized
});

export default connect(mapStateToProps)(App);
