import React from 'react';

import { connect } from 'react-redux';
import * as ACTIONS from './app-actions';

import { Switch, Route, withRouter } from 'react-router-dom';

import * as utilities from '../../shared/utilities';

import classNames from 'classnames/bind';
import './app.scss';

import Browse from '../browse/browse';
import Detail from '../detail/detail';
import Nav from '../nav/nav';
import Footer from '../footer/footer';
import ThemeBg from '../themebg/themebg';
import ErrorPage from '../errorpage/errorpage';
import HPPage from '../hp/hp';
import NickPage from '../nick/nick';
import TrollPage from '../troll/troll';
import Loading from '../loading/loading';

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
    const isMobile = this.isMobileDevice();
    const device = isMobile ? 'mobile' : 'desktop';

    this.getPortfolioItems();
    this.props.setDeviceType(device);
  }

  componentDidUpdate(prevProps) {
    if(this.props.items !== prevProps.items) {
      const that = this;
      setTimeout(() => {
        that.props.setAppLoaded();
      }, 1500);
    }
  }

  render() {
    const { loaded, location } = this.props;
    const isRoot = (location.pathname === '/');
    return (
      <div className="app">
        <div className={classNames("app-wrapper", { "loaded": loaded })}>
          <ThemeBg timeQuery={location.search || null}>
            <Nav hideTop={isRoot} skipTheme={!isRoot}  />
              <Switch>
                <Route exact path='/' component={Browse} />
                {this.props.items.map((item, i) => (
                  <Route exact path={`/${item.class}`} key={i} component={Detail} />
                ))}
                <Route exact path='/hp' component={HPPage} />
                <Route exact path='/hp-nick' component={NickPage} />
                <Route exact path='/hp-troll' component={TrollPage} />
                <Route component={ErrorPage} />
              </Switch>
            <Footer />
          </ThemeBg>
        </div>
        {!loaded && <Loading fixed dark />}
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

  isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
  }
}

App = connect(
  mapStateToProps,
  ACTIONS
)(App);

App = withRouter(App);

export default App;
