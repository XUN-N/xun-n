/**
 * HUMAN.OS Pitch Deck - Phase 3: Interactivity
 * Enhanced navigation, touch gestures, offline capability, analytics
 * 
 * Performance targets:
 * - Animation frame budget: 16ms (60fps)
 * - Total bundle: <160KB
 * - First paint: <1s
 */

class Presentation {
  constructor() {
    this.currentSlide = 0;
    this.slides = document.querySelectorAll('.slide');
    this.totalSlides = this.slides.length;
    this.progressBar = document.querySelector('.progress-bar');
    this.progressSegments = null;
    this.slideCounter = document.querySelector('.slide-counter');
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchStartTime = 0;
    this.longPressTimer = null;
    this.charts = new Map();
    this.chartLibrary = null;
    this.animationFrameIds = [];
    
    // Phase 3: Timer state
    this.timerState = {
      running: false,
      startTime: 0,
      elapsed: 0,
      display: null
    };
    
    // Phase 3: Analytics state
    this.analytics = {
      slideViews: {},
      navigationPath: [],
      startTime: Date.now(),
      interactions: 0
    };
    
    // Phase 3: Zoom state for charts
    this.chartZoom = {
      scale: 1,
      activeChart: null,
      initialDistance: 0
    };
    
    this.init();
  }
  
  init() {
    this.loadState();
    this.createUIComponents();
    this.bindEvents();
    this.initServiceWorker();
    this.showSlide(this.currentSlide);
    this.updateProgress();
    this.preloadChartLibrary();
    this.trackSlideView(this.currentSlide);
  }
  
  /**
   * Phase 3: Create additional UI components
   */
  createUIComponents() {
    // Create thumbnails panel
    this.createThumbnailsPanel();
    
    // Create presenter notes panel
    this.createNotesPanel();
    
    // Create timer display
    this.createTimerDisplay();
    
    // Create help overlay
    this.createHelpOverlay();
    
    // Create offline indicator
    this.createOfflineIndicator();
    
    // Create go-to-slide dialog
    this.createGoToDialog();
    
    // Create analytics panel
    this.createAnalyticsPanel();
    
    // Create progress segments
    this.createProgressSegments();
  }
  
  createThumbnailsPanel() {
    const panel = document.createElement('div');
    panel.className = 'thumbnails-panel';
    panel.id = 'thumbnailsPanel';
    panel.setAttribute('aria-hidden', 'true');
    
    const header = document.createElement('div');
    header.className = 'thumbnails-header';
    header.innerHTML = '<span>Slides</span><button class="thumbnails-close" aria-label="Close thumbnails">&times;</button>';
    
    const grid = document.createElement('div');
    grid.className = 'thumbnails-grid';
    
    this.slides.forEach((slide, index) => {
      const thumb = document.createElement('div');
      thumb.className = 'thumbnail-item';
      thumb.dataset.slide = index;
      thumb.setAttribute('role', 'button');
      thumb.setAttribute('tabindex', '0');
      thumb.setAttribute('aria-label', `Go to slide ${index + 1}`);
      
      // Get slide title
      const title = slide.querySelector('h1, h2')?.textContent || `Slide ${index + 1}`;
      const slideNum = index + 1;
      
      thumb.innerHTML = `
        <div class="thumbnail-preview">
          <span class="thumbnail-number">${slideNum}</span>
        </div>
        <span class="thumbnail-title">${title}</span>
      `;
      
      thumb.addEventListener('click', () => {
        this.goTo(index);
        this.hideThumbnails();
      });
      
      thumb.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.goTo(index);
          this.hideThumbnails();
        }
      });
      
