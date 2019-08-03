import React from 'react';
import './browse.scss';

import smoothscroll from 'smoothscroll-polyfill';

import Page from '../page/page';
import Header from '../header/header';
import ContentGrid from '../contentgrid/contentgrid';
import GradientBg from '../gradientbg/gradientbg';

const skills = [
  {
    title: "Technologies",
    items: [
      "HTML5",
      "CSS2/3",
      "Sass",
      "JavaScript",
      "React",
      "Ruby",
      "MongoDB",
      "Canvas",
      "jQuery",
      "Backbone",
      "Gulp",
      "Phaser",
      "npm",
      "Social APIs",
      "Git"
    ]
  },

  {
    title: "Additional Skills",
    items: [
      "Rapid Prototyping",
      "Interaction Design",
      "IA/UX",
      "Wireframes",
      "Responsive Design",
      "Graphic Design",
      "Agile Methodology",
      "Sketch",
      "Illustrator",
      "Photoshop",
      "InDesign",
      "Painting",
      "Branding",
      "Drawing & Illustration"
    ]
  }
];

class Browse extends React.Component {
  constructor() {
    super();

    this.firstSection = React.createRef();
    this.handleScrollDown = this.handleScrollDown.bind(this);
  }

  render() {
    return (
      <Page {...this.props}>
        <GradientBg />
        <div className="browse">
          <div className="header content-container fill-screen">
            <Header checkVisibility />
            <div className="arrow" onClick={this.handleScrollDown}></div>
          </div>

          <div className="content-container skip-padding" ref={this.firstSection}>
            <ContentGrid />
          </div>

          <div className="content-container skills">
            <div className="content-wrapper">
              <div className="section-wrapper">
                {skills.map((skill, i) => (
                  <div className="section" key={i}>
                    <h5>{skill.title}</h5>
                    <div className="items">
                      {skill.items.map((item, j) => (
                        <p key={j}>{item}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="about content-container fill-screen">
            <div className="content">
              <p>I made my debut as an artist with "Thanksgiving is Yummy" (Crayola on loose leaf 8.5" by 11"), featured in the kindergarten parent newsletter. This first piece was just one of many, and culminated in getting my BA in Painting and Design at USC's Roski School of Fine Arts.</p>
              <p>My zealous for design transitioned into UI &amp; UX, and rapid protopying quickly grew into full-fledged web development. Today, I'm a UX/UI Engineer at Apple.</p>
              <p>As a developer, I love puzzle-solving, and take a mobile-first, responsive approach in design and code. I get most excited by bringing pages to life with dynamic, performant, and configurable interactions. Daily languages include Javascript, HTML, CSS, and frameworks/libraries including React, Node, MongoDB, and Sass.</p>
              <p>When I'm not tinkering with code, you can find me lounging with my pet rabbit, or wandering the mountains in pursuit of the Milky Way.</p>
            </div>
          </div>
        </div>
      </Page>
    );
  }

  handleScrollDown() {
    const firstSectionEl = this.firstSection.current;
    firstSectionEl.scrollIntoView({ behavior: 'smooth' });
    smoothscroll.polyfill();
  }
}

export default Browse;
