import React from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import './indextoggle.scss';

class IndexToggle extends React.Component {
  render() {
    return (
      <Link to={`/${this.props.path}`} className={classNames('index-toggle-root', 'skip-link-style', { 'hide-title': this.props.hideTitle })}>
        <span className={classNames('arrow', `arrow-${this.props.direction}`)}></span>
        {this.props.title}
      </Link>
    );
  }
}

export default IndexToggle;
