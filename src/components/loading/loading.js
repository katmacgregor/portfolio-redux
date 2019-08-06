import React from 'react';
import classNames from 'classnames/bind';
import './loading.scss';

const Loading = ({ fixed, absolute, dark }) => (
  <div className={classNames("load-container", { "fixed": fixed, "absolute": absolute, "dark": dark })}>
    <div className="loader"></div>
  </div>
);

export default Loading;
