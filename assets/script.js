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
  const revealElements = document.querySelectorAll('.reveal-up');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

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
