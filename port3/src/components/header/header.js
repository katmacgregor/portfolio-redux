import React from 'react';
import './header.scss';

const Header = ({ h1, subheader, header }) => {
  return (
    <div className="header">
      <div className="title">
        <h1 className="hide">{h1}</h1>
        {subheader && <h3>{subheader},</h3>}{header && <h2> {header}.</h2>}
      </div>
    </div>
  );
};

export default Header;
