import React from 'react';
import './browse.scss';

import smoothscroll from 'smoothscroll-polyfill';

import Header from '../header/header';
import Connect from '../connect/connect';
import ContentGrid from '../contentgrid/contentgrid';

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

  handleScrollDown() {
    const firstSectionEl = this.firstSection.current;
    firstSectionEl.scrollIntoView({ behavior: "smooth" });
    smoothscroll.polyfill();
  }

  render() {
    return (
      <div className="browse">
        <a name="top"></a>

        <div className="header content-container header fill-screen skip-padding">
          <div className="content">
            <Header h1="Katrina MacGregor" subheader="hi" header="i'm katrina" />
            <Connect size="large" />
          </div>
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
            <p>I made my debut as an artist with "Thanksgiving is Yummy" (Crayola on loose leaf 8.5" by 11"), featured in the kindergarten parent newsletter. This marked the dawn of my creative exploits, which evenutally lead to receiving my BA in Painting and Design from USC's Roski School of Fine Arts.</p>
            <p>My career hopped in a natural progression from design into UI &amp; UX, and I eventually built up my rapid prototyping skillset to lead to my current position in web development as a Software Engineer at Apple.</p>
            <p>As a developer, I translate my passion for art and design into responsive code and interactive web elements. Daily languages include Javascript, HTML, CSS, and frameworks/libraries including React, Node, MongoDB, and Sass.</p>
            <p> When I'm not tinkering with code, you can find me doting on my pet rabbit, or wandering the mountains in pursuit of the Milky Way.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Browse;
