import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import './landing.styles.scss';
import { themes, ThemeContext } from "../../contexts/ThemeContext";

const Landing = ({ user, history }) => {
  const { theme } = useContext(ThemeContext);
  const themeValues = theme.light ? themes.light : themes.dark;
  useEffect(() => {
    if (user.isAuthenticated) {
      history.push('/dashboard');
    }
  }, [user]);

  return (
    <div className="Landing">
      <div style={{color: themeValues.foreground}} className="code-icon">
        <i className="fas fa-code"></i>
      </div>
      <div>
        <h1>MERNAPP</h1>
        <p>
          Welcome to a simple full-stack MERN App with Passport-JWT
          Authentication. The app is built with React, Redux, Hooks, Context API, React Bootstrap, Node, Express, MongoDB
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
