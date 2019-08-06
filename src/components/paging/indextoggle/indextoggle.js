import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import * as ACTIONS from './indextoggle-actions';

import classNames from 'classnames/bind';
import './indextoggle.scss';

class IndexToggle extends React.Component {
  constructor() {
    super();

    this.handleItemChange = this.handleItemChange.bind(this);
  }

  render() {
    return (
      <Link to={`/${this.props.path}`} className={classNames('index-toggle-root', 'skip-link-style', { 'hide-title': this.props.hideTitle })} onClick={this.handleItemChange}>
        <span className={classNames('arrow', `arrow-${this.props.direction}`)}></span>
        {this.props.title}
      </Link>
    );
  }

  handleItemChange() {
    this.props.setItemChange();
  }
}

IndexToggle = connect(
  null,
  ACTIONS
)(IndexToggle);

export default IndexToggle;
