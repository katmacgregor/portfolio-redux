import React from 'react';
import classNames from 'classnames/bind';
import './connect.scss';

const connectItems = [
  {
    id: "contact",
    link: "mailto:hello@katrinamacgregor.com",
    title: "Contact"
  },
  {
    id: "linkedin",
    link: "http://us.linkedin.com/in/katrinamacgregor",
    title: "LinkedIn"
  },
  {
    id: "github",
    link: "https://github.com/katmacgregor",
    title: "Github"
  },
  {
    id: "codepen",
    link: "http://codepen.io/katmacgregor/",
    title: "Code Pen"
  },
  {
    id: "resume",
    link: `${process.env.PUBLIC_URL}/images/KMacGregor_resume_web.pdf`,
    title: "Resume"
  }
];

const Connect = ({size}) => (
  <div className={classNames('connect', {[`icons-${size}`]: size})}>
    {connectItems.map((item, i) => (
      <a href={item.link} title={item.title} className="skip-link-style" key={i}>
        <span className={classNames('icon', [item.id])} />
      </a>
    ))}
  </div>
);

export default Connect;
