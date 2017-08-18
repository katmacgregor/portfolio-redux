'use strict';

$(document).ready(function() {

  var $html = $('html'),
      $body = $('body'),
      $home = $('body.home'),
      $document = $(document),
      $container = $('.content-container'),
      $topButton = $('#top'),
      $homeTop = $('body.home .header.nav .title'),
      initialBrowserHeight = $('.content-container.header').height(),
      isTouch = 'ontouchstart' in document.documentElement;

  if(isTouch){
    $html.addClass('touch');
  } else{
    $html.addClass('no-touch');
  }

  $body.addClass('loaded');

  var $portfolioImage = $('.portfolio-page .images .image');

  // checkVisibility

  var scrolled,
      lastScrollTop = 0,
      navHeight = 40,
      navbarHeight = $('.header').outerHeight();

  $document.scroll( debounce( function() {
    scrolled = true;
    setImageVisibility($portfolioImage);
  }, 250));

  setInterval( function() {
    if(scrolled){
      hasScrolled();
      scrolled = false;
    }
  }, 250);

  // scroll down to content
  $('.home .main-container .arrow').click( function() {
    $('html, body').animate({ scrollTop: initialBrowserHeight });
  });

  // scroll back to top
  $topButton.click(scrollToTop);
  $homeTop.click(scrollToTop);


  // Set time of day styling
  processTimeOfDay();

  // Query Time of Day
  setTimeQuery();


  //------
  // functions

  function scrollToTop () {
    $('html, body').animate({ scrollTop: '0' });
    $container.removeClass('active');

    $(this).removeClass('visible');
  }

  function hasScrolled() {
    var scrollTop = $document.scrollTop();

    // Make sure they scroll more than navHeight
    if(Math.abs(lastScrollTop - scrollTop) <= navHeight){ return; }

    $home.toggleClass('fixed', $document.scrollTop() >= initialBrowserHeight);
    $body.toggleClass('scrolled', $document.scrollTop() > 0);

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if(scrollTop > lastScrollTop && scrollTop > navbarHeight){
      $body.removeClass('nav-show');
    }
    else if(scrollTop > lastScrollTop || ($body.hasClass('home') && scrollTop <= navHeight)){
      // Scroll Down or at top
      $body.removeClass('nav-show');
    } else{
      // Scroll Up
      if((scrollTop + $(window).height() < $document.height())) {
        $body.addClass('nav-show');
      }
    }

    lastScrollTop = scrollTop;
  }

  function setImageVisibility ($el) {
    // console.log($el.find('video'));
    $el.each(function (){
      var $that = $(this),
          isVisible = checkVisibility(this),
          videoEl = $that.find('video')[0];


      if(videoEl){
        // only trigger if the state needs to change
        var paused = videoEl.dataset.paused === 'true' ? true : false;

        if(isVisible){
          if(paused){
            videoEl.play();
            videoEl.dataset.paused = false;
          }
        } else{
          if(!paused){
            videoEl.pause();
            videoEl.dataset.paused = true;
          }
        }
      }
    });
  }

  function setTimeOfDay (time) {
    var supplementalTime = (time === 'day' || time === 'afternoon') ? 'day' : 'night';
    $body.addClass(time + ' ' + supplementalTime);
  }

  function processTimeOfDay () {
    var currentTime = new Date().getHours();

    if ((currentTime >= 0) && (currentTime < 5)) {
      setTimeOfDay('midnight');
    }
    if ((currentTime >= 5) && (currentTime < 12)) {
      setTimeOfDay('day');
    }
    if ((currentTime >= 12) && (currentTime < 16)) {
      setTimeOfDay('afternoon');
    }
    if ((currentTime >= 16) && (currentTime < 20)) {
      setTimeOfDay('evening');
    }
    if ((currentTime >= 20 ) && (currentTime < 24)) {
      setTimeOfDay('night');
    }
  }

  function setTimeQuery () {
    var currHref = window.location.href,
      hasQuery = currHref.indexOf('=') !== -1,
      query = hasQuery && currHref.split('=')[1];

    if(hasQuery){
      $body.removeClass('night day afternoon evening midnight');

      switch(query){
        case 'night':
          setTimeOfDay('night');
          break;
        case 'evening':
          setTimeOfDay('evening');
          break;
        case 'midnight':
          setTimeOfDay('midnight');
          break;
        case 'afternoon':
          setTimeOfDay('afternoon');
          break;
        default:
          setTimeOfDay('day');
      }
    }
  }
});


// ------
// HELPER FUNCTIONS

// check if an element is in the viewport
function checkVisibility(el) {
  var rect = el.getBoundingClientRect();

  return rect.bottom > 0 &&
      rect.right > 0 &&
      rect.left < (window.innerWidth || $(window).width()) &&
      rect.top < (window.innerHeight || $(window).height());
}

// Underscore

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if(!immediate){ func.apply(context, args); }
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if(callNow){ func.apply(context, args); }
  };
}
