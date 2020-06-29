import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { logoutUser } from '../../redux/user/user.actions';

const NavBar = ({ user, logoutUser }) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Link to="/">
          <Navbar.Brand><i className="fas fa-code"></i> MERNAPP</Navbar.Brand>
        </Link>
        <Nav className="ml-auto">
          {user.isAuthenticated ? (
            <>
            {/* <Button variant="secondary" size="sm">
              My Posts
            </Button> */}
            <Button className="ml-3" onClick={() => logoutUser()} variant="primary" size="sm">
              Logout
            </Button>
              </>
          ) : (
            <>
              <Link to="/register">
                <Button variant="primary" size="sm">
                  Register
                </Button>
              </Link>
              <Link to="/login">
                <Button className="ml-3" variant="secondary" size="sm">
                  Login
                </Button>
              </Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

const mapStateToProps = ({ user }) => ({
  user
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
