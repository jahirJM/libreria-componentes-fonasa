// Mock ResizeObserver (no existe en jsdom)
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock IntersectionObserver (no existe en jsdom)
global.IntersectionObserver = class {
  constructor(callback) {
    this._callback = callback;
  }
  observe() {
    this._callback([{ isIntersecting: true }]);
  }
  unobserve() {}
  disconnect() {}
};

// Mock window.matchMedia (no existe en jsdom)
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});
