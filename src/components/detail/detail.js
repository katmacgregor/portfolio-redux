import React from 'react';

import { connect } from 'react-redux';
import * as ACTIONS from './detail-actions';

import * as utilities from '../../shared/utilities';

import classNames from 'classnames/bind';
import './detail.scss';

import Page from '../page/page';
import Paging from '../paging/paging';
import Asset from './asset/asset';
import Loading from '../loading/loading';

const mapStateToProps = (state) => {
  const { portfolio } = state;
  return {
    item: portfolio.active,
    itemChanging: portfolio.itemChanging
  }
};

class Detail extends React.Component {
  constructor () {
    super();

    this.state = {
      imagesLoaded: false
    }

    this.handleImageLoaded = this.handleImageLoaded.bind(this);
  }

  componentDidMount() {
    const item = this.props.match.path;
    const path = `${process.env.PUBLIC_URL}/portfolio/${item}.json`;
    const that = this;

    const success = (data) => {
      that.props.setItem(data);
    }


    utilities.handleFetch(path, success);
  }

  componentDidUpdate(prevProps) {
    if((this.props.item && this.props.item.path) !== (prevProps.item && prevProps.item.path)) {
      if(this.state.imagesLoaded) {
        this.setState({ imagesLoaded: false });
      }
    }
  }

  render() {
    const { item } = this.props;

    return (
      <Page {...this.props}>
        <div className={classNames("detail", { "item-ready": !this.props.itemChanging && this.state.imagesLoaded })}>
          {item && (
            <React.Fragment>
              <div className="content-container skip-padding">
                <div className="banner-container">
                  {item.banner && (
                    <Asset image={item.banner} path={item.path} banner imageLoaded={this.handleImageLoaded} />
                  )}
                  <div className="content-header">
                    <h1 className="project title">{item.name}</h1>
                    {item.link && item.link.title && (
                      <a className="link" href={item.link.href} target="_blank" rel="noopener noreferrer">
                        <span>{item.link.title}</span>
                      </a>
                    )}
                  </div>

                  {!this.state.imagesLoaded && <Loading absolute />}
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
                    <Asset image={image} path={item.path} key={i} />
                  ))}
                </div>
              </div>
              <Paging currItem={item.path} />
            </React.Fragment>
          )}
        </div>
      </Page>
    );
  }

  handleImageLoaded(loaded) {
    if(loaded && !this.state.imagesLoaded) {
      this.setState({ imagesLoaded: true });
    }
  }
}

Detail = connect(
  mapStateToProps,
  ACTIONS
)(Detail);

export default Detail;
