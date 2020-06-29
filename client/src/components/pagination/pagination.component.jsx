import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const Paginate = ({ posts }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(posts.length / 3); i++) {
    pageNumbers.push(<Pagination.Item key={i}>{i}</Pagination.Item>);
  }

  return (
    <div className="mt-3">
      <Pagination>{pageNumbers}</Pagination>
    </div>
  );
};

export default Paginate;
