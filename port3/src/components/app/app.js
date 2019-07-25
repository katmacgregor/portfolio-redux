import React from 'react';

import { connect } from 'react-redux';
import * as ACTIONS from './app-actions';

import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import * as utilities from '../../shared/utilities';

import './app.scss';

import Browse from '../browse/browse';
import Detail from '../detail/detail';
import Header from '../header/header';
import Footer from '../footer/footer';

const mapStateToProps = (state) => {
  return {
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

  render() {
    return (
      <div className="app">
        <div className="bg-fill"></div>
        <Header nav />
        <main className="main-container">
          <Switch>
            <Route exact path='/' component={Browse} />
            {this.props.items.map((item, i) => (
              <Route exact path={`/${item.class}`} key={i} component={Detail} />
            ))}
            {/*
            <Route component={ErrorPage} />
            */}
          </Switch>
        </main>
        <Footer />
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
