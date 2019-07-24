import React from 'react';
import './browse.scss';

import Header from '../header/header';
import Connect from '../connect/connect';

class Browse extends React.Component {
  render() {
    return (
      <div className="browse">
        <a name="top"></a>

        <div className="header content-container header fill-screen skip-padding">
          <div className="content">
            <Header h1="Katrina MacGregor" subheader="hi" header="i'm katrina" />
            <Connect size="large" />
          </div>
          <div className="arrow"></div>
        </div>

        <div className="about content-container fill-screen">
          <div className="content">
            <p>I made my debut as an artist with "Thanksgiving is Yummy" (Crayola on loose leaf 8.5" by 11"), featured in the kindergarten parent newsletter. This marked the dawn of my creative exploits, which evenutally lead to receiving my BA in Painting and Design from USC's Roski School of Fine Arts.</p>
            <p>My career hopped in a natural progression from design into UI &amp; UX, and I eventually built up my rapid prototyping skillset to lead to my current position in web development as a Lead Software Engineer at Disney Interactive.</p>
            <p>As a developer, I translate my passion for art and design into clean, responsive code. Daily languages include Javascript, Ruby, HTML, CSS, and libraries including Backbone, Underscore, Nunjucks, and Sass.</p>
            <p> When I'm not tinkering with code, you can find me doting on my pet rabbit, or wandering the mountains in pursuit of the Milky Way.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Browse;
