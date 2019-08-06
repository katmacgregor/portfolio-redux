import React from 'react';
import classNames from 'classnames/bind';
import './loading.scss';

const Loading = ({ fixed, dark }) => (
  <div className={classNames("load-container", { "fixed": fixed, "dark": dark })}>
    <div className="loader"></div>
  </div>
);

export default Loading;
