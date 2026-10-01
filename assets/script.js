/* ==========================================================================
   ABHITH MANPOWER SERVICES - PREMIUM INTERACTIVE JAVASCRIPT
   Vanilla JS ONLY (No jQuery or external libraries required)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header Scroll Transformation
  const headerWrapper = document.getElementById('headerWrapper');

  const handleScroll = () => {
    if (window.scrollY > 40) {
      headerWrapper?.classList.add('scrolled');
    } else {
      headerWrapper?.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Trigger initial state

  // 2. Scroll Reveal Animations via IntersectionObserver
  //    Hand-placed .reveal-up classes are kept; everything else inside page
  //    sections is tagged automatically so every page animates the same way:
  //    two-column rows slide in from their own side, card rows stagger upward,
  //    headings and remaining blocks fade up. Each element animates once.
  const REVEAL_CLASSES = ['reveal-up', 'reveal-left', 'reveal-right', 'reveal-fade'];
  const REVEAL_SELECTOR = REVEAL_CLASSES.map(c => `.${c}`).join(',');
  const SKIP_SELECTOR = 'header, footer, .pg-hero, .hero-section, .pg-gallery-grid, #testiCarouselTrack, .carousel, .modal';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const isTagged = el => el.matches(REVEAL_SELECTOR);
  const insideTagged = el => !!el.parentElement?.closest(REVEAL_SELECTOR);
  const hasTaggedChild = el => !!el.querySelector(REVEAL_SELECTOR);
  const isColumn = el => /(^|\s)col(-[\w-]+)?(\s|$)/.test(el.className);
  const setDelay = (el, seconds) => {
    if (seconds > 0 && !el.style.getPropertyValue('--stagger-delay')) {
      el.style.setProperty('--stagger-delay', `${seconds.toFixed(2)}s`);
    }
  };

  const autoTagReveals = () => {
    const sections = Array.from(document.querySelectorAll('section')).filter(s => !s.closest(SKIP_SELECTOR));

    // a) Rows of columns — measure everything first, then write (no layout thrash)
    const plans = [];
    sections.forEach(section => {
      section.querySelectorAll('.row').forEach(row => {
        if (row.closest(SKIP_SELECTOR) || insideTagged(row)) return;
        const cols = Array.from(row.children).filter(isColumn);
        if (!cols.length) return;
        const rowRect = row.getBoundingClientRect();
        const rects = cols.map(c => c.getBoundingClientRect());
        const sideBySide = cols.length === 2 &&
          Math.abs(rects[0].top - rects[1].top) < 60 &&
          rects.every(r => r.width < rowRect.width * 0.8);
        // Swipeable rows (e.g. service cards on mobile) reveal as one block,
        // otherwise off-screen cards would stay blank until swiped in.
        const scrollsSideways = /(auto|scroll)/.test(getComputedStyle(row).overflowX);
        plans.push({ row, cols, rects, rowRect, sideBySide, scrollsSideways });
      });
    });

    plans.forEach(({ row, cols, rects, rowRect, sideBySide, scrollsSideways }) => {
      if (insideTagged(row)) return; // a parent column was tagged after measuring
      if (scrollsSideways) {
        row.querySelectorAll(REVEAL_SELECTOR).forEach(el => el.classList.remove(...REVEAL_CLASSES));
        row.classList.add('reveal-up');
        return;
      }
      const rowWasTagged = isTagged(row);
      if (rowWasTagged) row.classList.remove(...REVEAL_CLASSES); // hand the reveal to its columns

      let lineTop = null;
      let indexInLine = 0;
      cols.forEach((col, i) => {
        // Columns that manage their own inner reveals are left alone
        if (hasTaggedChild(col)) return;

        if (sideBySide) {
          const centre = rects[i].left + rects[i].width / 2;
          const fromLeft = centre < rowRect.left + rowRect.width / 2;
          col.classList.remove('reveal-up');
          col.classList.add(fromLeft ? 'reveal-left' : 'reveal-right');
          setDelay(col, fromLeft ? 0 : 0.12);
          return;
        }

        if (!isTagged(col)) col.classList.add('reveal-up');
        // Stagger cards that sit on the same visual line
        if (lineTop === null || Math.abs(rects[i].top - lineTop) > 20) {
          lineTop = rects[i].top;
          indexInLine = 0;
        }
        if (cols.length > 1) setDelay(col, Math.min(indexInLine, 5) * 0.09);
        indexInLine += 1;
      });
    });

    sections.forEach(section => {
      // b) Section labels, headings and intro text
      const headingCount = new Map();
      section.querySelectorAll('.eyebrow-tag, .section-title, .section-subtitle, h2, .pg-block-title').forEach(el => {
        if (el.closest(SKIP_SELECTOR) || isTagged(el) || insideTagged(el)) return;
        const n = headingCount.get(el.parentElement) || 0;
        headingCount.set(el.parentElement, n + 1);
        el.classList.add('reveal-up');
        setDelay(el, Math.min(n, 3) * 0.08);
      });

      // c) Any other top-level block in the section's container
      section.querySelectorAll(':scope > .container > *, :scope > .container-fluid > *, :scope > div > .container > *, :scope > div > .container-fluid > *').forEach(el => {
        if (el.closest(SKIP_SELECTOR) || el.matches('.row, script, style') || isTagged(el) || insideTagged(el) || hasTaggedChild(el)) return;
        el.classList.add('reveal-up');
      });
    });
  };

  if (!reduceMotion) autoTagReveals();

  const revealElements = document.querySelectorAll(REVEAL_SELECTOR);

  // Once the transition is over, drop the reveal classes so the element's own
  // hover transforms and transitions work untouched.
  const finishReveal = (el, hadActive) => {
    const delay = parseFloat(getComputedStyle(el).transitionDelay) || 0;
    setTimeout(() => {
      el.classList.remove(...REVEAL_CLASSES);
      if (!hadActive) el.classList.remove('active');
      el.style.removeProperty('--stagger-delay');
      delete el.dataset.revealHadActive;
    }, (delay + 1.1) * 1000);
  };

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('active'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const hadActive = el.dataset.revealHadActive === 'true';
        el.classList.add('active');
        observer.unobserve(el);
        finishReveal(el, hadActive);
      });
    }, {
      threshold: 0,
      rootMargin: '0px 0px -8% 0px'
    });

    revealElements.forEach(el => {
      el.dataset.revealHadActive = el.classList.contains('active');
      revealObserver.observe(el);
    });
  }

  // 3. Number Counter Animation for Statistics
  const statNumbers = document.querySelectorAll('.counter-value');
  let animated = false;

  const animateCounters = () => {
    statNumbers.forEach(stat => {
      const target = parseFloat(stat.getAttribute('data-target'));
      const prefix = stat.getAttribute('data-prefix') || '';
      const suffix = stat.getAttribute('data-suffix') || '';
      const isDecimal = stat.getAttribute('data-decimal') === 'true';
      const duration = 2000; // 2 seconds
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);

        // Easing function: easeOutCubic
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = target * easedProgress;

        if (isDecimal) {
          stat.textContent = prefix + currentValue.toFixed(1) + suffix;
        } else {
          stat.textContent = prefix + Math.floor(currentValue) + suffix;
        }

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          stat.textContent = prefix + (isDecimal ? target.toFixed(1) : target) + suffix;
        }
      };

      requestAnimationFrame(updateCount);
    });
  };

  const statsSection = document.getElementById('statsSection');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animateCounters();
          animated = true;
        }
      });
    }, { threshold: 0.2 });

    statsObserver.observe(statsSection);
  }

  // 4. Hero Carousel Slide Index & Counter Synchronization
  const heroCarouselEl = document.getElementById('heroCarousel');
  const slideCounterEl = document.getElementById('heroSlideCounter');

  if (heroCarouselEl && slideCounterEl) {
    heroCarouselEl.addEventListener('slide.bs.carousel', (e) => {
      const nextIndex = (e.to + 1).toString().padStart(2, '0');
      slideCounterEl.textContent = nextIndex;
    });
  }

  // 5. Client Feedback Testimonials Carousel
  const track = document.getElementById('testiCarouselTrack');
  const prevBtn = document.getElementById('testiPrev');
  const nextBtn = document.getElementById('testiNext');
  const paginationContainer = document.getElementById('testiPagination');

  if (track) {
    const cards = Array.from(track.querySelectorAll('.testi-card'));
    let currentIndex = 0;
    let autoplayInterval;

    function getCardsPerView() {
      if (window.innerWidth >= 992) return 4;
      if (window.innerWidth >= 768) return 2;
      return 1;
    }

    function updateCarousel() {
      const cardsPerView = getCardsPerView();
      const maxIndex = Math.max(0, cards.length - cardsPerView);

      if (currentIndex > maxIndex) {
        currentIndex = maxIndex;
      }

      const cardWidth = cards[0].offsetWidth;
      // Gap is 24px
      const offset = currentIndex * (cardWidth + 24);
      track.style.transform = `translateX(-${offset}px)`;

      // Update pagination dots
      const dots = Array.from(paginationContainer.querySelectorAll('.testi-dot'));
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });

      // Update button states
      if (prevBtn) prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
      if (nextBtn) nextBtn.style.opacity = currentIndex === maxIndex ? '0.5' : '1';
    }

    function createPagination() {
      const cardsPerView = getCardsPerView();
      const maxIndex = Math.max(0, cards.length - cardsPerView);

      paginationContainer.innerHTML = '';
      for (let i = 0; i <= maxIndex; i++) {
        const dot = document.createElement('button');
        dot.classList.add('testi-dot');
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        if (i === currentIndex) dot.classList.add('active');

        dot.addEventListener('click', () => {
          currentIndex = i;
          updateCarousel();
          resetAutoplay();
        });

        paginationContainer.appendChild(dot);
      }
    }

    function slideNext() {
      const maxIndex = Math.max(0, cards.length - getCardsPerView());
      if (currentIndex < maxIndex) {
        currentIndex++;
      } else {
        currentIndex = 0; // Loop back to start
      }
      updateCarousel();
    }

    function slidePrev() {
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        const maxIndex = Math.max(0, cards.length - getCardsPerView());
        currentIndex = maxIndex; // Loop to end
      }
      updateCarousel();
    }

    function startAutoplay() {
      autoplayInterval = setInterval(slideNext, 4000);
    }

    function stopAutoplay() {
      clearInterval(autoplayInterval);
    }

    function resetAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    if (prevBtn && nextBtn) {
      nextBtn.addEventListener('click', () => {
        slideNext();
        resetAutoplay();
      });

      prevBtn.addEventListener('click', () => {
        slidePrev();
        resetAutoplay();
      });
    }

    // Pause on hover
    const carouselWrap = document.querySelector('.testi-carousel-wrap');
    if (carouselWrap) {
      carouselWrap.addEventListener('mouseenter', stopAutoplay);
      carouselWrap.addEventListener('mouseleave', startAutoplay);
    }

    // Initialize
    createPagination();
    updateCarousel();
    startAutoplay();

    // Handle Resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        createPagination();
        updateCarousel();
      }, 250);
    });
  }

  // 7. Back To Top Smooth Scroll Button
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 8. Bidirectional Interaction: Location Cards <-> Map Markers & States
  const locationCards = document.querySelectorAll('.location-hub-card');
  const mapHubMarkers = document.querySelectorAll('.map-hub-marker');

  const stateMap = {
    guwahati: ['IN-AS', 'IN-ML', 'IN-TR'],
    noida: ['IN-UP', 'IN-DL'],
    jaipur: ['IN-RJ'],
    meghalaya: ['IN-ML'],
    tripura: ['IN-TR']
  };

  const highlightHub = (hubKey) => {
    // Activate card
    locationCards.forEach(c => {
      if (c.getAttribute('data-hub') === hubKey) {
        c.classList.add('active');
      } else {
        c.classList.remove('active');
      }
    });

    // Highlight map marker
    mapHubMarkers.forEach(m => {
      if (m.getAttribute('data-city') === hubKey) {
        m.classList.add('active');
      } else {
        m.classList.remove('active');
      }
    });

    // Highlight matching state paths
    const activeStates = stateMap[hubKey] || [];
    document.querySelectorAll('.all-india-states-layer path').forEach(p => {
      if (activeStates.includes(p.id)) {
        p.classList.add('state-active');
      } else {
        p.classList.remove('state-active');
      }
    });
  };

  const resetHubHighlights = () => {
    mapHubMarkers.forEach(m => {
      m.classList.remove('active');
    });
    document.querySelectorAll('.all-india-states-layer path').forEach(p => {
      p.classList.remove('state-active');
    });
  };

  locationCards.forEach(card => {
    const hubKey = card.getAttribute('data-hub');
    card.addEventListener('mouseenter', () => highlightHub(hubKey));
    card.addEventListener('click', () => highlightHub(hubKey));
  });

  mapHubMarkers.forEach(marker => {
    const cityKey = marker.getAttribute('data-city');
    marker.addEventListener('mouseenter', () => highlightHub(cityKey));
    marker.addEventListener('mouseleave', resetHubHighlights);
  });


  // 9. Desktop Hover for Services Mega Dropdown Menu
  const megaDropdownEl = document.querySelector('.dropdown-mega');
  if (megaDropdownEl && window.innerWidth >= 992) {
    megaDropdownEl.addEventListener('mouseenter', () => {
      const toggleBtn = megaDropdownEl.querySelector('.dropdown-toggle');
      const menuEl = megaDropdownEl.querySelector('.dropdown-menu');
      if (toggleBtn && menuEl) {
        toggleBtn.classList.add('show');
        menuEl.classList.add('show');
        toggleBtn.setAttribute('aria-expanded', 'true');
      }
    });

    megaDropdownEl.addEventListener('mouseleave', () => {
      const toggleBtn = megaDropdownEl.querySelector('.dropdown-toggle');
      const menuEl = megaDropdownEl.querySelector('.dropdown-menu');
      if (toggleBtn && menuEl) {
        toggleBtn.classList.remove('show');
        menuEl.classList.remove('show');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }
});
