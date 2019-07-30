import React from 'react';

import Header from '../header/header';

const navHeight = 40;
let lastScrollY = 0;
let ticking = false;

class Nav extends React.Component {
  constructor() {
    super();

    this.state = {
      show: false
    }

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    if(!this.props.hideTop) {
      this.setState({ show: true });
    }
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    return (
      <Header nav show={this.state.show} />
    );
  }

  handleScroll() {
    const scrollTop = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        if(scrollTop < lastScrollY) {
          // scroll up
          if(this.props.hideTop && (scrollTop <= navHeight)) {
              this.setState({ show: false });
          } else {
            this.setState({ show: true });
          }
        } else {
          // scroll down
          if(this.state.show) {
            this.setState({ show: false });
          }
        }

        ticking = false;
        lastScrollY = scrollTop;
      });

      ticking = true;
    }
  }
}

export default Nav;
