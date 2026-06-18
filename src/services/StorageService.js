// StorageService.js - Handles client local storage data persistence with Supabase syncing.
import { supabase } from './supabaseClient';

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

// Start async synchronization loops for commuter profile and saved routes
if (typeof window !== 'undefined') {
  // Sync Profile
  supabase.from('commuters').select('*').eq('id', 'c1').single().then(({ data: commuter }) => {
    if (commuter) {
      supabase.from('commuter_analytics').select('*').eq('commuter_id', 'c1').single().then(({ data: analytics }) => {
        const profile = {
          name: commuter.name,
          transitId: commuter.transit_id,
          role: commuter.role,
          tripsCount: analytics ? analytics.trips_count : 0,
          timeSaved: analytics ? analytics.time_saved : '0h',
          co2Offset: analytics ? analytics.co2_offset : '0kg',
          avoidanceScore: analytics ? analytics.avoidance_score : '100%'
        };
        localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
        window.dispatchEvent(new CustomEvent("crowdsense_store_updated", { detail: { key: KEYS.PROFILE } }));
      });
    }
  });

  // Sync Saved Routes
  supabase.from('saved_routes').select('*, routes(*)').eq('commuter_id', 'c1').then(({ data }) => {
    if (data) {
      const formatted = data.map(sr => ({
        id: sr.id,
        label: sr.label,
        busId: sr.route_number,
        desc: `Route ${sr.route_number} • 15 mins`
      }));
      localStorage.setItem(KEYS.SAVED_ROUTES, JSON.stringify(formatted));
      window.dispatchEvent(new CustomEvent("crowdsense_store_updated", { detail: { key: KEYS.SAVED_ROUTES } }));
    }
  });
}

export const StorageService = {
  getSavedRoutes() {
    const data = localStorage.getItem(KEYS.SAVED_ROUTES);
    if (!data) {
      localStorage.setItem(KEYS.SAVED_ROUTES, JSON.stringify(defaultSavedRoutes));
      return defaultSavedRoutes;
    }
    return JSON.parse(data);
  },

  async saveRoute(route) {
    const routes = this.getSavedRoutes();
    if (!routes.some(r => r.busId === route.busId)) {
      routes.push(route);
      localStorage.setItem(KEYS.SAVED_ROUTES, JSON.stringify(routes));
      window.dispatchEvent(new CustomEvent("crowdsense_store_updated", { detail: { key: KEYS.SAVED_ROUTES } }));

      // Push to Supabase
      const { error } = await supabase.from('saved_routes').insert([{
        id: route.id || 'sr_' + Date.now(),
        commuter_id: 'c1',
        route_number: route.busId,
        label: route.label
      }]);
      if (error) console.error("Error saving route in Supabase:", error);
    }
  },

  async removeRoute(busId) {
    let routes = this.getSavedRoutes();
    routes = routes.filter(r => r.busId !== busId);
    localStorage.setItem(KEYS.SAVED_ROUTES, JSON.stringify(routes));
    window.dispatchEvent(new CustomEvent("crowdsense_store_updated", { detail: { key: KEYS.SAVED_ROUTES } }));

    // Delete from Supabase
    const { error } = await supabase.from('saved_routes').delete().eq('commuter_id', 'c1').eq('route_number', busId);
    if (error) console.error("Error removing route in Supabase:", error);
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
    const filtered = searches.filter(
      s => !(s.source.toLowerCase() === search.source.toLowerCase() && 
             s.destination.toLowerCase() === search.destination.toLowerCase())
    );
    filtered.unshift(search);
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

  async updateProfile(profileData) {
    const current = this.getProfile();
    const updated = { ...current, ...profileData };
    localStorage.setItem(KEYS.PROFILE, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("crowdsense_store_updated", { detail: { key: KEYS.PROFILE } }));

    // Sync to Supabase
    if (profileData.name || profileData.role || profileData.transitId) {
      const dbFields = {};
      if (profileData.name) dbFields.name = profileData.name;
      if (profileData.role) dbFields.role = profileData.role;
      if (profileData.transitId) dbFields.transit_id = profileData.transitId;

      const { error } = await supabase.from('commuters').update(dbFields).eq('id', 'c1');
      if (error) console.error("Error updating commuter profile in Supabase:", error);
    }

    if (profileData.tripsCount || profileData.timeSaved || profileData.co2Offset || profileData.avoidanceScore) {
      const dbFields = {};
      if (profileData.tripsCount) dbFields.trips_count = profileData.tripsCount;
      if (profileData.timeSaved) dbFields.time_saved = profileData.timeSaved;
      if (profileData.co2Offset) dbFields.co2_offset = profileData.co2Offset;
      if (profileData.avoidanceScore) dbFields.avoidance_score = profileData.avoidanceScore;

      const { error } = await supabase.from('commuter_analytics').update(dbFields).eq('commuter_id', 'c1');
      if (error) console.error("Error updating commuter analytics in Supabase:", error);
    }

    return updated;
  }
};
