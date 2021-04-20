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
      "JavaScript",
      "Sass",
      "CSS2/3",
      "React",
      "SwiftUI",
      "Ruby",
      "MongoDB",
      "Canvas",
      "Backbone",
      "npm",
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
      "Sketch",
      "Illustrator",
      "Photoshop",
      "InDesign",
      "Branding",
      "Painting",
      "Illustration"
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
              <p>I made my debut as an artist with "Thanksgiving is Yummy" (Crayola on loose leaf 8.5" by 11"), featured in the kindergarten parent newsletter. Art and I made it official at USC's Roski School of Fine Arts with a BA in Painting and Design.</p>
              <p>My zeal for design expanded to include a dedication to user experience, and I taught myself code to bring those experiences to life. I dedicated many years to web app development and storytelling, leading the design translation and front-end development efforts on sites such as <a href="https://www.starwars.com/">StarWars.com</a> and <a href="https://www.disney.com/">Disney.com</a>. Today, I employ a combination of creative strategy and development prototyping as a UX Engineer at Apple. </p>
              <p>I love puzzle-solving, and take a mobile-first, responsive approach in design and code. I am passionate about rapidly prototyping and iterating user experiences, and find joy in microinteractions. My most utilized languages include Javascript, HTML, CSS, and frameworks/libraries including React, Node, MongoDB, Sass, and SwiftUI.</p>
              <p>When I'm not tinkering with code, you can find me trying to pick up a new outdoor hobby, or in pursuit of the tastiest bowl of ramen.</p>
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
