// main.js - SPA Router and Bootstrap Manager
import { LoadingPage } from '../pages/loading';
import { HomePage } from '../pages/home';
import { MapPage } from '../pages/map';
import { BusDetailsPage } from '../pages/bus-details';
import { AlertsPage } from '../pages/alerts';
import { ProfilePage } from '../pages/profile';

const routes = {
  '/loading': LoadingPage,
  '/home': HomePage,
  '/map': MapPage,
  '/bus-details': BusDetailsPage,
  '/alerts': AlertsPage,
  '/profile': ProfilePage
};

let activePage = null;

function parseHash() {
  const hash = window.location.hash || '#/loading';
  const [path, queryString] = hash.split('?');
  const route = path.replace(/^#/, '') || '/loading';
  
  const params = {};
  if (queryString) {
    queryString.split('&').forEach(param => {
      const [key, value] = param.split('=');
      params[decodeURIComponent(key)] = decodeURIComponent(value);
    });
  }
  return { route, params };
}

function updateNavigation(route) {
  const navbar = document.getElementById('app-navbar');
  if (!navbar) return;

  // Hide navbar on loading screen
  if (route === '/loading') {
    navbar.classList.add('hidden');
    return;
  }
  navbar.classList.remove('hidden');

  // Clear active classes from all nav links
  const navIds = ['nav-home', 'nav-map', 'nav-alerts', 'nav-profile'];
  navIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.className = "flex flex-col items-center justify-center text-on-surface-variant dark:text-secondary-fixed-dim opacity-70 hover:opacity-100 active:scale-90 transition-all duration-150 rounded-xl px-4 py-1";
      const icon = el.querySelector('.material-symbols-outlined');
      if (icon) icon.style.fontVariationSettings = "'FILL' 0";
    }
  });

  // Determine which nav item is active
  let activeNavId = '';
  if (route === '/home') activeNavId = 'nav-home';
  else if (route === '/map' || route === '/bus-details') activeNavId = 'nav-map';
  else if (route === '/alerts') activeNavId = 'nav-alerts';
  else if (route === '/profile') activeNavId = 'nav-profile';

  // Apply active style to selected nav item
  const activeEl = document.getElementById(activeNavId);
  if (activeEl) {
    activeEl.className = "flex flex-col items-center justify-center bg-primary-container/20 text-primary dark:text-primary-fixed rounded-xl px-4 py-1 active:scale-90 transition-transform duration-150 font-semibold";
    const icon = activeEl.querySelector('.material-symbols-outlined');
    if (icon) icon.style.fontVariationSettings = "'FILL' 1";
  }
}

function router() {
  const { route, params } = parseHash();
  const page = routes[route] || HomePage; // Fallback to Home

  // Unmount previous page
  if (activePage && typeof activePage.unmount === 'function') {
    activePage.unmount();
  }

  // Update layout navigation highlights
  updateNavigation(route);

  // Render view
  const appContent = document.getElementById('app-content');
  if (appContent) {
    appContent.innerHTML = page.render(params);
    activePage = page;
    
    // Reset scroll position to top on page navigation
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    
    // Mount page logic
    if (typeof page.mount === 'function') {
      page.mount(params);
    }
  }
}

// Listen for route changes
window.addEventListener('hashchange', router);

// Bootstrap application
const bootstrap = () => {
  const currentHash = window.location.hash;
  if (currentHash && currentHash !== '#/loading') {
    sessionStorage.setItem('redirect_target', currentHash);
  }
  
  window.location.hash = '#/loading';
  router();
};

if (document.readyState === "loading") {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
