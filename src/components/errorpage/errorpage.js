import React from 'react';

import './errorpage.scss';

import Page from '../page/page';
import GradientBg from '../gradientbg/gradientbg';

class ErrorPage extends React.Component {
  render() {
    return (
      <Page {...this.props}>
        <GradientBg />
        <div className="error-container">
          <div>
            <h3>Ruh roh</h3>
            <h1>Something ran amuk, please try something else</h1>
          </div>
        </div>
      </Page>
    );
  }
}

export default ErrorPage;
