import React from 'react';

import { connect } from 'react-redux';

import * as utilities from '../../../shared/utilities';

import classNames from 'classnames/bind';
import './asset.scss';

import ImageAsset from './imageasset/imageasset';

const mapStateToProps = (state) => {
  return {
    device: state.app.device
  }
};

class Asset extends React.Component {
  constructor() {
    super();

    this.state = {
      playing: false,
      ticking: false
    };

    this.videoEl = React.createRef();
    this.setImageVisibility = this.setImageVisibility.bind(this);
    this.imageLoaded = this.imageLoaded.bind(this);
  }

  componentDidMount() {
    this.setImageVisibility();

    window.addEventListener('scroll', this.setImageVisibility);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.setImageVisibility);
  }

  render() {
    const { image, path, banner } = this.props;
    const imageWrapper = (
      <div className="image-wrapper">
        <div className="aspect">
          {image.video && (
            <video
              src={`${process.env.PUBLIC_URL}/images/content/${path}/${image.video.src}.mp4`}
              controls={image.video.controls}
              loop={image.video.loop}
              alt={image.alt}
              poster={`${process.env.PUBLIC_URL}/images/content/${path}/${image.video.src}.jpg`}
              ref={this.videoEl}>
            </video>
          )}
          {!image.video && (
            <ImageAsset
              src={`${process.env.PUBLIC_URL}/images/content/${path}/${image.src}`}
              alt={image.alt}
              handlerFromParent={this.imageLoaded}
            />
          )}
        </div>
      </div>
    );

    return (
      <div className={classNames('asset', [image.classes], {'has-video': image.video, 'has-caption': image.caption, 'banner': banner })}>
        {image.heading && (
          <div className="section-header">
            <h2 className="section-title">{image.heading.title}</h2>
            {image.heading.desc && (
              <div>
                {image.heading.desc.href && <a className="section-desc" href={image.heading.desc.href} target="_blank" rel="noopener noreferrer">{image.heading.desc.title}</a>}
                {!image.heading.desc.href && <p className="section-desc">{image.heading.desc.title}</p>}
              </div>
            )}
          </div>
        )}
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
    const el = this.videoEl.current;

    if((this.props.device === 'desktop') && el && !this.state.ticking) {
      window.requestAnimationFrame(() => {
        const isVisible = utilities.checkVisibility(el);

        if(isVisible){
          if(!this.state.playing){
            el.play();
            this.setState({ playing: true });
          }
        } else{
          if(this.state.playing){
            el.pause();
            this.setState({ playing: false });
          }
        }

        this.setState({ ticking: false });
      });

      this.setState({ ticking: true });
    }
  }

  imageLoaded(loaded) {
    this.props.imageLoaded && this.props.imageLoaded(loaded);
  }
}

Asset = connect(
  mapStateToProps
)(Asset);

export default Asset;
