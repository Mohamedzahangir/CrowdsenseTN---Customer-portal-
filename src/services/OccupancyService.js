// OccupancyService.js - Passenger load sensors service synced with the Admin Portal.
// Consumes the centralized SharedStore database and defines clear integration hooks.
import { SharedStore, KEYS } from './SharedStore';
import { BusService } from './BusService';

const listeners = {};
let localOccupancyStates = {};
let fallbackOccInterval = null;

function initializeOccupancy() {
  const allBuses = BusService.getAllBuses();
  allBuses.forEach(bus => {
    let passengers = 20 + Math.floor(Math.random() * (bus.capacity - 25));
    if (bus.id === "47A") passengers = 42;
    if (bus.id === "19B") passengers = 54;
    if (bus.id === "23C") passengers = 28;

    localOccupancyStates[bus.id] = {
      busId: bus.id,
      passengers: passengers,
      capacity: bus.capacity,
      percentage: Math.round((passengers / bus.capacity) * 100),
      status: "Low Crowd",
      class: "status-chip-low",
      colorHex: "#22c55e",
      lastUpdated: new Date()
    };
    updateCrowdStatus(bus.id);
  });
  SharedStore.setItem(KEYS.OCCUPANCY, localOccupancyStates);
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
  if (!sharedOcc) {
    initializeOccupancy();
  } else {
    localOccupancyStates = sharedOcc;
  }

  // Ticker: Pull latest occupancy from shared database and trigger subscribers
  setInterval(() => {
    const sharedData = SharedStore.getItem(KEYS.OCCUPANCY);
    if (sharedData) {
      // Determine if Admin is actively updating
      let isAdminActive = false;
      const firstBusId = Object.keys(sharedData)[0];
      if (firstBusId && sharedData[firstBusId].lastUpdated) {
        const lastUpd = new Date(sharedData[firstBusId].lastUpdated).getTime();
        const diff = Date.now() - lastUpd;
        if (diff < 20000) {
          isAdminActive = true;
        }
      }

      if (isAdminActive) {
        localOccupancyStates = sharedData;
        if (fallbackOccInterval) {
          clearInterval(fallbackOccInterval);
          fallbackOccInterval = null;
        }
      } else {
        if (!fallbackOccInterval) {
          startLocalFallbackSimulation();
        }
      }

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

function startLocalFallbackSimulation() {
  fallbackOccInterval = setInterval(() => {
    const buses = BusService.getAllBuses();
    buses.forEach(bus => {
      if (bus.status !== "Active") return;
      const state = localOccupancyStates[bus.id];
      if (!state) return;

      const change = Math.floor(Math.random() * 7) - 3;
      state.passengers = Math.max(5, Math.min(state.capacity, state.passengers + change));
      state.lastUpdated = new Date();
      updateCrowdStatus(bus.id);
    });

    SharedStore.setItem(KEYS.OCCUPANCY, localOccupancyStates);
  }, 10000);
}

export const OccupancyService = {
  // Synchronous contract to maintain backward-compatibility with UI modules.
  // ESP32 Integration: Swap with ESP32 occupancy counting hardware APIs.

  getOccupancy(busId) {
    // API integration point: return await fetch(`/api/occupancy/${busId}`).then(r => r.json());
    return localOccupancyStates[busId] || null;
  },

  getAllOccupancyStates() {
    return localOccupancyStates;
  },

  updateOccupancy(busId, passengers) {
    // ESP32 occupancy device webhook integration point:
    // fetch(`/api/occupancy/${busId}`, { method: 'POST', body: JSON.stringify({ passengers }) });
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
