import React from 'react';

import { connect } from 'react-redux';
import * as ACTIONS from './detail-actions';

import * as utilities from '../../shared/utilities';

import './detail.scss';

import Page from '../page/page';
import Paging from '../paging/paging';
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
        <Page {...this.props}>
          <div className="detail">
            <div className="content-container skip-padding">
              <div className="banner-container">
                {item.banner && (
                  <Asset image={item.banner} path={item.path} banner />
                )}
                <div className="content-header">
                  <h1 className="project title">{item.name}</h1>
                  {item.link && item.link.title && (
                    <a className="link" href={item.link.href} target="_blank" rel="noopener noreferrer">
                      <span>{item.link.title}</span>
                    </a>
                  )}
                </div>
              </div>
              <div className="content-info">
                <div className="desc" dangerouslySetInnerHTML={{__html: item.description }} />

                <div className="meta-container">
                  {item.date && (
                    <div className="date-container">
                      <h6 className="heading">Date</h6>
                      <span>{item.date}</span>
                    </div>
                  )}

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
              </div>
              <div className="images">
                {item.images && item.images.map((image, i) => (
                  <Asset image={image} path={item.path} key={i}/>
                ))}
              </div>
            </div>
            <Paging currItem={item.path} />
          </div>
        </Page>
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
