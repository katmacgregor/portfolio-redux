import React from 'react';

import * as utilities from '../../shared/utilities';

import './page.scss';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      ticking: false
    }

    this.checkPageTop = this.checkPageTop.bind(this);
  }

  componentDidMount() {
    this.checkPageTop();
  }

  render() {
    return (
      <main className="main-container">
        {this.props.children}
      </main>
    );
  }

  checkPageTop() {
    const scrollTop = window.scrollY;

    if (!this.state.ticking) {
      window.requestAnimationFrame((e) => {
        if(scrollTop > 0) {
          utilities.scrollTop(e, 'auto');
        }

        this.setState({ ticking: false });
      });

      this.setState({ ticking: true });
    }
  }
}

export default App;
