// TrackingService.js - Simulated real-time bus location tracker synchronized with the Admin Portal.
// Consumes the centralized SharedStore database and defines clear integration hooks.
import { SharedStore, KEYS } from './SharedStore';
import { BusService } from './BusService';

const listeners = {};
let localBusStates = {};
let fallbackSimInterval = null;

function initializeStates() {
  const allBuses = BusService.getAllBuses();
  allBuses.forEach(bus => {
    const initialProgress = Math.random() * 80;
    localBusStates[bus.id] = {
      busId: bus.id,
      progress: initialProgress,
      speed: bus.status === "Active" ? 40 + Math.floor(Math.random() * 15) : 0,
      lastUpdated: new Date(),
      lat: 13.0064,
      lng: 80.2577,
      currentStop: bus.source || "Depot",
      nextStop: bus.destination || "Terminal",
      eta: bus.status === "Active" ? 15 : 0
    };
  });
  SharedStore.setItem(KEYS.TRACKING, localBusStates);
}

// Start tracking sync ticker
if (typeof window !== 'undefined') {
  const sharedState = SharedStore.getItem(KEYS.TRACKING);
  if (!sharedState) {
    initializeStates();
  } else {
    localBusStates = sharedState;
  }

  // Ticker: Pull latest coordinates from shared database and trigger subscribers
  setInterval(() => {
    const sharedData = SharedStore.getItem(KEYS.TRACKING);
    if (sharedData) {
      // Determine if Admin is actively writing updates (check timestamp diffs)
      let isAdminActive = false;
      const firstBusId = Object.keys(sharedData)[0];
      if (firstBusId && sharedData[firstBusId].lastUpdated) {
        const lastUpd = new Date(sharedData[firstBusId].lastUpdated).getTime();
        const diff = Date.now() - lastUpd;
        // If last updated is less than 15s ago, Admin is running the simulation
        if (diff < 15000) {
          isAdminActive = true;
        }
      }

      if (isAdminActive) {
        localBusStates = sharedData;
        if (fallbackSimInterval) {
          clearInterval(fallbackSimInterval);
          fallbackSimInterval = null;
        }
      } else {
        // If Admin is inactive, start our own local fallback simulator ticker
        if (!fallbackSimInterval) {
          startLocalFallbackSimulation();
        }
      }

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

function startLocalFallbackSimulation() {
  fallbackSimInterval = setInterval(() => {
    const buses = BusService.getAllBuses();
    buses.forEach(bus => {
      if (bus.status !== "Active") return;
      const state = localBusStates[bus.id];
      if (!state) return;

      state.progress += 0.5 + Math.random() * 0.5;
      if (state.progress >= 100) {
        state.progress = 0;
      }
      state.lastUpdated = new Date();
      
      const speedChange = (Math.random() * 6) - 3;
      state.speed = Math.max(15, Math.min(65, Math.round(state.speed + speedChange)));

      // Fetch stops info directly from route assignments
      const routes = SharedStore.getItem(KEYS.ROUTES) || [];
      const route = routes.find(r => r.number === bus.id);
      const stops = route ? route.stops : [];

      if (stops && stops.length > 0) {
        const totalDistance = stops[stops.length - 1].distance;
        const currentDistance = (state.progress / 100) * totalDistance;

        let lastStopIdx = 0;
        for (let i = 0; i < stops.length; i++) {
          if (stops[i].distance <= currentDistance) {
            lastStopIdx = i;
          } else {
            break;
          }
        }

        const nextStopIdx = Math.min(lastStopIdx + 1, stops.length - 1);
        const lastStop = stops[lastStopIdx];
        const nextStop = stops[nextStopIdx];

        let distanceToNext = nextStop.distance - currentDistance;
        let eta = 0;
        if (distanceToNext > 0 && state.speed > 0) {
          eta = Math.ceil((distanceToNext / state.speed) * 60);
        }

        state.currentStop = lastStop.name;
        state.nextStop = nextStop.name;
        state.eta = lastStopIdx === stops.length - 1 ? 0 : eta;
        state.lastStopIndex = lastStopIdx;
        state.nextStopIndex = nextStopIdx;

        let lat = lastStop.lat;
        let lng = lastStop.lng;
        if (lastStopIdx !== nextStopIdx) {
          const segDist = nextStop.distance - lastStop.distance;
          const segProg = segDist > 0 ? (currentDistance - lastStop.distance) / segDist : 0;
          lat = lastStop.lat + (nextStop.lat - lastStop.lat) * segProg;
          lng = lastStop.lng + (nextStop.lng - lastStop.lng) * segProg;
        }
        state.lat = parseFloat(lat.toFixed(6));
        state.lng = parseFloat(lng.toFixed(6));
      }
    });

    SharedStore.setItem(KEYS.TRACKING, localBusStates);
  }, 3000);
}

export const TrackingService = {
  // Synchronous contract to maintain backward-compatibility with UI modules.
  // GPS Integration: Swap with real GPS tracking API/WebSocket stream.

  getBusLocation(busId) {
    // API integration point: return await fetch(`/api/tracking/${busId}`).then(r => r.json());
    return localBusStates[busId] || null;
  },

  getAllBusStates() {
    return localBusStates;
  },

  updateBusLocation(busId, trackingState) {
    // Used by Admin simulation / ETA predictions updating
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
