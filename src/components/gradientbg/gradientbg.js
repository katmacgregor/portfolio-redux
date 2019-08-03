import React from 'react';
import { connect } from 'react-redux';

import classNames from 'classnames/bind';
import './gradientbg.scss';

const mapStateToProps = (state) => {
  return {
    bgFixed: state.app.bgFixed
  }
};

class GradientBg extends React.Component {
  render() {
    const { bgFixed } = this.props;

    return (
      <div className={classNames('bg-fill', {'fixed': bgFixed })}></div>
    );
  }
}

GradientBg = connect(
  mapStateToProps
)(GradientBg);

export default GradientBg;
