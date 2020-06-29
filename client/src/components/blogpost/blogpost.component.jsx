import React from 'react';
import './blogpost.styles.scss';
import { Link } from 'react-router-dom';

const Blogpost = props => {
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
        <p className="mb-1">Posted By <strong><em>{props.owner}</em></strong></p>
        <p>{datePosted}</p>
      </div>
      <p>{props.body.slice(0, 200)}</p>
      <Link to={`/singlepost/${props._id}`}>
        <p className="readmore">Read more...</p>
      </Link>
    </div>
  );
};

export default Blogpost;
