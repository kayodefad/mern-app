import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllMyPosts } from '../../redux/post/post.actions';
import Blogpost from '../blogpost/blogpost.component';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

const Myposts = ({ myPosts, isLoading, fetchAllMyPosts }) => {
  useEffect(() => {
    fetchAllMyPosts();
  }, []);

  const noPosts = (
    <div style={{height: 'calc(100vh - 200px - 54px)'}} className="text-center d-flex flex-column align-items-center justify-content-center">
      <h3>You Have No Posts Yet</h3>
      <Link to="/newpost">
        <Button className="mt-3" variant="primary">
          Create First Post
        </Button>
      </Link>
    </div>
  );

  return (
    <>
      {isLoading ? (
        <div
          style={{ width: '85vw', maxWidth: '520px' }}
          className="mt-2 mb-5 mx-auto">
          <Spinner animation="border" variant="primary" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div
          style={{ width: '85vw', maxWidth: '520px' }}
          className="mt-2 mb-5 mx-auto">
          {myPosts.length === 0
            ? noPosts
            : myPosts.map(post => (
                <Blogpost key={post._id} {...post} editAndDelete />
              ))}
        </div>
      )}
    </>
  );
};

const mapStateToProps = ({ posts: { myPosts, isLoading } }) => ({
  myPosts,
  isLoading
});

const mapDispatchToProps = dispatch => ({
  fetchAllMyPosts: () => dispatch(fetchAllMyPosts())
});

export default connect(mapStateToProps, mapDispatchToProps)(Myposts);
