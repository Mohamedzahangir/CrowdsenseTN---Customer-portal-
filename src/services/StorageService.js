// StorageService.js - Handles client local storage data persistence.

const KEYS = {
  SAVED_ROUTES: "crowdsense_saved_routes",
  RECENT_SEARCHES: "crowdsense_recent_searches",
  PROFILE: "crowdsense_user_profile"
};

// Default setup if nothing is saved
const defaultSavedRoutes = [
  { id: "route-1", label: "Work Route", desc: "Route 102 • 15 mins", busId: "102" },
  { id: "route-2", label: "Tidel Office", desc: "Route 47A • 22 mins", busId: "47A" }
];

const defaultRecentSearches = [
  { source: "Anna Salai", destination: "Tidel Park" },
  { source: "Saidapet", destination: "Guindy Estate" }
];

const defaultProfile = {
  name: "Marcus Thorne",
  transitId: "TN-8829-X",
  role: "Regular Commuter",
  tripsCount: 42,
  timeSaved: "12.5h",
  co2Offset: "14kg",
  avoidanceScore: "88%"
};

export const StorageService = {
  getSavedRoutes() {
    const data = localStorage.getItem(KEYS.SAVED_ROUTES);
    if (!data) {
      localStorage.setItem(KEYS.SAVED_ROUTES, JSON.stringify(defaultSavedRoutes));
      return defaultSavedRoutes;
    }
    return JSON.parse(data);
  },

  saveRoute(route) {
    const routes = this.getSavedRoutes();
    // Prevent duplicates
    if (!routes.some(r => r.busId === route.busId)) {
      routes.push(route);
      localStorage.setItem(KEYS.SAVED_ROUTES, JSON.stringify(routes));
    }
  },

  removeRoute(busId) {
    let routes = this.getSavedRoutes();
    routes = routes.filter(r => r.busId !== busId);
    localStorage.setItem(KEYS.SAVED_ROUTES, JSON.stringify(routes));
  },

  getRecentSearches() {
    const data = localStorage.getItem(KEYS.RECENT_SEARCHES);
    if (!data) {
      localStorage.setItem(KEYS.RECENT_SEARCHES, JSON.stringify(defaultRecentSearches));
      return defaultRecentSearches;
    }
    return JSON.parse(data);
  },

  addRecentSearch(search) {
    const searches = this.getRecentSearches();
    // Filter duplicates
    const filtered = searches.filter(
      s => !(s.source.toLowerCase() === search.source.toLowerCase() && 
             s.destination.toLowerCase() === search.destination.toLowerCase())
    );
    filtered.unshift(search);
    // Limit to 5 entries
    const limited = filtered.slice(0, 5);
    localStorage.setItem(KEYS.RECENT_SEARCHES, JSON.stringify(limited));
  },

  clearRecentSearches() {
    localStorage.setItem(KEYS.RECENT_SEARCHES, JSON.stringify([]));
  },

  getProfile() {
    const data = localStorage.getItem(KEYS.PROFILE);
    if (!data) {
      localStorage.setItem(KEYS.PROFILE, JSON.stringify(defaultProfile));
      return defaultProfile;
    }
    return JSON.parse(data);
  },

  updateProfile(profileData) {
    const current = this.getProfile();
    const updated = { ...current, ...profileData };
    localStorage.setItem(KEYS.PROFILE, JSON.stringify(updated));
    return updated;
  }
};
