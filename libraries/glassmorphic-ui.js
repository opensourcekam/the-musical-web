// Glassmorphic UI Behavior Controller
class GlassmorphicUI {
  constructor() {
    this.overlays = [];
    this.isVisible = true;
    this.scrollThreshold = 100; // pixels from top to show overlays
    this.hideTimeout = null;
    this.init();
  }

  init() {
    // Find all glassmorphic overlays
    this.overlays = document.querySelectorAll('.glass-nav, .glass-project-info, .glass-controls, .glass-audio-controls, .glass-camera-controls, .glass-wave-data, .glass-debug, .glass-info, .glass-audio-info');
    
    if (this.overlays.length === 0) return;

    // Set initial state
    this.setOverlaysVisible(true);

    // Hide overlays after 2 seconds
    this.hideTimeout = setTimeout(() => {
      this.hideOverlays();
    }, 2000);

    // Add scroll event listener
    window.addEventListener('scroll', this.handleScroll.bind(this));
    
    // Add mouse move event listener to show overlays temporarily
    document.addEventListener('mousemove', this.handleMouseMove.bind(this));
    
    // Add touch event listener for mobile
    document.addEventListener('touchstart', this.handleTouch.bind(this));
  }

  setOverlaysVisible(visible) {
    this.isVisible = visible;
    this.overlays.forEach(overlay => {
      if (visible) {
        overlay.style.opacity = '1';
        overlay.style.pointerEvents = 'auto';
      } else {
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
      }
    });
  }

  hideOverlays() {
    this.setOverlaysVisible(false);
  }

  showOverlays() {
    this.setOverlaysVisible(true);
    
    // Clear existing timeout
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }
    
    // Hide again after 2 seconds
    this.hideTimeout = setTimeout(() => {
      this.hideOverlays();
    }, 2000);
  }

  handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop <= this.scrollThreshold) {
      // Near the top of the page, show overlays
      if (!this.isVisible) {
        this.showOverlays();
      }
    }
  }

  handleMouseMove(event) {
    // Show overlays when mouse moves near the top of the screen
    if (event.clientY <= 100 && !this.isVisible) {
      this.showOverlays();
    }
  }

  handleTouch(event) {
    // Show overlays on touch near the top of the screen
    if (event.touches[0].clientY <= 100 && !this.isVisible) {
      this.showOverlays();
    }
  }

  // Method to manually show overlays (useful for debugging)
  forceShow() {
    this.showOverlays();
  }

  // Method to manually hide overlays
  forceHide() {
    this.hideOverlays();
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Add CSS for smooth transitions
  const style = document.createElement('style');
  style.textContent = `
    .glass-nav, .glass-project-info, .glass-controls, .glass-audio-controls, 
    .glass-camera-controls, .glass-wave-data, .glass-debug, .glass-info, .glass-audio-info {
      transition: opacity 0.3s ease-in-out;
    }
  `;
  document.head.appendChild(style);

  // Initialize the glassmorphic UI controller
  window.glassmorphicUI = new GlassmorphicUI();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GlassmorphicUI;
} 