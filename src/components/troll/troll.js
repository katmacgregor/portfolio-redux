import React from 'react';

// import './troll.scss';

class TrollPage extends React.Component {
  constructor () {
    super();
  }

  render() {
    return (
      <video
        class="nick hide-footer"
        src={`${process.env.PUBLIC_URL}/images/hp/trolls_crop.mov`}
        autoplay
        muted
        controls
        loop
        >
      </video>
    );
  }
}

export default TrollPage;
