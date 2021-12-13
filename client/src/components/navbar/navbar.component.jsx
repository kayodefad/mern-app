import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { logoutUser } from '../../redux/user/user.actions';
import { fetchAllMyPosts } from '../../redux/post/post.actions';

const NavBar = ({ history, user, logoutUser, fetchAllMyPosts }) => {
  return (
    <Navbar bg='dark' variant='dark'>
      <Container>
        <Link to='/'>
          <Navbar.Brand>
            <i className='fas fa-code'></i> MERNAPP
          </Navbar.Brand>
        </Link>
        <Nav className='ml-auto'>
          {user.isAuthenticated ? (
            <>
              <Link to='/myposts'>
                <Button variant='success' size='sm'>
                  My Posts
                </Button>
              </Link>
              <Button
                className='ml-3'
                onClick={() => logoutUser()}
                variant='primary'
                size='sm'
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to='/register'>
                <Button variant='primary' size='sm'>
                  Register
                </Button>
              </Link>
              <Link to='/login'>
                <Button className='ml-3' variant='success' size='sm'>
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
  user,
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser()),
  fetchAllMyPosts: history => dispatch(fetchAllMyPosts(history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar));
