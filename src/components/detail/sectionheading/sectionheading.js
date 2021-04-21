import React from 'react';
import classNames from 'classnames/bind';
import './sectionheading.scss';

const SectionHeading = ({header}) => {
  if(header) {
    return (
      <div className="section-header">
        <h2 className="section-title">{header.title}</h2>
        {header.desc && (
          <div className="section-desc-wrapper">
            {header.desc.href && <a className="section-desc" href={header.desc.href} target="_blank" rel="noopener noreferrer">{header.desc.title}</a>}
            {!header.desc.href && <p className="section-desc">{header.desc.title}</p>}
          </div>
        )}
      </div>
    );
  } else {
    return null;
  }
};

export default SectionHeading;
