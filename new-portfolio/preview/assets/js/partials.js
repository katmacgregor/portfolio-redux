// Shared by both <site-nav> and <site-footer> so the same Work/Resume/
// About/Contact links (and the same base-path handling for pages one
// level down, like work/*.html) only have to be defined once.
function navLinks(base) {
  return (
    '<div class="nav__links">' +
      '<a class="link-border" href="' + base + 'index.html#work">Work</a>' +
      '<a class="link-border" href="' + base + 'index.html#contact">Contact</a>' +
      '<a class="link-border" href="' + base + 'assets/KMacGregor_resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>' +
    '</div>'
  );
}

class SiteNav extends HTMLElement {
  connectedCallback() {
    var base = this.getAttribute('base') || '';
    var links =
      '<a class="nav__logo" href="' + base + 'index.html">Katrina MacGregor</a>' +
      navLinks(base);

    this.innerHTML =
      '<div class="nav wrap-width">' + links + '</div>' +
      '<div class="nav-mini-bar" id="mini-nav">' +
        '<div class="nav wrap-width">' + links + '</div>' +
      '</div>';

    var bar = this.querySelector('#mini-nav');
    var lastY = window.scrollY;
    var threshold = 140;
    var ticking = false;

    function onScroll() {
      var currentY = window.scrollY;
      if (currentY < threshold) {
        bar.classList.remove('is-visible');
      } else if (currentY < lastY) {
        bar.classList.add('is-visible');
      } else if (currentY > lastY) {
        bar.classList.remove('is-visible');
      }
      lastY = currentY;
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    }, { passive: true });
  }
}
customElements.define('site-nav', SiteNav);

