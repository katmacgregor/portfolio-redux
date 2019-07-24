import React from 'react';
import './app.scss';

import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import Browse from '../browse/browse';
import Footer from '../footer/footer';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <div className="bg-fill"></div>
        <main className="main-container">
          <Switch>
            <Route exact path='/' component={Browse} />
            {/*
            {this.props.items.map((item, i) => (
              <Route exact path={`/${item.folder}`} key={i} component={} />
            ))}
            <Route component={ErrorPage} />
            */}
          </Switch>
        </main>
        <Footer />
      </div>
    );
  }
}

App = withRouter(App);

export default App;
