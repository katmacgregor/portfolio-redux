import React from 'react';

import { connect } from 'react-redux';

import IndexToggle from './indextoggle/indextoggle';

import './paging.scss';

// import Page from '../page/page';
// import Asset from './asset/asset';

const findIndex = (key, array) => {
  for (let i=0; i < array.length; i++) {
    if (array[i].folder === key) {
      return i;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.portfolio.items
  }
};

class Paging extends React.Component {
  render() {
    const { items, currItem } = this.props;
    const currIndex = findIndex(currItem, items);
    const numItems = items.length;
    const prevIndex = ((currIndex - 1) < 0) ? (numItems - 1) : (currIndex - 1);
    const nextIndex = ((currIndex + 1) >= numItems) ? 0 : (currIndex + 1);
    const prevItem = items[prevIndex];
    const nextItem = items[nextIndex];

    return (
      <div className="paging">
        <IndexToggle
          title={prevItem && prevItem.name}
          path={prevItem && prevItem.class}
          handlerFromParent={this.handleSelect}
          index={prevItem && prevIndex}
          hideTitle={this.props.hideTitle}
          direction="left"
        />
        <IndexToggle
          title={nextItem && nextItem.name}
          path={nextItem && nextItem.class}
          handlerFromParent={this.handleSelect}
          index={nextItem && nextIndex}
          hideTitle={this.props.hideTitle}
          direction="right"
        />
      </div>
    );
  }
}


Paging = connect(
  mapStateToProps
)(Paging);

export default Paging;