class SiteFooter extends HTMLElement {
  connectedCallback() {
    var base = this.getAttribute('base') || '';
    var links =
      '<div class="nav__links">' +
        '<a class="link-border" href="' + base + 'assets/KMacGregor_resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>' +
        '<a class="link-border" href="http://us.linkedin.com/in/katrinamacgregor" target="_blank" rel="noopener noreferrer">LinkedIn</a>' +
        '<a class="link-border" href="https://github.com/katmacgregor" target="_blank" rel="noopener noreferrer">GitHub</a>' +
      '</div>';
    var footer =
      '<footer class="site-footer wrap-width">' +
        '<span class="copyright">&copy; 2026 Katrina MacGregor</span>' +
        '<button class="footer-top" type="button" aria-label="Back to top">' +
          '<svg viewBox="0 0 24 24" fill="none"><path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        '</button>' +
        links +
      '</footer>';

    this.innerHTML = footer;

    this.querySelector('.footer-top').addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
customElements.define('site-footer', SiteFooter);

document.addEventListener('DOMContentLoaded', function () {
  // Videos only play while actually in view, and pause otherwise.
  var videos = document.querySelectorAll('video');
  if (videos.length && 'IntersectionObserver' in window) {
    var videoObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var v = entry.target;
        if (entry.isIntersecting) {
          // A video with a loop-hold delay (see below) sits at its last
          // frame between loops instead of looping natively, so it can
          // report as "ended" here. Restart it from the top rather than
          // calling play() on a video parked at its own duration, which
          // most browsers just no-op.
          if (v.ended) v.currentTime = 0;
          v.play().catch(function () {});
        } else {
          v.pause();
        }
      });
    }, { threshold: 0.25 });
    videos.forEach(function (v) { videoObserver.observe(v); });
  }

  // Videos with data-loop-hold hold on their final frame for that many
  // milliseconds before looping, instead of cutting straight back to
  // frame one. Only restarts if the video is still on screen; if the
  // hold elapses while scrolled away, the observer above resumes it
  // (from frame one, per the v.ended check) next time it's back in view.
  // The restart itself fades out (through the dark media placeholder
  // background behind it), seeks, then fades back in, rather than
  // snapping straight to frame one.
  var holdVideos = document.querySelectorAll('video[data-loop-hold]');
  holdVideos.forEach(function (v) {
    v.removeAttribute('loop');
    v.classList.add('loop-hold-fade');
    v.addEventListener('ended', function () {
      var hold = parseInt(v.dataset.loopHold, 10) || 0;
      setTimeout(function () {
        var rect = v.getBoundingClientRect();
        var inView = rect.bottom > 0 && rect.top < window.innerHeight;
        if (!inView) return;
        v.classList.add('is-fading');
        setTimeout(function () {
          v.currentTime = 0;
          v.play().catch(function () {});
          v.classList.remove('is-fading');
        }, 400);
      }, hold);
    });
  });

  // Subtle fade/rise for media as it scrolls into view.
  var revealEls = document.querySelectorAll('.work-media, .work-media--pair, .gallery-entry, .work-entry, .extra-body img, .extra-body video');
  if (revealEls.length && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Inline <svg> work banners that animate (Disney Junior's day/night
  // sky, Creative Technology's looping logo mark, etc) only run while
  // scrolled into view, and stay paused for prefers-reduced-motion.
  // Handles both CSS keyframe animations (via the .is-paused class,
  // which main.css turns into animation-play-state: paused) and native
  // SMIL animations (via the SVG root's own pauseAnimations/
  // unpauseAnimations methods), since a given banner may use either or
  // both.
  var animatedSvgs = document.querySelectorAll('svg.svg-anim-gate');
  if (animatedSvgs.length) {
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    animatedSvgs.forEach(function (svg) {
      if (reduceMotion) {
        // CSS already disables the keyframe animations; pause any native
        // SMIL animations too so nothing moves for reduced-motion users.
        if (typeof svg.pauseAnimations === 'function') svg.pauseAnimations();
        return;
      }
      if (!('IntersectionObserver' in window)) return;
      var svgObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            svg.classList.remove('is-paused');
            if (typeof svg.unpauseAnimations === 'function') svg.unpauseAnimations();
          } else {
            svg.classList.add('is-paused');
            if (typeof svg.pauseAnimations === 'function') svg.pauseAnimations();
          }
        });
      }, { threshold: 0.2 });
      svgObserver.observe(svg);
    });
  }

  // Masonry row-spans for the Doodles page. .draw-grid is a real CSS
  // Grid (see main.css) so an item can span multiple columns, but Grid
  // has no native masonry row-packing: each item's grid-row-end has to
  // be set explicitly, sized to its own rendered height, or items would
  // all sit on one shared row height instead of tiling like Pinterest.
  // Recomputed on resize since narrower columns make taller renders.
  var drawGrid = document.querySelector('.draw-grid');
  if (drawGrid) {
    var MASONRY_ROW_UNIT = 1; // px; matches grid-auto-rows in main.css
    var MASONRY_ROW_GAP = 14; // px; matches each item's margin-bottom
    var sizeMasonryTimer;
    function sizeMasonryItems() {
      var items = drawGrid.children;
      for (var i = 0; i < items.length; i++) {
        var el = items[i];
        var span = Math.ceil((el.offsetHeight + MASONRY_ROW_GAP) / MASONRY_ROW_UNIT);
        el.style.gridRowEnd = 'span ' + span;
      }
    }
    sizeMasonryItems();
    // Width/height attributes give the browser an intrinsic ratio to
    // size against immediately, but re-measure once everything has
    // actually finished loading (and once more per item as each image/
    // video resolves) as a safety net against any that were off on the
    // first pass — a stale span leaves either a gap or an overlap.
    window.addEventListener('load', sizeMasonryItems);
    var mediaEls = drawGrid.querySelectorAll('img, video');
    mediaEls.forEach(function (el) {
      var evt = el.tagName === 'VIDEO' ? 'loadedmetadata' : 'load';
      el.addEventListener(evt, sizeMasonryItems);
    });
    window.addEventListener('resize', function () {
      clearTimeout(sizeMasonryTimer);
      sizeMasonryTimer = setTimeout(sizeMasonryItems, 150);
    });
  }

  // Easter eggs: links marked .portkey-link (e.g. the Hogwarts doodle,
  // which secretly leads to the real Harry Potter Halloween decor on
  // the craft page) get the same "portkey activating" launch
  // transition as the homepage word rotator's link to craft.html,
  // instead of a plain page swap. The class is added right before the
  // browser navigates; the matching animation lives in main.css/craft.css.
  document.querySelectorAll('a.portkey-link').forEach(function (a) {
    a.addEventListener('click', function () {
      document.documentElement.classList.add('portkey-launch');
    });
  });

  // Cmd+Right (Ctrl+Right on Windows/Linux) jumps to the next case study
  // from anywhere on a work/*.html page. Every one of those pages ends
  // with a .work-next link, so this quietly does nothing anywhere else.
  var nextLink = document.querySelector('.work-next');
  if (nextLink) {
    window.addEventListener('keydown', function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'ArrowRight') {
        e.preventDefault();
        window.location.href = nextLink.href;
      }
    });
  }

  // Doodles page: click an illustration to see it full-size in a
  // lightbox, built once here and reused for every trigger. The
  // portkey-link video is skipped since it already has its own click
  // behavior (a secret link to the craft page).
  var doodleGrid = document.querySelector('.draw-grid');
  if (doodleGrid) {
    var lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-hidden', 'true');
    lightbox.innerHTML =
      '<button class="lightbox__close" type="button" aria-label="Close">&times;</button>' +
      '<div class="lightbox__content"></div>';
    document.body.appendChild(lightbox);

    var lightboxContent = lightbox.querySelector('.lightbox__content');
    var lightboxClose = lightbox.querySelector('.lightbox__close');
    var lastFocused = null;

    function openLightbox(mediaEl) {
      lastFocused = document.activeElement;
      var clone = mediaEl.cloneNode(true);
      clone.removeAttribute('class');
      clone.removeAttribute('tabindex');
      if (clone.tagName === 'VIDEO') {
        clone.setAttribute('controls', '');
        clone.muted = true;
        clone.play().catch(function () {});
      }
      lightboxContent.innerHTML = '';
      lightboxContent.appendChild(clone);
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.classList.add('lightbox-locked');
      lightboxClose.focus();
      document.addEventListener('keydown', onLightboxKeydown);
    }

    function closeLightbox() {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('lightbox-locked');
      lightboxContent.innerHTML = '';
      document.removeEventListener('keydown', onLightboxKeydown);
      if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    }

    function onLightboxKeydown(e) {
      if (e.key === 'Escape') closeLightbox();
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    var lightboxTriggers = doodleGrid.querySelectorAll('img, video');
    lightboxTriggers.forEach(function (el) {
      if (el.closest('.portkey-link')) return;
      el.classList.add('lightbox-trigger');
      el.setAttribute('tabindex', '0');
      el.addEventListener('click', function () { openLightbox(el); });
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(el);
        }
      });
    });
  }
});
