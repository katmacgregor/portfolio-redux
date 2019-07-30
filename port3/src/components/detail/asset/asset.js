import React from 'react';

// import { connect } from 'react-redux';
// import * as ACTIONS from './detail-actions';

import * as utilities from '../../../shared/utilities';

import classNames from 'classnames/bind';
import './asset.scss';

class Asset extends React.Component {
  constructor() {
    super();

    this.state = {
      playing: false
    };

    this.videoEl = React.createRef();
    this.setImageVisibility = this.setImageVisibility.bind(this);
  }

  componentDidMount() {
    this.setImageVisibility();

    window.addEventListener('scroll', this.setImageVisibility);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.setImageVisibility);
  }

  render() {
    const { image, path } = this.props;
    const imageWrapper = (
      <div className="image-wrapper">
        <div className="aspect">
          {image.video && (
            <video src={`${process.env.PUBLIC_URL}/images/content/${path}/${image.video.src}.mp4`} controls={image.video.controls} loop={image.video.loop} alt={image.alt} poster={`images/${path}/${image.video.src}.jpg`} ref={this.videoEl}></video>
          )}
          {!image.video && (
            <img src={`${process.env.PUBLIC_URL}/images/content/${path}/${image.src}`} alt={image.alt} />
          )}
        </div>
      </div>
    );

    return (
      <div className={classNames('asset', [image.classes], {'has-video': image.video, 'has-caption': image.caption})}>
        <div className="asset-wrapper">
          <div className="image">
            {image.link && (
              <a href={image.link} target="_blank" rel="noopener noreferrer">
                {imageWrapper}
              </a>
            )}
            {!image.link && imageWrapper}
          </div>
          {image.caption && <div className="caption" dangerouslySetInnerHTML={{__html: image.caption }}/> }
        </div>
      </div>
    );
  }

  setImageVisibility() {
    const videoEl = this.videoEl.current;

    if(videoEl){
      const isVisible = utilities.checkVisibility(videoEl);

      if(isVisible){
        if(!this.state.playing){
          videoEl.play();
          this.setState({ playing: true });
        }
      } else{
        if(this.state.playing){
          videoEl.pause();
          this.setState({ playing: false });
        }
      }
    }
  }
}

export default Asset;
