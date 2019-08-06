import React, { Component } from 'react';

import Loading from '../../../loading/loading';

import classNames from 'classnames/bind';
import './imageasset.scss';

class ImageAsset extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false
    }

    this.handleImageLoaded = this.handleImageLoaded.bind(this);
  }

  render() {
    const {animate, src, alt, className, fixedRatio, skipBg} = this.props;

    return (
      <div className={classNames("image-asset-root", {"animate": animate, "loaded": this.state.loaded, "aspect": fixedRatio, [fixedRatio]: fixedRatio, "skip-bg": skipBg }, className)}>
        {animate && <Loading absolute pause={this.state.loaded} className="loading" />}
        <img
          src={src}
          onLoad={this.handleImageLoaded}
          alt={alt || ''}
        />
      </div>
    );
  }

  handleImageLoaded(e) {
    if(!this.state.loaded) {
      this.setState({loaded: true});
    }

    if(this.props.handlerFromParent) {
      if(this.props.src) {
        this.props.handlerFromParent(true);
      }
    }
  }
}

export default ImageAsset;
