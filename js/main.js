/* ============================================
   ATableBooked — Main JavaScript
   Versie: 1.0
   ES5 — geen const/let/arrow/template literals

   Modules:
   1. Nav scroll effect
   2. Hover effecten (Safari-compatibel)
   3. Mobiel hamburger menu
   4. Scroll animaties (IntersectionObserver)
   5. Smooth anchor scroll
   6. Actieve nav highlight
   7. FAQ accordeon
   ============================================ */

(function () {

  /* ──────────────────────────────────
     HELPERS
     ────────────────────────────────── */

  function addHover(el, hoverClass) {
    if (!el) { return; }
    el.addEventListener('mouseenter', function () {
      el.classList.add(hoverClass || 'hover');
    });
    el.addEventListener('mouseleave', function () {
      el.classList.remove(hoverClass || 'hover');
    });
    el.addEventListener('mousedown', function () {
      el.classList.add('active');
    });
    el.addEventListener('mouseup', function () {
      el.classList.remove('active');
    });
  }

  function addHoverAll(selector, hoverClass) {
    var els = document.querySelectorAll(selector);
    var i;
    for (i = 0; i < els.length; i++) {
      addHover(els[i], hoverClass);
    }
  }

  /* ──────────────────────────────────
     1. NAV SCROLL EFFECT
     ────────────────────────────────── */

  function initNavScroll() {
    var nav = document.getElementById('nav');
    if (!nav) { return; }

    function onScroll() {
      if (window.pageYOffset > 20) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }


  /* ──────────────────────────────────
     2. HOVER EFFECTEN (Safari-safe)
     ────────────────────────────────── */

  function initHoverEffects() {

    /* Knoppen */
    addHoverAll('.btn-primary');
    addHoverAll('.btn-secondary');
    addHoverAll('.btn-outline-white');
    addHoverAll('.btn-ghost');

    /* Navigatie links */
    addHoverAll('.nav-link');
    addHoverAll('.nav-login');
    addHoverAll('.nav-logo');
    addHoverAll('.nav-mobile-link');

    /* Kaarten */
    addHoverAll('.card');
    addHoverAll('.pain-card');
    addHoverAll('.feature-card');
    addHoverAll('.pricing-card');

    /* Footer links */
    addHoverAll('.footer-link');
    addHoverAll('.footer-legal-link');
    addHoverAll('.footer-social-link');

    /* CTA contact items */
    addHoverAll('.cta-contact-item');

    /* FAQ vragen */
    addHoverAll('.faq-question');
  }


  /* ──────────────────────────────────
     3. MOBIEL HAMBURGER MENU
     ────────────────────────────────── */

  function initMobileMenu() {
    var hamburger = document.getElementById('nav-hamburger');
    var mobileMenu = document.getElementById('nav-mobile');
    var mobileLinks = document.querySelectorAll('[data-mobile-link]');
    var isOpen = false;

    if (!hamburger || !mobileMenu) { return; }

    function openMenu() {
      isOpen = true;
      mobileMenu.classList.add('open');
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      hamburger.setAttribute('aria-label', 'Menu sluiten');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      isOpen = false;
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Menu openen');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', function () {
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    /* Sluit bij klik op een link */
    var i;
    for (i = 0; i < mobileLinks.length; i++) {
      mobileLinks[i].addEventListener('click', function () {
        closeMenu();
      });
    }

    /* Sluit bij klik buiten menu */
    mobileMenu.addEventListener('click', function (e) {
      if (e.target === mobileMenu) {
        closeMenu();
      }
    });

    /* Sluit bij Escape toets */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
        hamburger.focus();
      }
    });

    /* Hover op mobiele links */
    addHoverAll('.nav-mobile-link');
  }


  /* ──────────────────────────────────
     4. SCROLL ANIMATIES
        IntersectionObserver
     ────────────────────────────────── */

  function initScrollAnimations() {

    /* Controleer of IntersectionObserver
       beschikbaar is (Safari 12.1+) */
    if (!('IntersectionObserver' in window)) {
      /* Fallback: direct zichtbaar maken */
      var fallbackEls = document.querySelectorAll(
        '.fade-up, .fade-in, .fade-left, .fade-right'
      );
      var fi;
      for (fi = 0; fi < fallbackEls.length; fi++) {
        fallbackEls[fi].classList.add('visible');
      }
      return;
    }

    var observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.12
    };

    var observer = new IntersectionObserver(
      function (entries) {
        var ei;
        for (ei = 0; ei < entries.length; ei++) {
          if (entries[ei].isIntersecting) {
            entries[ei].target.classList.add('visible');
            observer.unobserve(entries[ei].target);
          }
        }
      },
      observerOptions
    );

    var animatedEls = document.querySelectorAll(
      '.fade-up, .fade-in, .fade-left, .fade-right'
    );
    var ai;
    for (ai = 0; ai < animatedEls.length; ai++) {
      observer.observe(animatedEls[ai]);
    }
  }


  /* ──────────────────────────────────
     5. SMOOTH ANCHOR SCROLL
     ────────────────────────────────── */

  function initSmoothScroll() {
    var navHeight = 72;
    var links = document.querySelectorAll('a[href^="#"]');
    var li;

    for (li = 0; li < links.length; li++) {
      links[li].addEventListener('click', function (e) {
        var href = this.getAttribute('href');

        /* Sla puur # over */
        if (href === '#') { return; }

        var target = document.querySelector(href);
        if (!target) { return; }

        e.preventDefault();

        var targetTop = target.getBoundingClientRect().top
                       + window.pageYOffset
                       - navHeight
                       - 16;

        window.scrollTo({
          top: targetTop,
          behavior: 'smooth'
        });
      });
    }
  }


  /* ──────────────────────────────────
     6. ACTIEVE NAV HIGHLIGHT
        Sectie in beeld → nav-link .active
     ────────────────────────────────── */

  function initActiveNav() {
    if (!('IntersectionObserver' in window)) { return; }

    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    if (!sections.length || !navLinks.length) { return; }

    function setActive(id) {
      var ni;
      for (ni = 0; ni < navLinks.length; ni++) {
        var linkHref = navLinks[ni].getAttribute('href');
        if (linkHref === '#' + id) {
          navLinks[ni].classList.add('active');
        } else {
          navLinks[ni].classList.remove('active');
        }
      }
    }

    var sectionObserver = new IntersectionObserver(
      function (entries) {
        var ei;
        for (ei = 0; ei < entries.length; ei++) {
          if (entries[ei].isIntersecting) {
            setActive(entries[ei].target.id);
          }
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
      }
    );

    var si;
    for (si = 0; si < sections.length; si++) {
      sectionObserver.observe(sections[si]);
    }
  }


  /* ──────────────────────────────────
     7. FAQ ACCORDEON
     ────────────────────────────────── */

  function initFAQ() {
    var faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) { return; }

    var fi;
    for (fi = 0; fi < faqItems.length; fi++) {
      (function (item) {
        var question = item.querySelector('.faq-question');
        var answer   = item.querySelector('.faq-answer');

        if (!question || !answer) { return; }

        question.addEventListener('click', function () {
          var isOpen = item.classList.contains('open');

          /* Sluit alle andere items */
          var allItems = document.querySelectorAll('.faq-item');
          var ai;
          for (ai = 0; ai < allItems.length; ai++) {
            if (allItems[ai] !== item) {
              allItems[ai].classList.remove('open');
              var otherQ = allItems[ai].querySelector('.faq-question');
              if (otherQ) {
                otherQ.setAttribute('aria-expanded', 'false');
              }
            }
          }

          /* Toggle huidig item */
          if (isOpen) {
            item.classList.remove('open');
            question.setAttribute('aria-expanded', 'false');
          } else {
            item.classList.add('open');
            question.setAttribute('aria-expanded', 'true');
          }
        });

        /* Keyboard: Enter en Space */
        question.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            question.click();
          }
        });

      }(faqItems[fi]));
    }
  }


  /* ──────────────────────────────────
     INIT — alles opstarten
     ────────────────────────────────── */

  function init() {
    initNavScroll();
    initHoverEffects();
    initMobileMenu();
    initScrollAnimations();
    initSmoothScroll();
    initActiveNav();
    initFAQ();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
