import React from 'react';
import './app.scss';

import Browse from '../browse/browse';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <div className="bg-fill"></div>
        <main className="main-container">
          <Browse />
        </main>
      </div>
    );
  }
}

export default App;
