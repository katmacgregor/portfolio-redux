import React from 'react';
import ReactDOM from 'react-dom';

import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/reducers';

import './index.css';
import App from './components/app/app';

import * as serviceWorker from './serviceWorker';

const history = createBrowserHistory();
const store = createStore(rootReducer);

const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Component/>
      </Router>
    </Provider>,
    document.getElementById('root')
  );
};

render(App);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
