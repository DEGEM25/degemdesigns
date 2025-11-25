// Constants
const brandText = 'Degem Design Studio';
const taglineText = 'Prototype. Iterate. Design.';

// Typewriter helper function
function typeText(element, text, speed, onComplete) {
  let index = 0;
  element.textContent = '';

  const interval = setInterval(() => {
    element.textContent += text.charAt(index);
    index += 1;

    if (index >= text.length) {
      clearInterval(interval);
      if (typeof onComplete === 'function') {
        onComplete();
      }
    }
  }, speed);
}

// Intro animation
function runIntroAnimation() {
  const rightDot = document.getElementById('right-dot');
  const leftDot = document.getElementById('left-dot');
  const designStudioText = document.getElementById('design-studio-text');
  const tagline = document.getElementById('tagline');
  const ggptOverlay = document.getElementById('ggpt-overlay');

  // Start with dots hidden (ensure they start invisible)
  if (rightDot) {
    rightDot.style.opacity = '0';
    rightDot.style.transition = 'opacity 1.5s ease-in-out';
  }
  if (leftDot) {
    leftDot.style.opacity = '0';
    leftDot.style.transition = 'opacity 1.5s ease-in-out';
  }

  // Start with text hidden for fade-in animation
  if (designStudioText) {
    designStudioText.style.opacity = '0';
    designStudioText.style.transform = 'translateY(10px)';
  }
  
  // Animation sequence:
  // 1. RD.png (right dot) fades in first
  if (rightDot) {
    setTimeout(() => {
      // Add visible class to apply transition
      rightDot.classList.add('visible');
      // Force reflow to ensure transition is applied
      void rightDot.offsetWidth;
      // Fade in to permanently visible
      rightDot.style.opacity = '1';
    }, 500);
  }
  
  // 2. LD.png (left dot) fades in slightly after right dot
  if (leftDot) {
    setTimeout(() => {
      // Add visible class to apply transition
      leftDot.classList.add('visible');
      // Force reflow to ensure transition is applied
      void leftDot.offsetWidth;
      // Fade in to permanently visible
      leftDot.style.opacity = '1';
    }, 800);
  }
  
  // 3. Fade in Design Studio text
  if (designStudioText) {
    setTimeout(() => {
      designStudioText.classList.add('visible');
      designStudioText.style.opacity = '1';
      designStudioText.style.transform = 'translateY(0)';
    }, 1200);
  }
  
  // 4. Fade in tagline after text animation
  if (tagline) {
    setTimeout(() => {
      tagline.classList.add('visible');
    }, 1900);
  }
  
  
}
// Products fade-in on scroll
function initProductAnimations() {
  const productCards = document.querySelectorAll('.product-card');
  
  if (!productCards.length) return;

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 150); // Stagger animations
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  productCards.forEach(card => {
    observer.observe(card);
  });
}

// Deep dive page fade-in on scroll
function initDeepDiveAnimations() {
  const contentSections = document.querySelectorAll('.content-section');
  const modelSection = document.querySelector('.model-section');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100); // Stagger animations
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe model section if it exists
  if (modelSection) {
    observer.observe(modelSection);
  }

  // Observe content sections
  contentSections.forEach(section => {
    observer.observe(section);
  });
}

// Automation cards fade-in on scroll
function initAutomationAnimations() {
  const automationCards = document.querySelectorAll('.automation-card');
  
  if (!automationCards.length) return;

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100); // Stagger animations
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  automationCards.forEach(card => {
    observer.observe(card);
  });
}

// Web design section animations
function initWebDesignAnimations() {
  const pillarCards = document.querySelectorAll('.pillar-card');
  const websiteCards = document.querySelectorAll('.website-card');
  const methodologyQuote = document.querySelector('.methodology-quote');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  pillarCards.forEach(card => {
    observer.observe(card);
  });

  websiteCards.forEach(card => {
    observer.observe(card);
  });

  if (methodologyQuote) {
    observer.observe(methodologyQuote);
  }
}

