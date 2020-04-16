import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBarWrapper from 'containers/layout/NavBarWrapper';
import OnlyIf from 'components/utils/OnlyIf';

const GuestRoute = ({ component: Component, isAuthenticated, ...otherProps }) => (
   <Route
      {...otherProps}
      render={props =>
            <NavBarWrapper>
               <OnlyIf condition={isAuthenticated}>
                  <Redirect to='/' />
               </OnlyIf>
               <Component {...props} />
            </NavBarWrapper>
      }
   />
);

const mapStateToProps = state => ({
   isAuthenticated: state.auth.isAuthenticated
});

GuestRoute.propTypes = {
   isAuthenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(GuestRoute);