import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import { loginUser, clearErrors } from '../../redux/user/user.actions';

const Login = ({ loginUser, clearErrors, user, history }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    errors: {}
  });

  useEffect(() => {
    if (user.isAuthenticated) {
      history.push('/dashboard');
    }

    setCredentials({ ...credentials, errors: user.errors });

    return () => {
      if (Object.keys(user.errors).length !== 0) {
        clearErrors()
      }
    }
  }, [user]);

  const onChange = e => {
    const { id, value } = e.target;
    setCredentials({ ...credentials, [id]: value });
  };

  const onSubmit = e => {
    e.preventDefault();
    const { email, password } = credentials;

    const userData = {
      email,
      password
    };

    loginUser(userData);
  };

  const { email, password, errors } = credentials;

  return (
    <div style={{ margin: '3rem auto', width: '90vw', maxWidth: '500px' }}>
      <Link to="/">
        <i className="fas fa-arrow-left"></i> Back to home
      </Link>
      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        <h4>
          <b>Login</b> below
        </h4>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
      <Form noValidate onSubmit={onSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="jdoe@email.com"
            onChange={onChange}
            error={errors.email}
            name="email"
            value={email}
            style={{ borderColor: `${errors.email ? 'red' : ''}` }}
          />
          <Form.Text className="text-danger">{errors.email}</Form.Text>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={onChange}
            error={errors.password}
            name="password"
            value={password}
            style={{ borderColor: `${errors.password ? 'red' : ''}` }}
          />
          <Form.Text className="text-danger">{errors.password}</Form.Text>
        </Form.Group>

        <Button variant="success" type="submit" disabled={user.loading}>
          {user.loading ? (
            <>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />{' '}
              Logging In...
            </>
          ) : (
            'Submit'
          )}
        </Button>
      </Form>
    </div>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = ({ user }) => ({
  user
});

const mapDispatchToProps = dispatch => ({
  loginUser: user => dispatch(loginUser(user)),
  clearErrors: () => dispatch(clearErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
