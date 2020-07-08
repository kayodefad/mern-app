import React, { useState } from 'react';
import './blogpost.styles.scss';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { fetchSinglePost, fetchAllMyPosts, deletePost } from '../../redux/post/post.actions';
import Modal from '../modal/modal.component';

const Blogpost = props => {
  const [show, setShow] = useState(false);

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const datePosted = new Date(props.createdAt).toLocaleDateString(
    undefined,
    options
  );

  return (
    <div className="blogpost mt-4">
      <h3>{props.title}</h3>
      <div className="owner">
        <p className="mb-1">
          Posted By{' '}
          <strong>
            <em>{props.owner}</em>
          </strong>
        </p>
        <p>{datePosted}</p>
      </div>
      <p>{`${props.body.slice(0, 200)}...`}</p>
      <div>
        <Link to={`/singlepost/${props._id}`}>
          <p className="readmore">Read more...</p>
        </Link>
        {props.editAndDelete && (
          <>
            <Link to={`/editpost/${props._id}`}>
              <Button
                variant="info"
                size="sm">
                Edit
              </Button>
            </Link>
            <Button
              onClick={() => setShow(!show)}
              className="ml-3"
              variant="danger"
              size="sm">
              Delete
            </Button>
          </>
        )}
      </div>
      {show && (
        <Modal>
          <div
            className="text-center"
            style={{
              background: '#fff',
              padding: '20px',
              borderRadius: '5px'
            }}>
            <p style={{color: '#000'}}>Are You Sure?</p>
            <div>
              <Button
                onClick={() => setShow(!show)}
                variant="success"
                size="sm">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  props.deletePost(props._id, props.history)
                  setShow(!show)
                  props.fetchAllMyPosts()
                }}
                className="ml-3"
                variant="danger"
                size="sm">
                Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  fetchSinglePost: id => dispatch(fetchSinglePost(id)),
  fetchAllMyPosts: () => dispatch(fetchAllMyPosts()),
  deletePost: (id, history) => dispatch(deletePost(id, history))
});

export default connect(null, mapDispatchToProps)(withRouter(Blogpost));
