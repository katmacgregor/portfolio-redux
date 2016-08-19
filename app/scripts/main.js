'use strict';

$(document).ready(function() {
  var $body = $('body'),
      $home = $('body.home'),
      $document = $(document),
      $container = $('.content-container'),
      $topButton = $('#top'),
      initialBrowserHeight = $(window).height();

  $('.main-container').addClass('loaded');

  processTimeOfDay();

  $topButton.click(scrollToTop);

  // Query Time of Day
  setTimeQuery();

  // scrollTop Menu
  $document.scroll(setFixedHeader);

  $('.home .main-container .arrow').click(function(){
    $('html, body').animate({ scrollTop: initialBrowserHeight });
  });


  //------
  // functions

  function scrollToTop () {
    $('html, body').animate({ scrollTop: '0' });
    $container.removeClass('active');

    $(this).removeClass('visible');
  }

  function setFixedHeader () {
    $home.toggleClass('fixed', $document.scrollTop() >= initialBrowserHeight);
    $home.toggleClass('scrolled', $document.scrollTop() > 0);

    $topButton.removeClass('visible');
    $topButton.addClass('visible');
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