      grid.appendChild(thumb);
    });
    
    panel.appendChild(header);
    panel.appendChild(grid);
    document.body.appendChild(panel);
    
    // Close button
    header.querySelector('.thumbnails-close').addEventListener('click', () => this.hideThumbnails());
    
    this.thumbnailsPanel = panel;
  }
  
  createNotesPanel() {
    const panel = document.createElement('div');
    panel.className = 'notes-panel';
    panel.id = 'notesPanel';
    panel.setAttribute('aria-hidden', 'true');
    
    panel.innerHTML = `
      <div class="notes-header">
        <span>Presenter Notes</span>
        <button class="notes-close" aria-label="Close notes">&times;</button>
      </div>
      <div class="notes-content" id="notesContent">
        <p class="notes-empty">No notes for this slide.</p>
      </div>
    `;
    
    document.body.appendChild(panel);
    
    panel.querySelector('.notes-close').addEventListener('click', () => this.toggleNotes());
    
    this.notesPanel = panel;
    this.notesContent = document.getElementById('notesContent');
    
    // Load notes data
    this.loadNotesData();
  }
  
  createTimerDisplay() {
    const timer = document.createElement('div');
    timer.className = 'timer-display';
    timer.id = 'timerDisplay';
    timer.setAttribute('aria-label', 'Presentation timer');
    timer.innerHTML = `
      <span class="timer-time" id="timerTime">00:00</span>
      <div class="timer-controls">
        <button class="timer-btn" id="timerToggle" aria-label="Start timer">▶</button>
        <button class="timer-btn" id="timerReset" aria-label="Reset timer">↺</button>
      </div>
    `;
    
    document.body.appendChild(timer);
    
    this.timerState.display = document.getElementById('timerTime');
    
    document.getElementById('timerToggle').addEventListener('click', () => this.toggleTimer());
    document.getElementById('timerReset').addEventListener('click', () => this.resetTimer());
    
    this.timerDisplay = timer;
  }
  
  createHelpOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'help-overlay';
    overlay.id = 'helpOverlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Keyboard shortcuts help');
    
    overlay.innerHTML = `
      <div class="help-content">
        <div class="help-header">
          <h3>Keyboard Shortcuts</h3>
          <button class="help-close" aria-label="Close help">&times;</button>
        </div>
        <div class="help-grid">
          <div class="help-item"><kbd>←</kbd><span>Previous slide</span></div>
          <div class="help-item"><kbd>→</kbd><span>Next slide</span></div>
          <div class="help-item"><kbd>Space</kbd><span>Next slide</span></div>
          <div class="help-item"><kbd>Home</kbd><span>First slide</span></div>
          <div class="help-item"><kbd>End</kbd><span>Last slide</span></div>
          <div class="help-item"><kbd>F</kbd><span>Toggle fullscreen</span></div>
          <div class="help-item"><kbd>P</kbd><span>Export PDF</span></div>
          <div class="help-item"><kbd>N</kbd><span>Toggle notes</span></div>
          <div class="help-item"><kbd>T</kbd><span>Toggle timer</span></div>
          <div class="help-item"><kbd>G</kbd><span>Go to slide</span></div>
          <div class="help-item"><kbd>H</kbd><span>Show this help</span></div>
          <div class="help-item"><kbd>Esc</kbd><span>Close/Exit</span></div>
        </div>
        <div class="help-section">
          <h4>Touch Gestures</h4>
          <div class="help-grid">
            <div class="help-item"><span class="gesture">Swipe ←→</span><span>Navigate slides</span></div>
            <div class="help-item"><span class="gesture">Double-tap</span><span>Toggle fullscreen</span></div>
            <div class="help-item"><span class="gesture">Long-press</span><span>Slide menu</span></div>
            <div class="help-item"><span class="gesture">Pinch</span><span>Zoom charts</span></div>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(overlay);
    
    overlay.querySelector('.help-close').addEventListener('click', () => this.hideHelp());
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) this.hideHelp();
    });
    
    this.helpOverlay = overlay;
  }
  
  createOfflineIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'offline-indicator';
    indicator.id = 'offlineIndicator';
    indicator.innerHTML = '⚠ Offline';
    document.body.appendChild(indicator);
    
    this.offlineIndicator = indicator;
  }
  
  createGoToDialog() {
    const dialog = document.createElement('div');
    dialog.className = 'goto-dialog';
    dialog.id = 'gotoDialog';
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('aria-label', 'Go to slide');
    
    dialog.innerHTML = `
      <div class="goto-content">
        <h3>Go to Slide</h3>
        <input type="number" id="gotoInput" min="1" max="${this.totalSlides}" placeholder="1-${this.totalSlides}" aria-label="Slide number">
        <div class="goto-buttons">
          <button id="gotoCancel">Cancel</button>
          <button id="gotoConfirm" class="primary">Go</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(dialog);
    
    this.gotoDialog = dialog;
    this.gotoInput = document.getElementById('gotoInput');
    
    document.getElementById('gotoCancel').addEventListener('click', () => this.hideGoToDialog());
    document.getElementById('gotoConfirm').addEventListener('click', () => this.confirmGoTo());
    this.gotoInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.confirmGoTo();
      if (e.key === 'Escape') this.hideGoToDialog();
    });
  }
  
  createAnalyticsPanel() {
    const panel = document.createElement('div');
    panel.className = 'analytics-panel';
    panel.id = 'analyticsPanel';
    
    panel.innerHTML = `
      <div class="analytics-header">
        <span>📊 Presentation Analytics</span>
        <button class="analytics-close" aria-label="Close analytics">&times;</button>
      </div>
      <div class="analytics-content" id="analyticsContent">
        <div class="analytics-loading">Loading...</div>
      </div>
      <div class="analytics-actions">
        <button id="analyticsExport">Export Data</button>
        <button id="analyticsClear" class="danger">Clear Data</button>
      </div>
    `;
    
    document.body.appendChild(panel);
    
    panel.querySelector('.analytics-close').addEventListener('click', () => this.hideAnalytics());
    document.getElementById('analyticsExport').addEventListener('click', () => this.exportAnalytics());
    document.getElementById('analyticsClear').addEventListener('click', () => this.clearAnalytics());
    
    this.analyticsPanel = panel;
    this.analyticsContent = document.getElementById('analyticsContent');
  }
  
  createProgressSegments() {
    // Convert progress bar to clickable segments
    const container = document.createElement('div');
    container.className = 'progress-segments';
    container.id = 'progressSegments';
    
    for (let i = 0; i < this.totalSlides; i++) {
      const segment = document.createElement('div');
      segment.className = 'progress-segment';
      segment.dataset.slide = i;
      segment.setAttribute('role', 'button');
      segment.setAttribute('aria-label', `Go to slide ${i + 1}`);
      segment.style.width = `${100 / this.totalSlides}%`;
      
      segment.addEventListener('click', () => this.goTo(i));
      segment.addEventListener('mouseenter', () => this.showSegmentTooltip(i));
      segment.addEventListener('mouseleave', () => this.hideSegmentTooltip());
      
      container.appendChild(segment);
    }
    
    // Replace progress bar with segments
    if (this.progressBar) {
      this.progressBar.parentNode.insertBefore(container, this.progressBar);
      this.progressBar.style.display = 'none';
    }
    
    this.progressSegments = container;
  }
  
  /**
   * Phase 3: Notes data
   */
  loadNotesData() {
    // Presenter notes for each slide
    this.notesData = {
      0: "Welcome investors. This is the opening slide. Emphasize the vision of HUMAN.OS as a revolutionary approach to personal development.",
      1: "Frame the problem: people use too many disconnected tools. Share the quote to build empathy.",
      2: "Highlight the insight: proven theories exist but require manual implementation. Build anticipation for automation.",
      3: "Present the multi-agent architecture. Use the diagram to explain how agents collaborate.",
      4: "Walk through MVP features. Emphasize 70% theory coverage in v1.0.",
      5: "Show the roadmap. Highlight the phased approach and future vision modules.",
      6: "Present the $10.1B TAM. Use the chart to show market breakdown.",
      7: "Compare competitors. Emphasize our unique moat: specialization + coordination.",
      8: "Explain the three-tier pricing model. Show revenue diversification.",
      9: "Present 3-year projections. Highlight the hockey stick growth curve.",
      10: "Detail the GTM strategy in three phases. Show clear execution plan.",
      11: "Explain why OpenClaw is the perfect foundation. Emphasize speed to market.",
      12: "Show lean team requirements. 5 people × 3 months = MVP.",
      13: "Present KPIs. Show we have clear metrics for success.",
      14: "Make the ask. Be specific about funding requirements and milestones.",
      15: "Paint the long-term vision. Year 3 goal: every ambitious individual has AI agents.",
      16: "Outline next steps. Show immediate actions and timeline.",
      17: "Thank you slide. Leave contact information prominently displayed.",
      18: "Appendix: Efficiency theories. Reference if asked for technical details.",
      19: "Appendix: User personas. Reference if asked about target customers.",
      20: "Appendix: Competitive matrix. Use radar chart for visual comparison.",
      21: "Section divider. Transition slide.",
      22: "Final CTA. Strong closing with contact details."
    };
  }
  
  showSegmentTooltip(slideIndex) {
    const titles = Array.from(this.slides).map(s => 
      s.querySelector('h1, h2')?.textContent?.substring(0, 30) || `Slide ${slideIndex + 1}`
    );
    
    let tooltip = document.getElementById('segmentTooltip');
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.id = 'segmentTooltip';
      tooltip.className = 'segment-tooltip';
      document.body.appendChild(tooltip);
    }
    
    tooltip.textContent = `${slideIndex + 1}. ${titles[slideIndex]}`;
    tooltip.style.opacity = '1';
  }
  
  hideSegmentTooltip() {
    const tooltip = document.getElementById('segmentTooltip');
    if (tooltip) tooltip.style.opacity = '0';
  }
  
  /**
   * Phase 3: Service Worker for offline capability
   */
  initServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js')
        .then(registration => {
          console.log('SW registered:', registration);
        })
        .catch(error => {
          console.log('SW registration failed:', error);
          // Fallback: still work offline via caching strategies in main thread
          this.initOfflineFallback();
        });
    }
    
    // Online/offline event listeners
    window.addEventListener('online', () => this.setOnlineStatus(true));
    window.addEventListener('offline', () => this.setOnlineStatus(false));
    
    // Initial status
    this.setOnlineStatus(navigator.onLine);
  }
  
  initOfflineFallback() {
    // Basic offline detection without service worker
    this.setOnlineStatus(navigator.onLine);
  }
  
  setOnlineStatus(online) {
    if (online) {
      this.offlineIndicator.classList.remove('visible');
      document.body.classList.remove('offline');
    } else {
      this.offlineIndicator.classList.add('visible');
      document.body.classList.add('offline');
    }
  }
  
  /**
   * Phase 4: Focus Trap for Accessibility
   * Traps focus within a modal when it's open
   */
  trapFocus(element, returnFocusTo = null) {
    const focusableSelectors = [
      'button:not([disabled])',
      '[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable]'
    ].join(', ');
    
    const focusableElements = element.querySelectorAll(focusableSelectors);
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    // Store the element to return focus to
    this.returnFocusElement = returnFocusTo || document.activeElement;
    
    // Focus the first element
    setTimeout(() => firstElement.focus(), 100);
    
    // Create focus trap handler
    this.focusTrapHandler = (e) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };
    
    element.addEventListener('keydown', this.focusTrapHandler);
    
    // Store reference to remove later
    this.trappedElement = element;
  }
  
  releaseFocus() {
    if (this.trappedElement && this.focusTrapHandler) {
      this.trappedElement.removeEventListener('keydown', this.focusTrapHandler);
      this.trappedElement = null;
      this.focusTrapHandler = null;
    }
    
    // Return focus to the triggering element
    if (this.returnFocusElement && this.returnFocusElement.focus) {
      setTimeout(() => this.returnFocusElement.focus(), 100);
      this.returnFocusElement = null;
    }
  }
  
  /**
   * Phase 4: Announce to Screen Readers
   * Uses aria-live region to announce changes
   */
  announce(message, priority = 'polite') {
    const announcementRegion = document.getElementById('announcement-region');
    if (!announcementRegion) return;
    
    // Create announcement
    announcementRegion.setAttribute('aria-live', priority);
    announcementRegion.textContent = '';
    
    // Small delay to ensure the change is detected by screen readers
    setTimeout(() => {
      announcementRegion.textContent = message;
    }, 100);
    
    // Clear after announcement
    setTimeout(() => {
      announcementRegion.textContent = '';
    }, 3000);
  }
  
  /**
   * Phase 4: Announce Slide Change
   */
  announceSlideChange(slideIndex) {
    const slide = this.slides[slideIndex];
    const slideTitle = slide.querySelector('h1, h2')?.textContent || `Slide ${slideIndex + 1}`;
    const totalSlides = this.totalSlides;
    
    this.announce(`Slide ${slideIndex + 1} of ${totalSlides}: ${slideTitle}`);
  }
  saveState() {
    const state = {
      currentSlide: this.currentSlide,
      timerElapsed: this.timerState.elapsed,
      timestamp: Date.now()
    };
    localStorage.setItem('humanos-presentation-state', JSON.stringify(state));
  }
  
  loadState() {
    try {
      const saved = localStorage.getItem('humanos-presentation-state');
      if (saved) {
        const state = JSON.parse(saved);
        // Only restore if less than 24 hours old
        if (Date.now() - state.timestamp < 24 * 60 * 60 * 1000) {
          this.currentSlide = Math.max(0, Math.min(state.currentSlide || 0, this.totalSlides - 1));
          this.timerState.elapsed = state.timerElapsed || 0;
        }
      }
    } catch (e) {
      console.log('Could not load state');
    }
  }
  
  /**
   * Phase 3: Analytics
   */
  trackSlideView(slideIndex) {
    if (!this.analytics.slideViews[slideIndex]) {
      this.analytics.slideViews[slideIndex] = 0;
    }
    this.analytics.slideViews[slideIndex]++;
    this.analytics.navigationPath.push({
      slide: slideIndex,
      time: Date.now()
    });
    this.analytics.interactions++;
    
    // Save to localStorage periodically
    this.debouncedSaveAnalytics();
  }
  
  debouncedSaveAnalytics() {
    if (this.analyticsSaveTimeout) clearTimeout(this.analyticsSaveTimeout);
    this.analyticsSaveTimeout = setTimeout(() => {
      localStorage.setItem('humanos-presentation-analytics', JSON.stringify(this.analytics));
    }, 1000);
  }
  
  loadAnalytics() {
    try {
      const saved = localStorage.getItem('humanos-presentation-analytics');
      if (saved) {
        this.analytics = JSON.parse(saved);
      }
    } catch (e) {
      console.log('Could not load analytics');
    }
  }
  
  showAnalytics() {
    this.loadAnalytics();
    
    const duration = Math.floor((Date.now() - this.analytics.startTime) / 1000);
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    
    // Most viewed slides
    const viewedSlides = Object.entries(this.analytics.slideViews)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    
    let html = `
      <div class="analytics-stat">
        <span class="analytics-label">Session Duration</span>
        <span class="analytics-value">${minutes}m ${seconds}s</span>
      </div>
      <div class="analytics-stat">
        <span class="analytics-label">Total Interactions</span>
        <span class="analytics-value">${this.analytics.interactions}</span>
      </div>
      <div class="analytics-stat">
        <span class="analytics-label">Slides Viewed</span>
        <span class="analytics-value">${Object.keys(this.analytics.slideViews).length} / ${this.totalSlides}</span>
      </div>
    `;
    
    if (viewedSlides.length > 0) {
      html += '<h4>Most Viewed Slides</h4><ul class="analytics-list">';
      viewedSlides.forEach(([slide, count]) => {
        const title = this.slides[slide]?.querySelector('h1, h2')?.textContent || `Slide ${parseInt(slide) + 1}`;
        html += `<li><span>${title.substring(0, 30)}</span><span>${count} views</span></li>`;
      });
      html += '</ul>';
    }
    
    this.analyticsContent.innerHTML = html;
    this.analyticsPanel.classList.add('active');
    this.analyticsPanel.setAttribute('aria-hidden', 'false');
    
    // Phase 4: Trap focus and announce
    this.trapFocus(this.analyticsPanel);
    this.announce('Analytics panel opened. Press Escape to close.');
  }
  
  hideAnalytics() {
    this.analyticsPanel.classList.remove('active');
    this.analyticsPanel.setAttribute('aria-hidden', 'true');
    
    // Phase 4: Release focus trap
    this.releaseFocus();
  }
  
  exportAnalytics() {
    const data = {
      ...this.analytics,
      exportTime: new Date().toISOString(),
      totalSlides: this.totalSlides
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `humanos-analytics-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
  
  clearAnalytics() {
    if (confirm('Clear all analytics data?')) {
      this.analytics = {
        slideViews: {},
        navigationPath: [],
        startTime: Date.now(),
        interactions: 0
      };
      localStorage.removeItem('humanos-presentation-analytics');
      this.showAnalytics();
    }
  }
  
  preloadChartLibrary() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js';
    script.async = true;
    script.onload = () => {
      this.chartLibrary = window.Chart;
      this.configureChartDefaults();
      this.renderChartForSlide(this.currentSlide);
    };
    document.head.appendChild(script);
    
    const jspdfScript = document.createElement('script');
    jspdfScript.src = 'https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js';
    jspdfScript.async = true;
    document.head.appendChild(jspdfScript);
    
    const html2canvasScript = document.createElement('script');
    html2canvasScript.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
    html2canvasScript.async = true;
    document.head.appendChild(html2canvasScript);
  }
  
  configureChartDefaults() {
    if (!this.chartLibrary) return;
    
    const Chart = this.chartLibrary;
    const primaryColor = '#1a73e8';
    const secondaryColor = '#34a853';
    const accentColor = '#ea4335';
    
    Chart.defaults.font.family = "'Noto Sans SC', 'Inter', sans-serif";
    Chart.defaults.color = '#5f6368';
    Chart.defaults.scale.grid.color = '#e8eaed';
    Chart.defaults.plugins.tooltip.backgroundColor = '#202124';
    Chart.defaults.plugins.tooltip.padding = 12;
    Chart.defaults.plugins.tooltip.cornerRadius = 8;
    Chart.defaults.maintainAspectRatio = false;
    
    this.chartColors = {
      primary: primaryColor,
      secondary: secondaryColor,
      accent: accentColor,
      primaryLight: 'rgba(26, 115, 232, 0.7)',
      secondaryLight: 'rgba(52, 168, 83, 0.7)',
      accentLight: 'rgba(234, 67, 53, 0.7)',
      palette: [primaryColor, secondaryColor, accentColor, '#fbbc04', '#9aa0a6', '#673ab7']
    };
  }
  
  bindEvents() {
    // Keyboard navigation
    document.addEventListener('keydown', (e) => this.handleKeyDown(e));
    
    // Enhanced touch events
    document.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
    document.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });
    document.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: true });
    
    // Pinch zoom for charts
    document.addEventListener('touchmove', (e) => this.handlePinch(e), { passive: false });
    
    // Button controls
    const prevBtn = document.querySelector('.nav-btn-prev');
    const nextBtn = document.querySelector('.nav-btn-next');
    const exportBtn = document.querySelector('.export-btn');
    
    if (prevBtn) prevBtn.addEventListener('click', () => this.prev());
    if (nextBtn) nextBtn.addEventListener('click', () => this.next());
    if (exportBtn) exportBtn.addEventListener('click', () => this.exportToPDF());
    
    // Prevent default on arrow keys
    window.addEventListener('keydown', (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }
    });
    
    // Handle visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pauseAnimations();
      } else {
        this.resumeAnimations();
      }
    });
    
    // Save state on beforeunload
    window.addEventListener('beforeunload', () => this.saveState());
    
    // Periodic state save
    setInterval(() => this.saveState(), 5000);
  }
  
  handleKeyDown(e) {
    // Don't capture if in input
    if (e.target.tagName === 'INPUT') return;
    
    switch(e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
      case ' ':
      case 'PageDown':
        this.next();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
      case 'PageUp':
        this.prev();
        break;
      case 'Home':
        this.goTo(0);
        break;
      case 'End':
        this.goTo(this.totalSlides - 1);
        break;
      case 'f':
      case 'F11':
        this.toggleFullscreen();
        break;
      case 'p':
      case 'P':
        this.exportToPDF();
        break;
      case 'n':
      case 'N':
        this.toggleNotes();
        break;
      case 't':
      case 'T':
        this.toggleTimer();
        break;
      case 'g':
      case 'G':
        this.showGoToDialog();
        break;
      case 'h':
      case 'H':
      case '?':
        this.showHelp();
        break;
      case 'a':
      case 'A':
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          this.showAnalytics();
        }
        break;
      case 'Escape':
        this.hideAllOverlays();
        break;
    }
  }
  
  handleTouchStart(e) {
    this.touchStartX = e.touches[0].clientX;
    this.touchStartY = e.touches[0].clientY;
    this.touchStartTime = Date.now();
    
    // Track initial distance for pinch
    if (e.touches.length === 2) {
      this.chartZoom.initialDistance = this.getPinchDistance(e.touches);
    }
    
    // Long press detection
    this.longPressTimer = setTimeout(() => {
      this.showThumbnails();
    }, 800);
  }
  
  handleTouchMove(e) {
    // Cancel long press if moved significantly
    if (this.longPressTimer) {
      const deltaX = Math.abs(e.touches[0].clientX - this.touchStartX);
      const deltaY = Math.abs(e.touches[0].clientY - this.touchStartY);
      if (deltaX > 10 || deltaY > 10) {
        clearTimeout(this.longPressTimer);
        this.longPressTimer = null;
      }
    }
  }
  
  handleTouchEnd(e) {
    // Clear long press timer
    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer);
      this.longPressTimer = null;
    }
    
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const touchDuration = Date.now() - this.touchStartTime;
    
    const deltaX = this.touchStartX - touchEndX;
    const deltaY = this.touchStartY - touchEndY;
    
    // Double-tap detection
    if (touchDuration < 300 && Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
      if (this.lastTapTime && Date.now() - this.lastTapTime < 300) {
        this.toggleFullscreen();
        this.lastTapTime = null;
        return;
      }
      this.lastTapTime = Date.now();
    }
    
    // Swipe detection
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        this.next();
      } else {
        this.prev();
      }
    }
  }
  
  getPinchDistance(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }
  
  handlePinch(e) {
    if (e.touches.length !== 2) return;
    
    // Only zoom on chart containers
    const chartContainer = e.target.closest('.chart-container');
    if (!chartContainer) return;
    
    e.preventDefault();
    
    const currentDistance = this.getPinchDistance(e.touches);
    const scale = currentDistance / this.chartZoom.initialDistance;
    
    // Limit zoom between 1x and 3x
    const clampedScale = Math.max(1, Math.min(3, scale));
    
    chartContainer.style.transform = `scale(${clampedScale})`;
    chartContainer.style.transformOrigin = 'center center';
    
    // Reset zoom on pinch end (handled in touchend not covered here)
    if (e.type === 'touchend') {
      chartContainer.style.transform = '';
    }
  }
  
  /**
   * Phase 3: UI Controls
   */
  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.log(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }
  
  toggleNotes() {
    const isVisible = this.notesPanel.classList.contains('active');
    if (isVisible) {
      this.notesPanel.classList.remove('active');
      this.notesPanel.setAttribute('aria-hidden', 'true');
      // Phase 4: Release focus trap
      this.releaseFocus();
    } else {
      this.updateNotesContent();
      this.notesPanel.classList.add('active');
      this.notesPanel.setAttribute('aria-hidden', 'false');
      // Phase 4: Trap focus and announce
      this.trapFocus(this.notesPanel);
      this.announce('Presenter notes panel opened. Press N or Escape to close.');
    }
  }
  
  updateNotesContent() {
    const note = this.notesData[this.currentSlide];
    if (note) {
      this.notesContent.innerHTML = `<p>${note}</p>`;
    } else {
      this.notesContent.innerHTML = '<p class="notes-empty">No notes for this slide.</p>';
    }
  }
  
  toggleTimer() {
    const toggleBtn = document.getElementById('timerToggle');
    
    if (this.timerState.running) {
      // Pause
      this.timerState.running = false;
      this.timerState.elapsed += Date.now() - this.timerState.startTime;
      toggleBtn.textContent = '▶';
      toggleBtn.setAttribute('aria-label', 'Start timer');
      this.timerDisplay.classList.remove('running');
    } else {
      // Start
      this.timerState.running = true;
      this.timerState.startTime = Date.now();
      toggleBtn.textContent = '⏸';
      toggleBtn.setAttribute('aria-label', 'Pause timer');
      this.timerDisplay.classList.add('running');
      this.timerDisplay.classList.add('visible');
      this.updateTimerDisplay();
    }
  }
  
  updateTimerDisplay() {
    if (!this.timerState.running) return;
    
    const elapsed = this.timerState.elapsed + (Date.now() - this.timerState.startTime);
    const minutes = Math.floor(elapsed / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    
    this.timerState.display.textContent = 
      `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    requestAnimationFrame(() => this.updateTimerDisplay());
  }
  
  resetTimer() {
    this.timerState.running = false;
    this.timerState.elapsed = 0;
    this.timerState.startTime = 0;
    this.timerState.display.textContent = '00:00';
    document.getElementById('timerToggle').textContent = '▶';
    this.timerDisplay.classList.remove('running');
  }
  
  showThumbnails() {
    this.updateThumbnailsActiveState();
    this.thumbnailsPanel.classList.add('active');
    this.thumbnailsPanel.setAttribute('aria-hidden', 'false');
    
    // Phase 4: Trap focus and announce
    this.trapFocus(this.thumbnailsPanel);
    this.announce('Thumbnails panel opened. Use Tab to navigate, Enter to select a slide, Escape to close.');
    
    // Scroll active thumbnail into view
    const activeThumb = this.thumbnailsPanel.querySelector('.thumbnail-item.active');
    if (activeThumb) {
      activeThumb.scrollIntoView({ block: 'nearest', inline: 'center' });
    }
  }
  
  hideThumbnails() {
    this.thumbnailsPanel.classList.remove('active');
    this.thumbnailsPanel.setAttribute('aria-hidden', 'true');
    
    // Phase 4: Release focus trap
    this.releaseFocus();
  }
  
  updateThumbnailsActiveState() {
    this.thumbnailsPanel.querySelectorAll('.thumbnail-item').forEach((thumb, index) => {
      thumb.classList.toggle('active', index === this.currentSlide);
    });
  }
  
  showHelp() {
    this.helpOverlay.classList.add('active');
    this.helpOverlay.setAttribute('aria-hidden', 'false');
    
    // Phase 4: Trap focus and announce
    this.trapFocus(this.helpOverlay);
    this.announce('Help overlay opened. Press Escape to close.');
  }
  
  hideHelp() {
    this.helpOverlay.classList.remove('active');
    this.helpOverlay.setAttribute('aria-hidden', 'true');
    
    // Phase 4: Release focus trap
    this.releaseFocus();
  }
  
  showGoToDialog() {
    this.gotoDialog.classList.add('active');
    this.gotoDialog.setAttribute('aria-hidden', 'false');
    this.gotoInput.value = '';
    
    // Phase 4: Trap focus and announce
    this.trapFocus(this.gotoDialog);
    this.announce(`Go to slide dialog opened. Enter a slide number between 1 and ${this.totalSlides}.`);
    
    this.gotoInput.focus();
  }
  
  hideGoToDialog() {
    this.gotoDialog.classList.remove('active');
    this.gotoDialog.setAttribute('aria-hidden', 'true');
    
    // Phase 4: Release focus trap
    this.releaseFocus();
  }
  
  confirmGoTo() {
    const slideNum = parseInt(this.gotoInput.value, 10);
    if (slideNum >= 1 && slideNum <= this.totalSlides) {
      this.goTo(slideNum - 1);
      this.hideGoToDialog();
    }
  }
  
  hideAllOverlays() {
    this.hideThumbnails();
    this.hideHelp();
    this.hideGoToDialog();
    this.hideAnalytics();
    
    // Also hide notes panel if open
    if (this.notesPanel.classList.contains('active')) {
      this.toggleNotes();
    }
    
    // Phase 4: Ensure focus trap is released
    this.releaseFocus();
    
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }
  
  next() {
    if (this.currentSlide < this.totalSlides - 1) {
      this.goTo(this.currentSlide + 1);
    }
  }
  
  prev() {
    if (this.currentSlide > 0) {
      this.goTo(this.currentSlide - 1);
    }
  }
  
  goTo(index) {
    if (index < 0 || index >= this.totalSlides) return;
    
    const prevSlide = this.slides[this.currentSlide];
    const nextSlide = this.slides[index];
    
    this.destroyChartForSlide(this.currentSlide);
    
    prevSlide.classList.remove('active');
    prevSlide.style.willChange = 'auto';
    
    this.currentSlide = index;
    
    nextSlide.classList.add('active');
    nextSlide.style.willChange = 'transform, opacity';
    
    this.updateProgress();
    this.updateNavButtons();
    this.triggerStaggeredAnimations();
    this.renderChartForSlide(this.currentSlide);
    this.updateNotesContent();
    this.updateThumbnailsActiveState();
    this.trackSlideView(this.currentSlide);
    this.saveState();
    
    // Phase 4: Announce slide change to screen readers
    this.announceSlideChange(this.currentSlide);
    
    nextSlide.scrollTop = 0;
  }
  
  triggerStaggeredAnimations() {
    this.animationFrameIds.forEach(id => cancelAnimationFrame(id));
    this.animationFrameIds = [];
    
    const activeSlide = this.slides[this.currentSlide];
    const animatedElements = Array.from(activeSlide.querySelectorAll('[class*="animate-"]'));
    
    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translate3d(0, 30px, 0)';
      el.style.animation = 'none';
    });
    
    const staggerDelay = 50;
    let currentIndex = 0;
    
    const animateNext = () => {
      if (currentIndex >= animatedElements.length) return;
      
      const el = animatedElements[currentIndex];
      el.style.animation = '';
      el.style.opacity = '';
      el.style.transform = '';
      
      currentIndex++;
      
      const frameId = requestAnimationFrame(() => {
        setTimeout(animateNext, staggerDelay);
      });
      this.animationFrameIds.push(frameId);
    };
    
    const startFrameId = requestAnimationFrame(() => {
      setTimeout(animateNext, 50);
    });
    this.animationFrameIds.push(startFrameId);
  }
  
  pauseAnimations() {
    this.animationFrameIds.forEach(id => cancelAnimationFrame(id));
  }
  
  resumeAnimations() {
    // Animations resume on next slide change
  }
  
  updateProgress() {
    const progress = ((this.currentSlide + 1) / this.totalSlides) * 100;
    
    if (this.progressBar) {
      this.progressBar.style.width = `${progress}%`;
      // Phase 4: Update ARIA values for accessibility
      this.progressBar.setAttribute('aria-valuenow', this.currentSlide + 1);
      this.progressBar.setAttribute('aria-valuetext', `Slide ${this.currentSlide + 1} of ${this.totalSlides}`);
    }
    
    if (this.progressSegments) {
      this.progressSegments.querySelectorAll('.progress-segment').forEach((seg, index) => {
        seg.classList.toggle('active', index <= this.currentSlide);
        seg.classList.toggle('current', index === this.currentSlide);
        // Phase 4: Update aria-current for current segment
        seg.setAttribute('aria-current', index === this.currentSlide ? 'step' : 'false');
      });
    }
    
    if (this.slideCounter) {
      this.slideCounter.textContent = `${this.currentSlide + 1} / ${this.totalSlides}`;
    }
  }
  
  updateNavButtons() {
    const prevBtn = document.querySelector('.nav-btn-prev');
    const nextBtn = document.querySelector('.nav-btn-next');
    
    if (prevBtn) prevBtn.disabled = this.currentSlide === 0;
    if (nextBtn) nextBtn.disabled = this.currentSlide === this.totalSlides - 1;
  }
  
  renderChartForSlide(slideIndex) {
    if (!this.chartLibrary) return;
    
    const slide = this.slides[slideIndex];
    const chartType = slide.dataset.chart;
    
    if (!chartType) return;
    
    switch(chartType) {
      case 'market':
        this.renderMarketChart();
        break;
      case 'revenue':
        this.renderRevenueChart();
        break;
      case 'competitive':
        this.renderCompetitiveChart();
        break;
    }
  }
  
  destroyChartForSlide(slideIndex) {
    const chart = this.charts.get(slideIndex);
    if (chart) {
      chart.destroy();
      this.charts.delete(slideIndex);
    }
  }
  
  renderMarketChart() {
    const canvas = document.getElementById('marketChart');
    if (!canvas || this.charts.has(this.currentSlide)) return;
    
    const ctx = canvas.getContext('2d');
    const Chart = this.chartLibrary;
    
    const chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Personalized Learning', 'Virtual Tutors', 'AI Assessment'],
        datasets: [{
          data: [4.8, 3.2, 2.1],
          backgroundColor: [
            this.chartColors.primary,
            this.chartColors.secondary,
            this.chartColors.accent
          ],
          borderWidth: 0,
          hoverOffset: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              usePointStyle: true,
              generateLabels: (chart) => {
                const data = chart.data;
                return data.labels.map((label, i) => ({
                  text: `${label}: $${data.datasets[0].data[i]}B`,
                  fillStyle: data.datasets[0].backgroundColor[i],
                  hidden: false,
                  index: i
                }));
              }
            }
          },
          title: {
            display: true,
            text: 'Market Segments ($10.1B Total)',
            font: { size: 16, weight: '600' },
            padding: { bottom: 20 }
          },
          tooltip: {
            callbacks: {
              label: (context) => ` ${context.label}: $${context.raw}B (${((context.raw/10.1)*100).toFixed(1)}%)`
            }
          }
        }
      }
    });
    
    this.charts.set(this.currentSlide, chart);
  }
  
  renderRevenueChart() {
    const canvas = document.getElementById('revenueChart');
    if (!canvas || this.charts.has(this.currentSlide)) return;
    
    const ctx = canvas.getContext('2d');
    const Chart = this.chartLibrary;
    
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, this.chartColors.primaryLight);
    gradient.addColorStop(1, 'rgba(26, 115, 232, 0.1)');
    
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Year 1', 'Year 2', 'Year 3'],
        datasets: [
          {
            label: 'ARR ($M)',
            data: [1.2, 5, 10],
            backgroundColor: this.chartColors.primary,
            borderRadius: 8,
            barPercentage: 0.6
          },
          {
            label: 'Customers (×1,000)',
            data: [5, 20, 50],
            backgroundColor: this.chartColors.secondaryLight,
            borderRadius: 8,
            barPercentage: 0.6,
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: { padding: 20, usePointStyle: true }
          },
          title: {
            display: true,
            text: '3-Year Growth Projection',
            font: { size: 16, weight: '600' },
            padding: { bottom: 20 }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: 'ARR ($M)' },
            grid: { color: 'rgba(0,0,0,0.05)' }
          },
          y1: {
            position: 'right',
            beginAtZero: true,
            title: { display: true, text: 'Customers (×1,000)' },
            grid: { drawOnChartArea: false }
          },
          x: {
            grid: { display: false }
          }
        }
      }
    });
    
    this.charts.set(this.currentSlide, chart);
  }
  
  renderCompetitiveChart() {
    const canvas = document.getElementById('competitiveChart');
    if (!canvas || this.charts.has(this.currentSlide)) return;
    
    const ctx = canvas.getContext('2d');
    const Chart = this.chartLibrary;
    
    const chart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Multi-Agent', '24/7 Available', 'Proactive', 'Cross-Domain', 'Affordable', 'Personalized', 'Privacy-First'],
        datasets: [
          {
            label: 'HUMAN.OS',
            data: [100, 100, 100, 100, 90, 95, 100],
            backgroundColor: 'rgba(26, 115, 232, 0.2)',
            borderColor: this.chartColors.primary,
            borderWidth: 2,
            pointBackgroundColor: this.chartColors.primary,
            pointRadius: 4
          },
          {
            label: 'ChatGPT',
            data: [0, 100, 0, 0, 100, 90, 0],
            backgroundColor: 'rgba(251, 188, 4, 0.2)',
            borderColor: '#fbbc04',
            borderWidth: 2,
            pointBackgroundColor: '#fbbc04',
            pointRadius: 4
          },
          {
            label: 'Human Coaching',
            data: [0, 0, 80, 100, 0, 100, 90],
            backgroundColor: 'rgba(234, 67, 53, 0.2)',
            borderColor: this.chartColors.accent,
            borderWidth: 2,
            pointBackgroundColor: this.chartColors.accent,
            pointRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { padding: 20, usePointStyle: true }
          },
          title: {
            display: true,
            text: 'Competitive Feature Comparison',
            font: { size: 16, weight: '600' },
            padding: { bottom: 20 }
          }
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: {
              display: false,
              stepSize: 20
            },
            grid: {
              color: 'rgba(0,0,0,0.1)'
            },
            pointLabels: {
              font: { size: 12, weight: '500' }
            }
          }
        }
      }
    });
    
    this.charts.set(this.currentSlide, chart);
  }
  
  async exportToPDF() {
    const overlay = document.getElementById('exportOverlay');
    const status = document.getElementById('exportStatus');
    const progressFill = document.getElementById('exportProgressFill');
    
    if (typeof html2canvas === 'undefined' || typeof jspdf === 'undefined') {
      alert('Export libraries are still loading. Please try again in a moment.');
      return;
    }
    
    const { jsPDF } = jspdf;
    
    overlay.classList.add('active');
    
    const originalSlide = this.currentSlide;
    
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [297, 167]
    });
    
    try {
      for (let i = 0; i < this.totalSlides; i++) {
        status.textContent = `Capturing slide ${i + 1} of ${this.totalSlides}`;
        progressFill.style.width = `${((i + 1) / this.totalSlides) * 100}%`;
        
        this.goTo(i);
        
        await new Promise(resolve => setTimeout(resolve, 600));
        
        this.renderChartForSlide(i);
        await new Promise(resolve => setTimeout(resolve, 400));
        
        const slide = this.slides[i];
        const canvas = await html2canvas(slide, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          logging: false,
          width: slide.offsetWidth,
          height: slide.offsetHeight
        });
        
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        
        if (i > 0) {
          pdf.addPage();
        }
        
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      }
      
      pdf.save('HUMAN.OS-Pitch-Deck.pdf');
      
    } catch (error) {
      console.error('PDF Export error:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      overlay.classList.remove('active');
      this.goTo(originalSlide);
    }
  }
  
  destroy() {
    this.charts.forEach(chart => chart.destroy());
    this.charts.clear();
    this.animationFrameIds.forEach(id => cancelAnimationFrame(id));
    this.slides.forEach(slide => {
      slide.style.willChange = 'auto';
    });
  }
}

// Initialize presentation
document.addEventListener('DOMContentLoaded', () => {
  window.presentation = new Presentation();
  
  window.addEventListener('beforeunload', () => {
    if (window.presentation) {
      window.presentation.saveState();
      window.presentation.destroy();
    }
  });
});
