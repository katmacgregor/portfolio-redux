import React from 'react';

import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import './header.scss';

import Connect from '../connect/connect';

const Header = ({nav, show, hide}) => {
  let content;
  if(!nav) {
    content = (
      <React.Fragment>
        <h1 className="hide">Katrina MacGregor</h1>
        <h3>hi,</h3><h2> i'm katrina.</h2>
      </React.Fragment>
    );
  } else {
    content = (
      <React.Fragment>
        <Link to="/" className="skip-link-style">
          <span className="greeting">hi,</span><span> i'm katrina.</span>
        </Link>
      </React.Fragment>
    );
  }

  return (
    <div className={classNames('header-container', { 'nav': nav, 'show': show })}>
      <div className="header">
        <div className="title">
          {content}
        </div>
      </div>
      <Connect size={!nav ? 'large': null} />
    </div>
  );
};

export default Header;
