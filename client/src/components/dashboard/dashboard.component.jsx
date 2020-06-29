import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../../redux/post/post.actions';
import Blogpost from '../blogpost/blogpost.component';
import Pagination from '../pagination/pagination.component';
import Footer from '../footer/footer.component';

const Dashboard = ({ user, fetchPosts, blogPosts }) => {
  useEffect(() => {
    fetchPosts();
  }, []);

  const { currentUser } = user;

  return (
    <div
      style={{ width: '85vw', maxWidth: '520px' }}
      className="mt-5 mb-5 mx-auto">
      <h4>
        <b>Hey there,</b> {currentUser.name.split(' ')[0]}
        <p className="mt-2">
          You are logged into a full-stack{' '}
          <span style={{ fontFamily: 'monospace' }}>MERN</span> app 👏
        </p>
      </h4>
      <Link to="/newpost">
        <Button variant="primary">New Post</Button>
      </Link>
      <Pagination posts={blogPosts} />
      {blogPosts.map(post => (
        <Blogpost key={post._id} {...post} />
      ))}
    </div>
  );
};

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
  fetchPosts: PropTypes.func.isRequired
};

const mapStateToProps = ({ user, posts: { posts } }) => ({
  user,
  blogPosts: posts
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: () => dispatch(fetchPosts())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
