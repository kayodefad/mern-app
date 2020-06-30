import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { connect } from 'react-redux';
import { createPost, clearError } from '../../redux/post/post.actions';
import PropTypes from 'prop-types';

const Newpost = ({
  createPost,
  postErrors,
  isLoading,
  clearError,
  history
}) => {
  const [postData, setPostData] = useState({
    title: '',
    body: '',
    errors: {}
  });

  useEffect(() => {
    setPostData({ ...postData, errors: postErrors });
  }, [postErrors]);

  const onChange = e => {
    const { name, value } = e.target;

    setPostData({ ...postData, [name]: value });
  };

  const onSubmit = e => {
    e.preventDefault();
    const { title, body } = postData;
    createPost({ title, body }, history);
  };

  const { title, body, errors } = postData;

  return (
    <Form
      onSubmit={onSubmit}
      className="mt-5 mx-auto"
      style={{ width: '90vw', maxWidth: '500px' }}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          value={title}
          name="title"
          onChange={onChange}
          style={{ borderColor: `${errors.title ? 'red' : ''}` }}
        />
        <Form.Text className="text-danger">{errors.title}</Form.Text>
      </Form.Group>

      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>Body</Form.Label>
        <Form.Control
          as="textarea"
          rows="5"
          value={body}
          name="body"
          onChange={onChange}
          style={{ borderColor: `${errors.title ? 'red' : ''}` }}
        />
        <Form.Text className="text-danger">{errors.body}</Form.Text>
      </Form.Group>

      <Button variant="primary" type="submit" disabled={isLoading}>
        {isLoading ? (
          <>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />{' '}
            Posting...
          </>
        ) : (
          'Post'
        )}
      </Button>
    </Form>
  );
};

Newpost.propTypes = {
  createPost: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  postErrors: PropTypes.object.isRequired
};

const mapStateToProps = ({ user, posts: { errors, isLoading } }) => ({
  user,
  postErrors: errors,
  isLoading
});

const mapDispatchToProps = dispatch => ({
  createPost: (postData, history) => dispatch(createPost(postData, history)),
  clearError: () => dispatch(clearError())
});

export default connect(mapStateToProps, mapDispatchToProps)(Newpost);
