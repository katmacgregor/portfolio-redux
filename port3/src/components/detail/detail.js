import React from 'react';

import { connect } from 'react-redux';
import * as ACTIONS from './detail-actions';

import * as utilities from '../../shared/utilities';

import classNames from 'classnames/bind';
import './detail.scss';

const mapStateToProps = (state) => {
  return {
    item: state.portfolio.active
  }
};

class Detail extends React.Component {
  constructor() {
    super();

    this.setImage = this.setImage.bind(this);
  }
  componentDidMount() {
    const item = this.props.match.path;
    const path = `${process.env.PUBLIC_URL}/portfolio/${item}.json`;
    const that = this;

    const success = (data) => {
      console.log(data);
      that.props.setItem(data);
    }


    utilities.handleFetch(path, success);
  }

  render() {
    const { item } = this.props;
    if(item) {
      return (
        <div className="detail">
          <div className="content-container">
            <div className="content-header">
              <h2 className="project title">{item.name}</h2>
              {item.link && item.link.title && (
                <a className="link" href={item.link.href} target="_blank">
                  <span>{item.link.title}</span>
                </a>
              )}
            </div>
            <div className="content-info">
              <div className="desc" dangerouslySetInnerHTML={{__html: item.description }} />

              <div className="tools-container">
                <h6 className="heading">Tools</h6>
                {item.tools && (
                  <ul className="tools">
                    {item.tools.map((tool, i) => (
                      <li>{tool}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="images">
              {item.images && item.images.map(this.setImage)}
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  setImage(image, i) {
    const { item } = this.props;
    const imageWrapper = (
      <div className="image-wrapper">
        <div className="aspect">
          {image.video && (
            <video src={`${process.env.PUBLIC_URL}/images/content/${item.path}/${image.video.src}.mp4`} autoPlay controls={image.video.controls} loop={image.video.loop} alt={image.alt} poster={`images/${item.path}/${image.video.src}.jpg`}></video>
          )}
          {!image.video && (
            <img src={`${process.env.PUBLIC_URL}/images/content/${item.path}/${image.src}`} alt={image.alt} />
          )}
        </div>
      </div>
    );

    return (
      <div className={classNames('content', [image.classes], {'has-video': image.video, 'has-caption': image.caption})} key={i}>
        <div className="content-wrapper">
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
}


Detail = connect(
  mapStateToProps,
  ACTIONS
)(Detail);

export default Detail;
