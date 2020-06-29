import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAllMyPosts } from '../../redux/post/post.actions';
import Blogpost from '../blogpost/blogpost.component';

const Myposts = ({ myPosts, fetchAllMyPosts }) => {
  useEffect(() => {
    fetchAllMyPosts();
  }, []);
  return (
    <div
      style={{ width: '85vw', maxWidth: '520px' }}
      className="mt-5 mb-5 mx-auto">
      {myPosts.map(post => (
        <Blogpost key={post._id} {...post} editAndDelete />
      ))}
    </div>
  );
};

const mapStateToProps = ({ posts: { myPosts } }) => ({
  myPosts
});

const mapDispatchToProps = dispatch => ({
  fetchAllMyPosts: () => dispatch(fetchAllMyPosts())
});

export default connect(mapStateToProps, mapDispatchToProps)(Myposts);
