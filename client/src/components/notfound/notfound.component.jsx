import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./notfound.styles.scss";


const NotFound = () => {
  return (
    <div className="NotFound">
      <div style={{color: '#000'}} className="not-found-body">
        <h3>Page Not Found</h3>
        <p>
          Looks like you've followed a broken link or entered a URL that doesn't
          exist on this site.
        </p>
        <Link to="/">
          <i className="fa fa-angle-left"></i> &nbsp;Back to our site
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
