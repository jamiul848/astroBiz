/**
 * Simple Client-Side Router
 * Manages page navigation without external dependencies
 */
export class Router {
  constructor(options = {}) {
    this.routes = new Map();
    this.currentRoute = null;
    this.onRouteChange = options.onRouteChange || (() => {});
    this.defaultRoute = options.defaultRoute || 'dashboard';
    this.rootSelector = options.rootSelector || '#workspace';
    this.root = document.querySelector(this.rootSelector);
  }

  /**
   * Register a route
   */
  register(path, handler) {
    this.routes.set(path, handler);
    return this;
  }

  /**
   * Navigate to a route
   */
  navigate(path) {
    if (!this.routes.has(path)) {
      console.warn(`Route not found: ${path}`);
      return false;
    }

    this.currentRoute = path;
    this.root.innerHTML = '';
    
    const handler = this.routes.get(path);
    const content = handler();
    
    if (content instanceof HTMLElement) {
      this.root.appendChild(content);
    } else if (typeof content === 'string') {
      this.root.innerHTML = content;
    }

    this.onRouteChange(path);
    return true;
  }

  /**
   * Get current route
   */
  getCurrentRoute() {
    return this.currentRoute;
  }

  /**
   * Start with default route
   */
  start() {
    this.navigate(this.defaultRoute);
  }
}
