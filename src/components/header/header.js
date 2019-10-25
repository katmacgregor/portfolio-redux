import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as ACTIONS from './header-actions';

import classNames from 'classnames/bind';
import './header.scss';

import * as utilities from '../../shared/utilities';

import Connect from '../connect/connect';

const mapStateToProps = (state) => {
  return {
    bgFixed: state.app.bgFixed
  };
}

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      ticking: false
    };

    this.headerEl = React.createRef();

    this.checkHeaderVisibility = this.checkHeaderVisibility.bind(this);
  }

  componentDidMount() {
    if(this.props.checkVisibility) {
      window.addEventListener('scroll', this.checkHeaderVisibility);
    }
  }

  componentWillUnmount() {
    if(this.props.checkVisibility) {
      window.removeEventListener('scroll', this.checkHeaderVisibility);
    }
  }

  render() {
    const { nav, show, skipTheme } = this.props;
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
      <div className={classNames('header-container', { 'nav': nav, 'show': show, 'skip-theme': skipTheme })} ref={this.headerEl}>
        <div className="header">
          <div className="title">
            {content}
          </div>
        </div>
        <Connect showLabels={!nav} size={!nav ? 'large': null} />
      </div>
    );
  }

  checkHeaderVisibility() {
    const el = this.headerEl.current;

    if(el && !this.state.ticking) {
      window.requestAnimationFrame(() => {
        const isVisible = utilities.checkVisibility(el);

        if(!isVisible && !this.props.bgFixed) {
          this.props.setBgFixed(true);
        } else if(isVisible && this.props.bgFixed) {
          this.props.setBgFixed(false);
        }

        this.setState({ ticking: false });
      });

      this.setState({ ticking: true });
    }
  }
};

Header = connect(
  mapStateToProps,
  ACTIONS
)(Header);

export default Header;
