import React from 'react';
import { Route } from 'react-router-dom';
import NavBarWrapper from 'containers/layout/NavBarWrapper';

const GuestRoute = ({ component: Component, ...otherProps }) => (
   <Route
      {...otherProps}
      render={props =>
            <NavBarWrapper>
                  <Component {...props} />
            </NavBarWrapper>
      }
   />
);



export default GuestRoute;