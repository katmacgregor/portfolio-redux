import React from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import './contentthumb.scss';

class ContentThumb extends React.Component {
  render() {
    const { item } = this.props;

    return (
      <div className={classNames('content-item', `item-${item.class}`)}>
        <Link to={`/${item.class}`} className={classNames('item', 'skip-link-style')} alt="{{item.name}}">
          <div className="item">
            <div className="wrapper">
              <div className="thumb" style={{backgroundImage: `url('${process.env.PUBLIC_URL}/images/content/${item.folder}/port_hp_icons_${item.class}.svg')` }}>
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
}


export default ContentThumb;
