import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ user, component: Component, ...otherProps }) => {
  return (
    <Route
      {...otherProps}
      render={props =>
        user.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = ({ user }) => ({
  user
});

export default connect(mapStateToProps)(PrivateRoute);
