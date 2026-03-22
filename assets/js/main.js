/**
 * HUMAN.OS Blog - Main JavaScript
 * Features: Theme Toggle, Scroll Animations, Mobile Menu
 */

// ============================================
// Theme Toggle Module
// ============================================
class ThemeToggle {
  constructor() {
    this.toggle = document.querySelector('.theme-toggle');
    this.currentTheme = this.getStoredTheme() || this.getSystemTheme();
    
    this.init();
  }
  
  init() {
    // Apply initial theme immediately to prevent flash
    this.setTheme(this.currentTheme, false);
    
    // Add toggle event listener
    if (this.toggle) {
      this.toggle.addEventListener('click', () => this.toggleTheme());
      this.toggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggleTheme();
        }
      });
    }
    
    // Listen for system preference changes
    this.listenForSystemChanges();
  }
  
  getStoredTheme() {
    try {
      return localStorage.getItem('theme');
    } catch (e) {
      return null;
    }
  }
  
  getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }
  
  setTheme(theme, save = true) {
    document.documentElement.setAttribute('data-theme', theme);
    this.currentTheme = theme;
    
    if (save) {
      try {
        localStorage.setItem('theme', theme);
      } catch (e) {
        console.warn('Could not save theme preference');
      }
    }
    
    // Update toggle button icon
    this.updateToggleIcon();
    
    // Announce to screen readers
    this.announceThemeChange(theme);
  }
  
  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
  
  updateToggleIcon() {
    if (!this.toggle) return;
    
    const moon = this.toggle.querySelector('.icon-moon');
    const sun = this.toggle.querySelector('.icon-sun');
    
    if (moon && sun) {
      if (this.currentTheme === 'dark') {
        moon.style.opacity = '0';
        sun.style.opacity = '1';
      } else {
        moon.style.opacity = '1';
        sun.style.opacity = '0';
      }
    }
  }
  
  listenForSystemChanges() {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        // Only auto-switch if user hasn't manually set a preference
        if (!this.getStoredTheme()) {
          this.setTheme(e.matches ? 'dark' : 'light', false);
        }
      });
    }
  }
  
  announceThemeChange(theme) {
    // Optional: Add aria-live announcement for screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `Theme changed to ${theme} mode`;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      if (announcement.parentNode) {
        document.body.removeChild(announcement);
      }
    }, 1000);
  }
}

// ============================================
// Scroll Animations Module
// ============================================
class ScrollAnimations {
  constructor() {
    this.elements = document.querySelectorAll('[data-animate], [data-animate-stagger]');
    this.observer = null;
    
    this.init();
  }
  
  init() {
    // Check for Intersection Observer support
    if ('IntersectionObserver' in window) {
      this.setupObserver();
    } else {
      // Fallback: show all animations immediately
      this.elements.forEach(el => el.classList.add('animate-in'));
    }
  }
  
  setupObserver() {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          this.observer.unobserve(entry.target);
        }
      });
    }, options);
    
    this.elements.forEach(el => this.observer.observe(el));
  }
}

// ============================================
// Mobile Menu Module
// ============================================
class MobileMenu {
  constructor() {
    this.toggle = document.querySelector('.menu-toggle');
    this.menu = document.querySelector('.mobile-menu');
    this.menuLinks = document.querySelectorAll('.mobile-menu a');
    this.isOpen = false;
    
    this.init();
  }
  
  init() {
    // Toggle menu
    if (this.toggle && this.menu) {
      this.toggle.addEventListener('click', () => this.toggleMenu());
      
      // Keyboard support
      this.toggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggleMenu();
        }
      });
      
      // Close on link click
      this.menuLinks.forEach(link => {
        link.addEventListener('click', () => this.closeMenu());
      });
      
      // Close on outside click
      document.addEventListener('click', (e) => {
        if (this.isOpen && 
            !this.menu.contains(e.target) && 
            !this.toggle.contains(e.target)) {
          this.closeMenu();
        }
      });
      
      // Close on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.closeMenu();
        }
      });
    }
  }
  
  toggleMenu() {
    if (this.isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }
  
  openMenu() {
    if (!this.menu) return;
    
    this.menu.classList.add('active');
    this.toggle.classList.add('active');
    this.isOpen = true;
    document.body.style.overflow = 'hidden';
    
    // Focus first link for accessibility
    if (this.menuLinks.length > 0) {
      setTimeout(() => this.menuLinks[0].focus(), 100);
    }
  }
  
  closeMenu() {
    if (!this.menu) return;
    
    this.menu.classList.remove('active');
    this.toggle.classList.remove('active');
    this.isOpen = false;
    document.body.style.overflow = '';
    
    // Return focus to toggle button
    if (this.toggle) {
      this.toggle.focus();
    }
  }
}

// ============================================
// Smooth Scroll Module
// ============================================
class SmoothScroll {
  constructor() {
    this.init();
  }
  
  init() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
          
          // Update URL without jumping
          history.pushState(null, null, targetId);
        }
      });
    });
  }
}

// ============================================
// Mobile Optimizations
// ============================================
class MobileOptimizations {
  constructor() {
    this.isMobile = window.innerWidth < 768;
    
    this.init();
  }
  
  init() {
    // Detect mobile and reduce animation complexity
    if (this.isMobile) {
      this.reduceAnimations();
    }
    
    // Handle resize
    window.addEventListener('resize', () => {
      const newIsMobile = window.innerWidth < 768;
      if (newIsMobile !== this.isMobile) {
        this.isMobile = newIsMobile;
        if (this.isMobile) {
          this.reduceAnimations();
        }
      }
    });
    
    // Detect data saver mode
    if (navigator.connection && navigator.connection.saveData) {
      this.reduceAnimations();
    }
  }
  
  reduceAnimations() {
    // Disable scroll animations if performance is poor
    document.querySelectorAll('[data-animate], [data-animate-stagger]').forEach(el => {
      el.classList.add('animate-in');
    });
  }
}

// ============================================
// Form Handling
// ============================================
class FormHandling {
  constructor() {
    this.init();
  }
  
  init() {
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        const email = newsletterForm.querySelector('input[type="email"]').value;
        if (!email || !email.includes('@')) {
          e.preventDefault();
          alert('Please enter a valid email address.');
        }
      });
    }
  }
}

// ============================================
// Initialize Everything
// ============================================
function init() {
  new ThemeToggle();
  new ScrollAnimations();
  new MobileMenu();
  new SmoothScroll();
  new MobileOptimizations();
  new FormHandling();
}

// Run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Re-run on dynamic content updates (for Jekyll live reload)
if (window.jekyll && window.jekyll.liveReload) {
  document.addEventListener('jekyll:reload', init);
}
