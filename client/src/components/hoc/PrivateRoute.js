import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, isAuthenticated, ...otherProps }) => (
   <Route
      {...otherProps}
      render={props =>
         isAuthenticated === true ? 
         (<Component {...props} />) : 
         (<Redirect to="/login" />)
      }
   />
);

const mapStateToProps = state => ({
   isAuthenticated: state.auth.isAuthenticated
});

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(PrivateRoute);