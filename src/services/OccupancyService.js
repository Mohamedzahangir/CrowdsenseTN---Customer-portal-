// OccupancyService.js - Passenger load sensors service synced with the Admin Portal.
import { SharedStore, KEYS, defaultBuses } from './SharedStore';
import { BusService } from './BusService';

const listeners = {};
let localOccupancyStates = {};

// Seeded occupancy for demo/fallback
const SEEDED_PASSENGERS = { '19B': 56, '47A': 42, '23C': 18, 'M70': 30, '102': 28, '570': 0 };

function buildDefaultOccupancyStates() {
  const states = {};
  defaultBuses.forEach(bus => {
    const passengers = SEEDED_PASSENGERS[bus.id] !== undefined ? SEEDED_PASSENGERS[bus.id] : Math.floor(bus.capacity * 0.4);
    const percentage = bus.status === 'Active' ? Math.round((passengers / bus.capacity) * 100) : 0;
    states[bus.id] = {
      busId: bus.id,
      passengers: bus.status === 'Active' ? passengers : 0,
      capacity: bus.capacity,
      percentage,
      status: percentage <= 40 ? 'Low Crowd' : percentage <= 75 ? 'Medium Crowd' : 'High Crowd',
      class: percentage <= 40 ? 'status-chip-low' : percentage <= 75 ? 'status-chip-medium' : 'status-chip-high',
      colorHex: percentage <= 40 ? '#22c55e' : percentage <= 75 ? '#eab308' : '#ef4444',
      lastUpdated: new Date()
    };
  });
  return states;
}

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
  const hasData = sharedOcc && Object.keys(sharedOcc).length > 0;

  if (hasData) {
    localOccupancyStates = sharedOcc;
  } else {
    // No Supabase data — seed with defaults
    localOccupancyStates = buildDefaultOccupancyStates();
    SharedStore.setItem(KEYS.OCCUPANCY, localOccupancyStates);
  }

  // Ticker: Pull latest occupancy from shared database and trigger subscribers
  setInterval(() => {
    const sharedData = SharedStore.getItem(KEYS.OCCUPANCY);
    if (sharedData && Object.keys(sharedData).length > 0) {
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
