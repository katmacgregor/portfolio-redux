import React from 'react';
import './footer.scss';

import Connect from '../connect/connect';

const getCurrentYear = () => {
  var today = new Date();
  var year = today.getFullYear();
  return year;
};

const Footer = () => {
  return (
    <footer>
      <a className="skip-link-style" href="#top">
        <div id="top">
          <span className="icon-arrow arrow-up" />
          <p className="top-text"> Back to Top</p>
        </div>
      </a>
      <Connect />
      <div className="copyright">
        <span>©</span>
        <span className="date" data-year={getCurrentYear()}></span>
        <span> Katrina MacGregor</span>
      </div>
    </footer>
  );
};

export default Footer;
