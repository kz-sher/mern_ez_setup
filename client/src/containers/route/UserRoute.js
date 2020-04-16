import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import OnlyIf from 'components/utils/OnlyIf';
import NavBarWrapper from 'containers/layout/NavBarWrapper';

const UserRoute = ({ component: Component, isAuthenticated, redirectUrl, ...otherProps }) => (
   <Route
      {...otherProps}
      render={props =>
            <NavBarWrapper>
               <OnlyIf condition={!isAuthenticated} >
                  <Redirect to={redirectUrl} />
               </OnlyIf>
               <Component {...props} />
            </NavBarWrapper>
      }
   />
);

const mapStateToProps = state => ({
   isAuthenticated: state.auth.isAuthenticated,
   redirectUrl: state.auth.redirect
});

UserRoute.propTypes = {
   isAuthenticated: PropTypes.bool.isRequired,
   redirectUrl: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(UserRoute);