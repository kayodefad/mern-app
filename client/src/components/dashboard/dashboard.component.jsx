import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { fetchPosts, fetchPaginatedPosts } from '../../redux/post/post.actions';
import Blogpost from '../blogpost/blogpost.component';
import Pagination from '../pagination/pagination.component';

const Dashboard = ({
  user,
  fetchPosts,
  fetchPaginatedPosts,
  blogPosts,
  paginatedPosts,
  activePage
}) => {
  useEffect(() => {
    fetchPosts();
    fetchPaginatedPosts(activePage);
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
      <Pagination posts={blogPosts} fetchPaginatedPosts={fetchPaginatedPosts} />
      <div>{`Showing ${activePage*3-2} to ${activePage * 3} of ${blogPosts.length} posts`}</div>
      {paginatedPosts.map(post => (
        <Blogpost key={post._id} {...post} />
      ))}
      <div className="mt-3">{`Showing ${activePage*3-2} to ${activePage * 3} of ${blogPosts.length} posts`}</div>
    </div>
  );
};

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
  fetchPosts: PropTypes.func.isRequired
};

const mapStateToProps = ({
  user,
  posts: { posts, paginatedPosts, activePage }
}) => ({
  user,
  blogPosts: posts,
  paginatedPosts,
  activePage
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: () => dispatch(fetchPosts()),
  fetchPaginatedPosts: pageNumber => dispatch(fetchPaginatedPosts(pageNumber))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