// Sticky navigation scroll behavior
function initStickyNav() {
  const nav = document.getElementById('sticky-nav');
  if (!nav) return;

  const navLinks = nav.querySelectorAll('a');
  const sections = ['products', 'automations', 'web-design'];

  // Function to get nav offset
  const getNavOffset = () => {
    return nav.offsetTop;
  };

  let navOffset = getNavOffset();

  // Recalculate on resize
  window.addEventListener('resize', () => {
    navOffset = getNavOffset();
  });

  // Fade-in animation when nav enters viewport
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        nav.classList.add('visible');
        navObserver.unobserve(nav);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  navObserver.observe(nav);

  // Create spacer to prevent layout shift when nav becomes sticky
  const navSpacer = document.createElement('div');
  navSpacer.id = 'nav-spacer';
  navSpacer.style.display = 'none';
  navSpacer.style.height = nav.offsetHeight + 'px';
  nav.parentNode.insertBefore(navSpacer, nav.nextSibling);

  // Sticky behavior on scroll
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset || window.scrollY;
    
    // Recalculate offset if nav is not sticky (in case layout changed)
    if (!nav.classList.contains('sticky')) {
      navOffset = getNavOffset();
    }
    
    if (scrollY >= navOffset) {
      if (!nav.classList.contains('sticky')) {
        nav.classList.add('sticky');
        navSpacer.style.display = 'block';
        navSpacer.style.height = nav.offsetHeight + 'px';
      }
    } else {
      if (nav.classList.contains('sticky')) {
        nav.classList.remove('sticky');
        navSpacer.style.display = 'none';
      }
    }

    // Update active link based on scroll position
    sections.forEach((sectionId, index) => {
      const section = document.getElementById(sectionId);
      if (section) {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionBottom = sectionTop + rect.height;
        const navHeight = nav.offsetHeight;
        const offset = nav.classList.contains('sticky') ? navHeight : navHeight + 50;
        
        if (scrollY >= sectionTop - offset - 100 && scrollY < sectionBottom - offset - 100) {
          navLinks.forEach(link => link.classList.remove('active'));
          if (navLinks[index]) {
            navLinks[index].classList.add('active');
          }
        }
      }
    });
  });

  // Smooth scroll on click for section links
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Only prevent default for anchor links (not external pages)
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          const navHeight = nav.offsetHeight;
          const isSticky = nav.classList.contains('sticky');
          // When sticky, nav is fixed at top, so just account for nav height
          // When not sticky, account for nav height plus its offset
          const offset = isSticky ? navHeight : navHeight;
          const targetPosition = targetSection.offsetTop - offset;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

// Check if page was loaded directly (not redirected from another page)
function isDirectLoad() {
  // If there's no referrer, it's a direct load
  if (!document.referrer) {
    return true;
  }
  
  // If referrer is from a different origin, it's a direct load
  try {
    const referrerUrl = new URL(document.referrer);
    const currentUrl = new URL(window.location.href);
    return referrerUrl.origin !== currentUrl.origin;
  } catch (e) {
    // If URL parsing fails, assume it's a direct load
    return true;
  }
}

// Handle navigation anchor scroll
function handleNavAnchorScroll() {
  const navAnchor = document.getElementById('nav-anchor');
  if (!navAnchor) return;

  // Check if URL has #nav-anchor hash
  if (window.location.hash === '#nav-anchor') {
    // Wait for page to fully load
    setTimeout(() => {
      const nav = document.getElementById('sticky-nav');
      if (nav) {
        // Get the position of the nav anchor (which is right before the nav)
        const navAnchorOffset = navAnchor.offsetTop;
        // Scroll to position nav at the top of the viewport
        window.scrollTo({
          top: navAnchorOffset,
          behavior: 'smooth'
        });
      }
    }, 300);
  } else {
    // If no hash, scroll to top on page load
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }
}

// Main initialization
document.addEventListener('DOMContentLoaded', () => {
  // Scroll to top or nav-anchor based on hash
  handleNavAnchorScroll();
  
  // Only run homepage animations if elements exist AND it's a direct load
  const designStudioText = document.getElementById('design-studio-text');
  const rightDot = document.getElementById('right-dot');
  const leftDot = document.getElementById('left-dot');
  
  // Run animation if we have the text OR the dots (for testing)
  if ((designStudioText || (rightDot || leftDot)) && isDirectLoad()) {
    runIntroAnimation();
  }
  
  // Initialize sticky navigation
  initStickyNav();
  
  // Only run product animations if product cards exist
  if (document.querySelectorAll('.product-card').length) {
    initProductAnimations();
  }
  
  // Only run deep dive animations if content sections exist
  if (document.querySelectorAll('.content-section').length) {
    initDeepDiveAnimations();
  }
  
  // Only run automation animations if automation cards exist
  if (document.querySelectorAll('.automation-card').length) {
    initAutomationAnimations();
  }
  
  // Only run web design animations if elements exist
  if (document.querySelectorAll('.pillar-card').length || document.querySelectorAll('.website-card').length) {
    initWebDesignAnimations();
  }
});

