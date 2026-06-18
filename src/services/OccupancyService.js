// OccupancyService.js - Passenger load sensors service synced with the Admin Portal.
import { SharedStore, KEYS } from './SharedStore';
import { BusService } from './BusService';

const listeners = {};
let localOccupancyStates = {};

function updateCrowdStatus(busId) {
  const state = localOccupancyStates[busId];
  if (!state) return;

  state.percentage = Math.round((state.passengers / state.capacity) * 100);

  if (state.percentage <= 40) {
    state.status = "Low Crowd";
    state.class = "status-chip-low";
    state.colorHex = "#22c55e";
  } else if (state.percentage <= 75) {
    state.status = "Medium Crowd";
    state.class = "status-chip-medium";
    state.colorHex = "#eab308";
  } else {
    state.status = "High Crowd";
    state.class = "status-chip-high";
    state.colorHex = "#ef4444";
  }
}

// Start occupancy sync ticker
if (typeof window !== 'undefined') {
  const sharedOcc = SharedStore.getItem(KEYS.OCCUPANCY);
  if (sharedOcc) {
    localOccupancyStates = sharedOcc;
  }

  // Ticker: Pull latest occupancy from shared database and trigger subscribers
  setInterval(() => {
    const sharedData = SharedStore.getItem(KEYS.OCCUPANCY);
    if (sharedData) {
      localOccupancyStates = sharedData;
      triggerListeners();
    }
  }, 2000);
}

function triggerListeners() {
  Object.keys(listeners).forEach(busId => {
    if (busId === 'all') {
      listeners['all'].forEach(callback => callback(localOccupancyStates));
    } else if (localOccupancyStates[busId]) {
      listeners[busId].forEach(callback => callback(localOccupancyStates[busId]));
    }
  });
}

export const OccupancyService = {
  // Synchronous contract to maintain backward-compatibility with UI modules.
  getOccupancy(busId) {
    return localOccupancyStates[busId] || null;
  },

  getAllOccupancyStates() {
    return localOccupancyStates;
  },

  updateOccupancy(busId, passengers) {
    if (!localOccupancyStates[busId]) {
      const bus = BusService.getBusDetails(busId);
      localOccupancyStates[busId] = {
        busId: busId,
        passengers: passengers,
        capacity: bus ? bus.capacity : 60,
        percentage: 0,
        status: "Low Crowd",
        class: "status-chip-low",
        colorHex: "#22c55e",
        lastUpdated: new Date()
      };
    } else {
      localOccupancyStates[busId].passengers = passengers;
      localOccupancyStates[busId].lastUpdated = new Date();
    }
    updateCrowdStatus(busId);
    SharedStore.setItem(KEYS.OCCUPANCY, localOccupancyStates);
  },

  subscribe(busId, callback) {
    if (!listeners[busId]) {
      listeners[busId] = [];
    }
    listeners[busId].push(callback);
    
    if (busId === 'all') {
      callback(localOccupancyStates);
    } else if (localOccupancyStates[busId]) {
      callback(localOccupancyStates[busId]);
    }
  },

  unsubscribe(busId, callback) {
    if (listeners[busId]) {
      listeners[busId] = listeners[busId].filter(cb => cb !== callback);
    }
  }
};
