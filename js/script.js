/* ==========================================================================
   Stackly Creative Agency - Interactive JavaScript Engine
   Standard Pure ES6+ Vanilla JavaScript - Zero External Libraries
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ------------------------------------------------------------------------
     1. Premium Preloader Fade Out & Scroll Lock
     ------------------------------------------------------------------------ */
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    // Lock scrolling while preloader is active on initial load
    document.body.classList.add('preloader-active');

    let hasFaded = false;
    const hidePreloader = () => {
      if (hasFaded) return;
      hasFaded = true;

      preloader.classList.add('fade-out');
      setTimeout(() => {
        preloader.style.display = 'none';
        document.body.classList.remove('preloader-active');
      }, 700);
    };

    if (document.readyState === 'complete') {
      hidePreloader();
    } else {
      window.addEventListener('load', hidePreloader);
      // Safe max fallback timer (1.5s)
      setTimeout(hidePreloader, 1500);
    }
  }

  /* ------------------------------------------------------------------------
     2. Sticky Header & Elevation
     ------------------------------------------------------------------------ */
  const header = document.querySelector('.header');
  const scrollTopBtn = document.querySelector('.scroll-top-btn');

  const handleScroll = () => {
    const scrollY = window.scrollY;
    
    if (header) {
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    if (scrollTopBtn) {
      if (scrollY > 400) {
        scrollTopBtn.classList.add('show');
      } else {
        scrollTopBtn.classList.remove('show');
      }
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check

  /* ------------------------------------------------------------------------
     3. Scroll to Top Button Action
     ------------------------------------------------------------------------ */
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ------------------------------------------------------------------------
     4. Mobile Navigation Menu Drawer
     ------------------------------------------------------------------------ */
  const mobileToggle = document.querySelector('.mobile-toggle');
  const closeDrawer = document.querySelector('.close-drawer');
  const mobileOverlay = document.querySelector('.mobile-menu-overlay');
  const mobileDrawer = document.querySelector('.mobile-drawer');

  function openMobileMenu() {
    if (mobileOverlay && mobileDrawer) {
      mobileOverlay.classList.add('active');
      mobileDrawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileMenu() {
    if (mobileOverlay && mobileDrawer) {
      mobileOverlay.classList.remove('active');
      mobileDrawer.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openMobileMenu);
  if (closeDrawer) closeDrawer.addEventListener('click', closeMobileMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);

  // Close drawer on clicking mobile nav links
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  /* ------------------------------------------------------------------------
     4.1 Hero 5-Image Live Slider & Running Background Engine
     ------------------------------------------------------------------------ */
  const heroBgSlides = document.querySelectorAll('.hero-bg-slide');
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('.hero-dot');
  
  if (heroSlides.length > 0) {
    let heroIndex = 0;
    let heroInterval = null;

    function goToHeroSlide(index) {
      heroIndex = (index + heroSlides.length) % heroSlides.length;

      // Update right visual slides
      heroSlides.forEach((slide, idx) => {
        if (idx === heroIndex) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });

      // Update live background slides
      if (heroBgSlides.length > 0) {
        heroBgSlides.forEach((bgSlide, idx) => {
          if (idx === heroIndex) {
            bgSlide.classList.add('active');
          } else {
            bgSlide.classList.remove('active');
          }
        });
      }

      // Update indicator dots
      heroDots.forEach((dot, idx) => {
        if (idx === heroIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    function startHeroTimer() {
      heroInterval = setInterval(() => {
        goToHeroSlide(heroIndex + 1);
      }, 3500);
    }

    heroDots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        clearInterval(heroInterval);
        goToHeroSlide(idx);
        startHeroTimer();
      });
    });

    startHeroTimer();
  }

  /* ------------------------------------------------------------------------
     5. Active Page & Scroll Indicator
     ------------------------------------------------------------------------ */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ------------------------------------------------------------------------
     6. Portfolio Filtering Engine
     ------------------------------------------------------------------------ */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-card');

  if (filterBtns.length > 0 && portfolioItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            item.style.display = 'block';
            item.style.animation = 'fadeIn 0.4s ease forward';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  /* ------------------------------------------------------------------------
     7. Animated Counters (Intersection Observer)
     ------------------------------------------------------------------------ */
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');

  if (statNumbers.length > 0) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const endVal = parseInt(target.getAttribute('data-count'), 10);
          const prefix = target.getAttribute('data-prefix') || '';
          const suffix = target.getAttribute('data-suffix') || '';
          let startVal = 0;
          const duration = 2000;
          const stepTime = 20;
          const steps = duration / stepTime;
          const increment = endVal / steps;

          const counterInterval = setInterval(() => {
            startVal += increment;
            if (startVal >= endVal) {
              target.textContent = prefix + endVal + suffix;
              clearInterval(counterInterval);
            } else {
              target.textContent = prefix + Math.floor(startVal) + suffix;
            }
          }, stepTime);

          observer.unobserve(target);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => counterObserver.observe(num));
  }

  /* ------------------------------------------------------------------------
     8. Testimonial Slider / Carousel
     ------------------------------------------------------------------------ */
  const sliderTrack = document.querySelector('.testimonial-track');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.querySelector('.prev-slide');
  const nextBtn = document.querySelector('.next-slide');

  if (sliderTrack && slides.length > 0) {
    let currentIndex = 0;

    function updateSlider() {
      const offset = -currentIndex * 100;
      sliderTrack.style.transform = `translateX(${offset}%)`;
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
      });
    }

    // Auto slide every 6 seconds
    setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlider();
    }, 6000);
  }

  /* ------------------------------------------------------------------------
     9. FAQ Accordion
     ------------------------------------------------------------------------ */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const body = item.querySelector('.faq-body');

    if (header && body) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all other items
        faqItems.forEach(other => {
          other.classList.remove('active');
          const otherBody = other.querySelector('.faq-body');
          if (otherBody) otherBody.style.maxHeight = null;
        });

        // Toggle current item
        if (!isActive) {
          item.classList.add('active');
          body.style.maxHeight = body.scrollHeight + 'px';
        }
      });
    }
  });

  /* ------------------------------------------------------------------------
     10. Contact & Newsletter Form Validation
     ------------------------------------------------------------------------ */
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Generic Field Validator
  function validateInput(input, errorElement, validationFn, errorMessage) {
    const value = input.value.trim();
    if (!validationFn(value)) {
      input.classList.add('input-error');
      if (errorElement) {
        errorElement.textContent = errorMessage;
        errorElement.classList.add('show');
      }
      return false;
    } else {
      input.classList.remove('input-error');
      if (errorElement) {
        errorElement.classList.remove('show');
      }
      return true;
    }
  }

  // Contact Form Setup
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameInput = document.getElementById('contactName');
      const emailInput = document.getElementById('contactEmail');
      const subjectInput = document.getElementById('contactSubject');
      const messageInput = document.getElementById('contactMessage');

      const nameErr = document.getElementById('nameError');
      const emailErr = document.getElementById('emailError');
      const subjectErr = document.getElementById('subjectError');
      const messageErr = document.getElementById('messageError');
      const successBanner = document.getElementById('contactSuccess');

      let isValid = true;

      if (nameInput) {
        const nameOk = validateInput(nameInput, nameErr, val => val.length >= 2, 'Please enter your full name (at least 2 characters).');
        if (!nameOk) isValid = false;
      }

      if (emailInput) {
        const emailOk = validateInput(emailInput, emailErr, val => emailRegex.test(val), 'Please enter a valid email address.');
        if (!emailOk) isValid = false;
      }

      if (subjectInput) {
        const subjectOk = validateInput(subjectInput, subjectErr, val => val.length >= 3, 'Please specify a subject.');
        if (!subjectOk) isValid = false;
      }

      if (messageInput) {
        const messageOk = validateInput(messageInput, messageErr, val => val.length >= 10, 'Please write a message of at least 10 characters.');
        if (!messageOk) isValid = false;
      }

      if (isValid) {
        if (successBanner) {
          successBanner.classList.add('show');
          successBanner.textContent = 'Thank you! Your message has been sent successfully. Our team will contact you shortly.';
        }
        contactForm.reset();
        setTimeout(() => {
          if (successBanner) successBanner.classList.remove('show');
        }, 5000);
      }
    });
  }

  // Newsletter Form Setup
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletterEmail');
      const emailErr = document.getElementById('newsletterError');
      const successBanner = document.getElementById('newsletterSuccess');

      if (emailInput) {
        const emailOk = validateInput(emailInput, emailErr, val => emailRegex.test(val), 'Please enter a valid email address.');
        if (emailOk) {
          if (successBanner) {
            successBanner.classList.add('show');
            successBanner.textContent = 'Successfully subscribed to Stackly Newsletter!';
          }
          newsletterForm.reset();
          setTimeout(() => {
            if (successBanner) successBanner.classList.remove('show');
          }, 4000);
        }
      }
    });
  }

  /* ------------------------------------------------------------------------
     11. Video Presentation Modal Action
     ------------------------------------------------------------------------ */
  const playBtn = document.querySelector('.play-btn');
  const videoModal = document.getElementById('videoModal');
  const closeModal = document.querySelector('.close-modal');

  if (playBtn && videoModal) {
    playBtn.addEventListener('click', () => {
      videoModal.classList.add('active');
    });

    if (closeModal) {
      closeModal.addEventListener('click', () => {
        videoModal.classList.remove('active');
      });
    }

    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        videoModal.classList.remove('active');
      }
    });
  }

  /* ------------------------------------------------------------------------
     12. Mobile Touch Tap-to-Hover Toggle for Cards
     ------------------------------------------------------------------------ */
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  portfolioCards.forEach(card => {
    card.addEventListener('click', (e) => {
      const isAlreadyActive = card.classList.contains('touch-active');
      portfolioCards.forEach(c => c.classList.remove('touch-active'));
      if (!isAlreadyActive) {
        card.classList.add('touch-active');
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.portfolio-card')) {
      portfolioCards.forEach(c => c.classList.remove('touch-active'));
    }
  });
});
