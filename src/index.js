import React from 'react';
import ReactDOM from 'react-dom';

import { routerMiddleware, ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createRootReducer from './reducers/reducers';

import './index.css';
import App from './components/app/app';

import * as serviceWorker from './serviceWorker';

const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL
});

const store = createStore(
  createRootReducer(history), // root reducer with router state
  compose(
    applyMiddleware(
      routerMiddleware(history)
    ),
  ),
);

const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Component/>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
  );
};

render(App);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
