import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import * as ACTIONS from './contentthumb-actions';

import classNames from 'classnames/bind';
import './contentthumb.scss';

const mapStateToProps = (state) => {
  const { portfolio } = state;
  return {
    itemActive: portfolio.active
  }
};

class ContentThumb extends React.Component {
  constructor() {
    super();

    this.handleItemChange = this.handleItemChange.bind(this);
  }

  render() {
    const { item } = this.props;

    return (
      <div className={classNames('content-item', `item-${item.class}`)}>
        <Link to={`/${item.class}`} className={classNames('item', 'skip-link-style')} alt="{{item.name}}" onClick={this.handleItemChange}>
          <div className="item">
            <div className="wrapper">
              <div className="thumb">
                <div className="aspect">
                  <div className="icon" style={{backgroundImage: `url('${process.env.PUBLIC_URL}/images/content/${item.folder}/port_hp_icons_${item.class}.svg')` }}></div>
                </div>
              </div>
              <div className="content-info" style={{backgroundImage: `url('${process.env.PUBLIC_URL}/images/content/${item.folder}/${item.main_image && item.main_image.src}')`}}>
                <div className="text">
                  <h2 className="project">{item.name}</h2>
                  <div className="content-desc" dangerouslySetInnerHTML={{__html: item.description }}></div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  handleItemChange() {
    if((this.props.item && this.props.item.name) !== (this.props.itemActive && this.props.itemActive.name)) {
      this.props.setItemChange();
    }
  }
}

ContentThumb = connect(
  mapStateToProps,
  ACTIONS
)(ContentThumb);

export default ContentThumb;
