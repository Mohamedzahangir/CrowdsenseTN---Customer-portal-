// TrackingService.js - Real-time bus location tracker synchronized with Supabase.
import { SharedStore, KEYS } from './SharedStore';

const listeners = {};
let localBusStates = {};

// Start tracking sync ticker
if (typeof window !== 'undefined') {
  const sharedState = SharedStore.getItem(KEYS.TRACKING);
  if (sharedState) {
    localBusStates = sharedState;
  }

  // Ticker: Pull latest coordinates from shared database and trigger subscribers
  setInterval(() => {
    const sharedData = SharedStore.getItem(KEYS.TRACKING);
    if (sharedData) {
      localBusStates = sharedData;
      triggerListeners();
    }
  }, 1500);
}

function triggerListeners() {
  Object.keys(listeners).forEach(busId => {
    if (busId === 'all') {
      listeners['all'].forEach(callback => callback(localBusStates));
    } else if (localBusStates[busId]) {
      listeners[busId].forEach(callback => callback(localBusStates[busId]));
    }
  });
}

export const TrackingService = {
  // Synchronous contract to maintain backward-compatibility with UI modules.
  getBusLocation(busId) {
    return localBusStates[busId] || null;
  },

  getAllBusStates() {
    return localBusStates;
  },

  updateBusLocation(busId, trackingState) {
    localBusStates[busId] = { ...localBusStates[busId], ...trackingState, lastUpdated: new Date() };
    SharedStore.setItem(KEYS.TRACKING, localBusStates);
  },

  subscribe(busId, callback) {
    if (!listeners[busId]) {
      listeners[busId] = [];
    }
    listeners[busId].push(callback);
    
    if (busId === 'all') {
      callback(localBusStates);
    } else if (localBusStates[busId]) {
      callback(localBusStates[busId]);
    }
  },

  unsubscribe(busId, callback) {
    if (listeners[busId]) {
      listeners[busId] = listeners[busId].filter(cb => cb !== callback);
    }
  }
};
