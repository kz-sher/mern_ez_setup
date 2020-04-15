import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import If from 'components/utils/If';

const PrivateRoute = ({ component: Component, isAuthenticated, ...otherProps }) => (
   <Route
      {...otherProps}
      render={props =>
         <If condition={isAuthenticated} 
            then={<Component {...props} />}
            else={<Redirect to="/login" />}
         />
      }
   />
);

const mapStateToProps = state => ({
   isAuthenticated: state.auth.isAuthenticated
});

PrivateRoute.propTypes = {
   component: PropTypes.element.isRequired,
   isAuthenticated: PropTypes.bool.isRequired,
   otherProps: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(PrivateRoute);