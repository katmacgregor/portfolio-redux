import React from 'react';

import { connect } from 'react-redux';
import * as ACTIONS from './app-actions';

import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import * as utilities from '../../shared/utilities';

import classNames from 'classnames/bind';
import './app.scss';

import Browse from '../browse/browse';
import Detail from '../detail/detail';
import Nav from '../nav/nav';
import Footer from '../footer/footer';
import ThemeBg from '../themebg/themebg';

const mapStateToProps = (state) => {
  return {
    loaded: state.app.loaded,
    items: state.portfolio.items
  }
};

class App extends React.Component {
  constructor() {
    super();

    this.getPortfolioItems = this.getPortfolioItems.bind(this);
  }

  componentDidMount() {
    this.getPortfolioItems();
  }

  componentDidUpdate(prevProps) {
    if(this.props.items !== prevProps.items) {
      this.props.setAppLoaded();
    }
  }

  render() {
    return (
      <div className={classNames("app", { "loaded": this.props.loaded })}>
        <ThemeBg timeQuery={this.props.location.search || null}>
          <Nav hideTop={this.props.location.pathname === '/'} />
            <Switch>
              <Route exact path='/' component={Browse} />
              {this.props.items.map((item, i) => (
                <Route exact path={`/${item.class}`} key={i} component={Detail} />
              ))}
              {/*
              <Route component={ErrorPage} />
              */}
            </Switch>
          <Footer />
        </ThemeBg>
      </div>
    );
  }

  getPortfolioItems() {
    const path = `${process.env.PUBLIC_URL}/portfolio.json`;
    const that = this;

    const success = (data) => {
      that.props.setItems(data.items);
    }

    utilities.handleFetch(path, success);
  }
}

App = connect(
  mapStateToProps,
  ACTIONS
)(App);

App = withRouter(App);

export default App;
