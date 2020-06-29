import React, { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { connect } from 'react-redux';
import { setActivePage } from '../../redux/post/post.actions';

const Paginate = ({ posts, fetchPaginatedPosts, setActivePage }) => {
  const [active, setActive] = useState(1);
  const pageNumbers = [];

  const pageNumberClick = number => {
    fetchPaginatedPosts(number);
    setActive(number);
    setActivePage(number);
  };

  for (let i = 1; i <= Math.ceil(posts.length / 3); i++) {
    pageNumbers.push(
      <Pagination.Item
        key={i}
        onClick={() => pageNumberClick(i)}
        active={i === active}>
        {i}
      </Pagination.Item>
    );
  }

  return (
    <div className="mt-3">
      <Pagination>{pageNumbers}</Pagination>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  setActivePage: pageNumber => dispatch(setActivePage(pageNumber))
});

export default connect(null, mapDispatchToProps)(Paginate);
