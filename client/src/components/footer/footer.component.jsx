import React from 'react';
import './footer.styles.scss';

const Footer = () => {
  return (
    <div className="Footer">
      &copy; kayodefad 2020{' '}
      <a className="ml-2" href="https://github.com/kayodefad" target="_blank">
        <i className="fa fa-github"></i>
      </a>
    </div>
  );
};

export default Footer;
