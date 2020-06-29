import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import './landing.styles.scss';

const Landing = ({ user, history }) => {
  useEffect(() => {
    if (user.isAuthenticated) {
      history.push('/dashboard');
    }
  }, [user]);

  return (
    <div className="Landing">
      <div className="code-icon">
        <i className="fas fa-code"></i>
      </div>
      <div>
        <h1>MERNAPP</h1>
        <p>
          Welcome to a simple full-stack MERN App with Authentication. Still a
          work in progress.
        </p>
        <div className="signin-signup">
          <Link to="/register">
            <Button variant="primary" size="sm">
              Register
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="success" size="sm">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

Landing.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = ({ user }) => ({
  user
});

export default connect(mapStateToProps)(Landing);
