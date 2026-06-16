// OccupancyService.js - Simulated bus passenger load sensor.
import { BusService } from './BusService';

const occupancyStates = {};
const listeners = {};

function initializeOccupancy() {
  const allBuses = BusService.getAllBuses();
  allBuses.forEach(bus => {
    // Generate initial passenger counts. e.g., Route 47A starts around 42/60 passengers
    let passengers = 20 + Math.floor(Math.random() * (bus.capacity - 25));
    if (bus.id === "47A") passengers = 42; // default matching the design
    if (bus.id === "19B") passengers = 54; // high crowd default
    if (bus.id === "23C") passengers = 28; // low crowd default

    occupancyStates[bus.id] = {
      busId: bus.id,
      passengers: passengers,
      capacity: bus.capacity,
      percentage: Math.round((passengers / bus.capacity) * 100)
    };
    updateCrowdStatus(bus.id);
  });
}

function updateCrowdStatus(busId) {
  const state = occupancyStates[busId];
  if (!state) return;

  state.percentage = Math.round((state.passengers / state.capacity) * 100);

  // Define crowd status based on percentage
  if (state.percentage <= 40) {
    state.status = "Low Crowd";
    state.class = "status-chip-low";
    state.colorHex = "#22c55e"; // green
  } else if (state.percentage <= 75) {
    state.status = "Medium Crowd";
    state.class = "status-chip-medium";
    state.colorHex = "#eab308"; // yellow/orange
  } else {
    state.status = "High Crowd";
    state.class = "status-chip-high";
    state.colorHex = "#ef4444"; // red
  }
}

// Global update interval for occupancy adjustments (e.g., people boarding/exiting)
if (typeof window !== 'undefined') {
  initializeOccupancy();

  setInterval(() => {
    Object.keys(occupancyStates).forEach(busId => {
      const state = occupancyStates[busId];
      // Randomly change passenger counts by -3 to +3
      const change = Math.floor(Math.random() * 7) - 3;
      state.passengers = Math.max(5, Math.min(state.capacity, state.passengers + change));
      updateCrowdStatus(busId);

      // Trigger listeners
      if (listeners[busId]) {
        listeners[busId].forEach(callback => callback(state));
      }
      if (listeners['all']) {
        listeners['all'].forEach(callback => callback(occupancyStates));
      }
    });
  }, 10000); // fluctuates every 10 seconds
}

export const OccupancyService = {
  getOccupancy(busId) {
    return occupancyStates[busId] || null;
  },

  getAllOccupancyStates() {
    return occupancyStates;
  },

  subscribe(busId, callback) {
    if (!listeners[busId]) {
      listeners[busId] = [];
    }
    listeners[busId].push(callback);
    // Initial emit
    if (busId === 'all') {
      callback(occupancyStates);
    } else if (occupancyStates[busId]) {
      callback(occupancyStates[busId]);
    }
  },

  unsubscribe(busId, callback) {
    if (listeners[busId]) {
      listeners[busId] = listeners[busId].filter(cb => cb !== callback);
    }
  }
};
