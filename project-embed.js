/**
 * ProjectEmbed Component
 * Embeds GitHub Pages projects in a macOS-style browser window
 * 
 * Usage:
 *   ProjectEmbed.create({
 *     title: "Project Name",
 *     url: "https://username.github.io/project/",
 *     description: "Optional description"
 *   })
 * 
 * Or for multiple projects:
 *   ProjectEmbed.createMultiple([
 *     { title: "Project 1", url: "https://..." },
 *     { title: "Project 2", url: "https://..." }
 *   ])
 */

const ProjectEmbed = {
  /**
   * Create a single project embed
   * @param {Object} project - Project configuration
   * @param {string} project.title - Project title
   * @param {string} project.url - GitHub Pages URL
   * @param {string} [project.description] - Optional description
   * @param {string} [project.containerId] - Optional container ID (default: auto-generated)
   * @returns {HTMLElement} The created embed element
   */
  create(project) {
    if (!project || !project.url || !project.title) {
      console.error('ProjectEmbed: title and url are required');
      return null;
    }

    const container = document.createElement('div');
    container.className = 'project-embed-container';
    const containerId = project.containerId || `project-embed-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    container.id = containerId;

    // Create browser chrome
    const browserChrome = this._createBrowserChrome(project.url);
    
    // Create iframe container
    const iframeContainer = this._createIframeContainer(project.url);
    
    // Create project info
    const projectInfo = this._createProjectInfo(project);

    // Assemble wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'project-embed-wrapper';
    wrapper.appendChild(browserChrome);
    wrapper.appendChild(iframeContainer);
    wrapper.appendChild(projectInfo);

    container.appendChild(wrapper);

    // Handle iframe loading
    this._handleIframeLoad(iframeContainer, project.url);

    return container;
  },

  /**
   * Create multiple project embeds in a grid
   * @param {Array} projects - Array of project configurations
   * @param {HTMLElement|string} container - Container element or selector
   */
  createMultiple(projects, container) {
    if (!Array.isArray(projects) || projects.length === 0) {
      console.error('ProjectEmbed: projects must be a non-empty array');
      return;
    }

    const containerEl = typeof container === 'string' 
      ? document.querySelector(container) 
      : container;

    if (!containerEl) {
      console.error('ProjectEmbed: container not found');
      return;
    }

    // Create grid container
    const grid = document.createElement('div');
    grid.className = 'projects-embed-grid';

    // Create each project embed
    projects.forEach((project, index) => {
      const embed = this.create(project);
      if (embed) {
        grid.appendChild(embed);
      }
    });

    containerEl.appendChild(grid);

    // Animate in
    setTimeout(() => {
      const embeds = grid.querySelectorAll('.project-embed-container');
      embeds.forEach((embed, index) => {
        setTimeout(() => {
          embed.classList.add('visible');
        }, index * 100);
      });
    }, 100);
  },

  /**
   * Create browser chrome with macOS-style dots
   * @private
   */
  _createBrowserChrome(url) {
    const chrome = document.createElement('div');
    chrome.className = 'browser-chrome';

    // Browser dots
    const dots = document.createElement('div');
    dots.className = 'browser-dots';
    
    const redDot = document.createElement('div');
    redDot.className = 'browser-dot red';
    redDot.setAttribute('aria-label', 'Close');
    
    const yellowDot = document.createElement('div');
    yellowDot.className = 'browser-dot yellow';
    yellowDot.setAttribute('aria-label', 'Minimize');
    
    const greenDot = document.createElement('div');
    greenDot.className = 'browser-dot green';
    greenDot.setAttribute('aria-label', 'Maximize');

    dots.appendChild(redDot);
    dots.appendChild(yellowDot);
    dots.appendChild(greenDot);

    // URL bar
    const urlBar = document.createElement('div');
    urlBar.className = 'browser-url';
    urlBar.textContent = url;
    urlBar.setAttribute('title', url);

    chrome.appendChild(dots);
    chrome.appendChild(urlBar);

    return chrome;
  },

  /**
   * Create iframe container with loading state
   * @private
   */
  _createIframeContainer(url) {
    const container = document.createElement('div');
    
    // Always use the same base class - responsive handled by CSS
    container.className = 'iframe-container';
    
    // Force exact height with inline styles to override everything
    const isMobile = window.innerWidth <= 480;
    const isTablet = window.innerWidth > 480 && window.innerWidth <= 768;
    
    if (isMobile) {
      container.style.height = '450px';
      container.style.minHeight = '450px';
      container.style.maxHeight = '450px';
      container.classList.add('mobile');
    } else if (isTablet) {
      container.style.height = '500px';
      container.style.minHeight = '500px';
      container.style.maxHeight = '500px';
      container.classList.add('tablet');
    } else {
      container.style.height = '600px';
      container.style.minHeight = '600px';
      container.style.maxHeight = '600px';
      container.classList.add('desktop');
    }
    
    // Force flex constraints
    container.style.flexShrink = '0';
    container.style.flexGrow = '0';
    container.style.boxSizing = 'border-box';

    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-forms allow-popups allow-modals');
    iframe.setAttribute('loading', 'lazy');
    iframe.setAttribute('title', 'Project Preview');
    
    // Force iframe to fill container
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.display = 'block';
    iframe.style.border = 'none';

    // Create loading skeleton
    const loading = document.createElement('div');
    loading.className = 'iframe-loading';
    const loadingText = document.createElement('div');
    loadingText.className = 'iframe-loading-text';
    loadingText.textContent = 'Loading project...';
    loading.appendChild(loadingText);

    // Create error state
    const error = document.createElement('div');
    error.className = 'iframe-error hidden';
    const errorMessage = document.createElement('div');
    errorMessage.className = 'iframe-error-message';
    errorMessage.textContent = 'Unable to load project preview.';
    const errorLink = document.createElement('a');
    errorLink.className = 'iframe-error-link';
    errorLink.href = url;
    errorLink.target = '_blank';
    errorLink.rel = 'noopener noreferrer';
    errorLink.textContent = 'Open in new tab →';
    error.appendChild(errorMessage);
    error.appendChild(errorLink);

    container.appendChild(iframe);
    container.appendChild(loading);
    container.appendChild(error);

    return container;
  },

  /**
   * Create project info section
   * @private
   */
  _createProjectInfo(project) {
    const info = document.createElement('div');
    info.className = 'project-embed-info';

    const title = document.createElement('h3');
    title.className = 'project-embed-title';
    title.textContent = project.title;

    info.appendChild(title);

    if (project.description) {
      const description = document.createElement('p');
      description.className = 'project-embed-description';
      description.textContent = project.description;
      info.appendChild(description);
    }

    const link = document.createElement('a');
    link.className = 'project-embed-link';
    link.href = project.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = 'View Live Project →';
    info.appendChild(link);

    return info;
  },

  /**
   * Handle iframe loading states
   * @private
   */
  _handleIframeLoad(container, url) {
    const iframe = container.querySelector('iframe');
    const loading = container.querySelector('.iframe-loading');
    const error = container.querySelector('.iframe-error');

    // Set timeout for loading (10 seconds)
    const loadTimeout = setTimeout(() => {
      if (loading && !loading.classList.contains('hidden')) {
        loading.classList.add('hidden');
        if (error) {
          error.classList.remove('hidden');
        }
      }
    }, 10000);

    // Handle successful load
    iframe.addEventListener('load', () => {
      clearTimeout(loadTimeout);
      if (loading) {
        loading.classList.add('hidden');
      }
      if (error) {
        error.classList.add('hidden');
      }
    });

    // Handle load error
    iframe.addEventListener('error', () => {
      clearTimeout(loadTimeout);
      if (loading) {
        loading.classList.add('hidden');
      }
      if (error) {
        error.classList.remove('hidden');
      }
    });
  },

  /**
   * Initialize responsive behavior
   */
  init() {
    // Update iframe container classes and inline styles on resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const containers = document.querySelectorAll('.iframe-container');
        containers.forEach(container => {
          const isMobile = window.innerWidth <= 480;
          const isTablet = window.innerWidth > 480 && window.innerWidth <= 768;
          
          // Remove all responsive classes
          container.classList.remove('mobile', 'tablet', 'desktop');
          
          // Set inline styles and class based on viewport
          if (isMobile) {
            container.style.height = '450px';
            container.style.minHeight = '450px';
            container.style.maxHeight = '450px';
            container.classList.add('mobile');
          } else if (isTablet) {
            container.style.height = '500px';
            container.style.minHeight = '500px';
            container.style.maxHeight = '500px';
            container.classList.add('tablet');
          } else {
            container.style.height = '600px';
            container.style.minHeight = '600px';
            container.style.maxHeight = '600px';
            container.classList.add('desktop');
          }
          
          // Ensure flex constraints
          container.style.flexShrink = '0';
          container.style.flexGrow = '0';
        });
      }, 250);
    });
  }
};

// Auto-initialize on DOM load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    ProjectEmbed.init();
  });
} else {
  ProjectEmbed.init();
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ProjectEmbed;
}

// Make available globally
window.ProjectEmbed = ProjectEmbed;

