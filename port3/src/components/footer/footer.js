import React from 'react';
import './footer.scss';

import * as utilities from '../../shared/utilities';

import Connect from '../connect/connect';

const getCurrentYear = () => {
  var today = new Date();
  var year = today.getFullYear();
  return year;
};

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div id="top">
          <div onClick={utilities.scrollTop}>
            <div className="arrow"></div>
            <p className="top-text"> Back to Top</p>
          </div>
        </div>
        <Connect />
        <div className="copyright">
          <span>©</span>
          <span className="date" data-year={getCurrentYear()}></span>
          <span> Katrina MacGregor</span>
        </div>
      </footer>
    );
  }
}

export default Footer;
