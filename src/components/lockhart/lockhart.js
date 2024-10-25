import React from 'react';

import './lockhart.scss';


class LockhartPage extends React.Component {
  constructor () {
    super();
  }

  render() {
    return (
      <div class="lockhart hide-footer">
      <img
        src={`${process.env.PUBLIC_URL}/images/hp/lockhart.gif`}
      />
      </div>
    );
  }
}

export default LockhartPage;
