document.addEventListener('DOMContentLoaded', () => {
    // Lazy load images
    const imgs = document.querySelectorAll('figure img[loading="lazy"]');

    imgs.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });
});

class HighlightAnimation {
    constructor(options = {}) {
      this.selector = options.selector || '.highlight-text';
      this.animationClass = options.animationClass || 'highlight-animate';
      this.duration = options.duration || 500;
      this.delay = options.delay || 100;
      this.charMultiplier = options.charMultiplier || 10;
      this.minDuration = options.minDuration || 500;
      this.threshold = options.threshold || 0.5;
  
      this.animationQueue = [];
      this.isProcessingQueue = false;
  
      this.init();
    }
  
    init() {
      const elements = document.querySelectorAll(this.selector);
      this.setupObserver();
      elements.forEach(el => this.observer.observe(el));
    }
  
    setupObserver() {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animationQueue.push(entry.target);
            this.observer.unobserve(entry.target);
  
            if (!this.isProcessingQueue) {
              this.processAnimationQueue();
            }
          }
        });
      }, { threshold: this.threshold });
    }
  
    processAnimationQueue() {
      if (this.animationQueue.length === 0) {
        this.isProcessingQueue = false;
        return;
      }
  
      this.isProcessingQueue = true;
      const element = this.animationQueue.shift();
      const text = element.textContent;
      const charCount = text.length;
      
      const duration = Math.max(charCount * this.charMultiplier, this.minDuration);
      
      element.style.setProperty('--highlight-duration', `${duration}ms`);
      element.classList.add(this.animationClass);
  
      setTimeout(() => {
        this.processAnimationQueue();
      }, this.delay);
    }
  }
  
  // Exportar a classe para uso global
  window.HighlightAnimation = HighlightAnimation;