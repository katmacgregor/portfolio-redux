import React from 'react';

import { connect } from 'react-redux';
import * as ACTIONS from './themebg-actions';

import classNames from 'classnames/bind';
import './themebg.scss';

const mapStateToProps = (state) => {
  return {
    theme: state.app.theme
  }
};

class ThemeBg extends React.Component {
  constructor() {
    super();

    this.state = {
      supplementalTheme: 'day'
    };

    this.processTheme = this.processTheme.bind(this);
  }

  componentDidMount() {
    this.processTheme();
  }

  render() {
    const { theme } = this.props;

    return (
      <div className={classNames(`theme theme-${theme}`, `theme-supplement-${this.state.supplementalTheme}`)}>
        {this.props.children}
      </div>
    );
  }

  processTheme() {
    const { timeQuery } = this.props;
    let theme;

    if(timeQuery) {
      // if has query, use to set time
      const queryVal = timeQuery.split('=')[1];

      theme = queryVal;
    } else {
      // default to generated time
      theme = this.processTimeOfDay();
    }

    this.props.setTheme(theme);
    if((theme === 'evening') || (theme === 'night') || (theme === 'midnight')) {
      this.setState({ supplementalTheme: 'night' });
    }
  }

  processTimeOfDay() {
    const currentTime = new Date().getHours();

    if ((currentTime >= 0) && (currentTime < 5)) {
      return 'midnight';
    } else if ((currentTime >= 5) && (currentTime < 12)) {
      return 'day';
    } else if ((currentTime >= 12) && (currentTime < 16)) {
      return 'afternoon';
    } else if ((currentTime >= 16) && (currentTime < 20)) {
      return 'evening';
    } else if ((currentTime >= 20 ) && (currentTime < 24)) {
      return 'night';
    }
  }
}

ThemeBg = connect(
  mapStateToProps,
  ACTIONS
)(ThemeBg);

export default ThemeBg;
