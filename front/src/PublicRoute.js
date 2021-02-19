
import React from 'react';
import { Redirect, Route } from "react-router-dom";

function PublicRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          localStorage.getItem("ID_TOKEN") ? (
            <Redirect
              to={{
                pathname: "/dashboard",
                state: { from: location }
              }}
            />
          ) : (
            children
          )
        }
      />
    );
  }

export default PublicRoute;