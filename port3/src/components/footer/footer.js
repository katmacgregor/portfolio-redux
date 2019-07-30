import React from 'react';
import './footer.scss';

import smoothscroll from 'smoothscroll-polyfill';

import Connect from '../connect/connect';

const getCurrentYear = () => {
  var today = new Date();
  var year = today.getFullYear();
  return year;
};

class Footer extends React.Component {
  constructor() {
    super();

    this.handleScrollUp = this.handleScrollUp.bind(this);
  }

  handleScrollUp() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    smoothscroll.polyfill();
  }

  render() {
    return (
      <footer>
        <div id="top">
          <div onClick={this.handleScrollUp}>
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
