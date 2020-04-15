import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import If from 'components/utils/If';
import NavBarWrapper from 'containers/layout/NavBarWrapper';

const UserRoute = ({ component: Component, isAuthenticated, ...otherProps }) => (
   <Route
      {...otherProps}
      render={props =>
         <If condition={isAuthenticated} 
            then={ <NavBarWrapper><Component {...props} /></NavBarWrapper> }
            else={ <Redirect to='/login' /> }
         />
      }
   />
);

const mapStateToProps = state => ({
   isAuthenticated: state.auth.isAuthenticated
});

UserRoute.propTypes = {
   isAuthenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(UserRoute);