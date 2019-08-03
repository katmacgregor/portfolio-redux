import React from 'react';

import classNames from 'classnames/bind';
import './contentgrid.scss';

import { connect } from 'react-redux';

import ContentThumb from './contentthumb/contentthumb';

const mapStateToProps = (state) => {
  return {
    items: state.portfolio.items
  }
};

class ContentGrid extends React.Component {
  render() {
    const { className, items } = this.props;
    return (

      <div className={classNames("content-container-grid", className)}>
        {items.map((project, i) => (
          <ContentThumb item={project} key={i}/>
        ))}
      </div>
    );
  }
}

ContentGrid = connect(
  mapStateToProps
)(ContentGrid);

export default ContentGrid;
