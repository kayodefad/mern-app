import React, { useEffect } from 'react';
import './singlepost.styles.scss';
import { connect } from 'react-redux';
import { fetchSinglePost } from '../../redux/post/post.actions';

const Singlepost = ({
  post,
  fetchSinglePost,
  match: {
    params: { id }
  }
}) => {
  useEffect(() => {
    fetchSinglePost(id);
  }, []);

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const datePosted = new Date(post.createdAt).toLocaleDateString(
    undefined,
    options
  );

  return (
    <div className="Singlepost mt-4">
      <h3>{post.title}</h3>
      <div className="owner">
        <p className="mb-1">{post.owner}</p>
        <p>{datePosted}</p>
      </div>
      <p>{post.body}</p>
    </div>
  );
};

const mapStateToProps = ({ posts: { post } }) => ({
  post
});

const mapDispatchToProps = dispatch => ({
  fetchSinglePost: id => dispatch(fetchSinglePost(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Singlepost);
