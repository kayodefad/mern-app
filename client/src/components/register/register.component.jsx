import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import { registerUser } from '../../redux/user/user.actions';
import { clearErrors } from '../../redux/user/user.actions';

const Register = ({ user, registerUser, clearErrors, history }) => {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {}
  });

  useEffect(() => {
    if (user.isAuthenticated) {
      history.push('/dashboard');
    }

    setCredentials({ ...credentials, errors: user.errors });
  }, [user]);

  const onChange = e => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const onSubmit = e => {
    e.preventDefault();
    const { name, email, password, password2 } = credentials;

    const newUser = { name, email, password, password2 };
    registerUser(newUser, history);
  };

  const { name, email, password, password2, errors } = credentials;

  return (
    <div style={{ margin: '3rem auto', width: '90vw', maxWidth: '500px' }}>
      <Link to="/">
        <i className="fas fa-arrow-left"></i> Back to home
      </Link>
      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        <h4>
          <b>Register</b> below
        </h4>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
      <Form noValidate onSubmit={onSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="John Doe"
            onChange={onChange}
            error={errors.name}
            name="name"
            value={name}
            style={{ borderColor: `${errors.name ? 'red' : ''}` }}
          />
          <Form.Text className="text-danger">{errors.name}</Form.Text>
        </Form.Group>

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

        <Form.Group controlId="confirm_password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            onChange={onChange}
            error={errors.password2}
            name="password2"
            value={password2}
            style={{ borderColor: `${errors.password2 ? 'red' : ''}` }}
          />
          <Form.Text className="text-danger">{errors.password2}</Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={user.loading}>
          {user.loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />{' '}
              Loading...
            </>
          ) : (
            'Submit'
          )}
        </Button>
      </Form>
    </div>
  );
};

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToprops = ({ user }) => ({
  user
});

const mapDispatchToProps = dispatch => ({
  registerUser: (userData, history) =>
    dispatch(registerUser(userData, history)),
  clearErrors: () => dispatch(clearErrors())
});

export default connect(
  mapStateToprops,
  mapDispatchToProps
)(withRouter(Register));
