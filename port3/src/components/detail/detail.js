import React from 'react';

import { connect } from 'react-redux';
import * as ACTIONS from './detail-actions';

import * as utilities from '../../shared/utilities';

import classNames from 'classnames/bind';
import './detail.scss';

import Asset from './asset/asset';

const mapStateToProps = (state) => {
  return {
    item: state.portfolio.active
  }
};

class Detail extends React.Component {
  componentDidMount() {
    const item = this.props.match.path;
    const path = `${process.env.PUBLIC_URL}/portfolio/${item}.json`;
    const that = this;

    const success = (data) => {
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
                <a className="link" href={item.link.href} target="_blank" rel="noopener noreferrer">
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
                      <li key={i}>{tool}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="images">
              {item.images && item.images.map((image, i) => (
                <Asset image={image} path={item.path} key={i}/>
              ))}
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}


Detail = connect(
  mapStateToProps,
  ACTIONS
)(Detail);

export default Detail;
