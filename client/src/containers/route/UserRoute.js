import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import OnlyIf from 'components/utils/OnlyIf';
import NavBarWrapper from 'containers/layout/NavBarWrapper';

const UserRoute = ({ component: Component, isAuthenticated, ...otherProps }) => (
   <Route
      {...otherProps}
      render={props =>
            <NavBarWrapper>
               <OnlyIf condition={!isAuthenticated} >
                  <Redirect to='/login' />
               </OnlyIf>
               <Component {...props} />
            </NavBarWrapper>
      }
   />
);

const mapStateToProps = state => ({
   isAuthenticated: state.auth.isAuthenticated,
});

UserRoute.propTypes = {
   isAuthenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(UserRoute);