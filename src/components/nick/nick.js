import React from 'react';

import './nick.scss';


class NickPage extends React.Component {
  constructor () {
    super();
  }

  render() {
    return (
      <img
        class="nick hide-footer"
        src={`${process.env.PUBLIC_URL}/images/hp/nick.gif.webp`}
      />
    );
  }
}

export default NickPage;
