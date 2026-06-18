// TrackingService.js - Real-time bus location tracker synchronized with Supabase.
import { SharedStore, KEYS, defaultBuses, defaultRoutes } from './SharedStore';

const listeners = {};
let localBusStates = {};

// Build seeded default tracking states from route data
function buildDefaultTrackingStates() {
  const states = {};
  defaultBuses.forEach((bus, i) => {
    const route = defaultRoutes.find(r => r.number === bus.id);
    const stops = route && route.stops ? route.stops : [];
    const firstStop = stops.length > 0 ? stops[0] : { lat: 13.0064 + i * 0.01, lng: 80.2577 + i * 0.01 };
    states[bus.id] = {
      busId: bus.id,
      progress: 10 + i * 14,
      speed: bus.status === 'Active' ? 30 + Math.floor(Math.random() * 20) : 0,
      currentStop: firstStop.name || bus.source,
      nextStop: stops.length > 1 ? stops[1].name : bus.destination,
      eta: bus.status === 'Active' ? 8 + i * 3 : 0,
      lat: firstStop.lat || 13.0064,
      lng: firstStop.lng || 80.2577,
      health: bus.status === 'Active' ? 'Good' : 'Disconnected',
      lastStopIndex: 0,
      nextStopIndex: stops.length > 1 ? 1 : 0,
      distanceToNext: stops.length > 1 ? stops[1].distance : 0,
      lastUpdated: new Date()
    };
  });
  return states;
}

// Simulation loop for local fallback (runs only when Supabase tracking data is empty)
let simulationInterval = null;
function startLocalSimulation() {
  if (simulationInterval) return;
  simulationInterval = setInterval(() => {
    let changed = false;
    defaultBuses.forEach((bus) => {
      if (bus.status !== 'Active') return;
      const state = localBusStates[bus.id];
      if (!state) return;
      const route = defaultRoutes.find(r => r.number === bus.id);
      const stops = route && route.stops ? route.stops : [];
      if (stops.length < 2) return;

      // Advance progress
      state.progress += 0.3 + Math.random() * 0.3;
      if (state.progress >= 100) state.progress = 0;

      // Compute coordinates from progress
      const totalDist = stops[stops.length - 1].distance;
      const currentDist = (state.progress / 100) * totalDist;

      let lastIdx = 0;
      for (let j = 0; j < stops.length; j++) {
        if (stops[j].distance <= currentDist) lastIdx = j;
        else break;
      }
      const nextIdx = Math.min(lastIdx + 1, stops.length - 1);
      const last = stops[lastIdx];
      const next = stops[nextIdx];

      let lat = last.lat, lng = last.lng;
      if (lastIdx !== nextIdx) {
        const segDist = next.distance - last.distance;
        const segProg = segDist > 0 ? (currentDist - last.distance) / segDist : 0;
        lat = last.lat + (next.lat - last.lat) * segProg;
        lng = last.lng + (next.lng - last.lng) * segProg;
      }

      const speedChange = (Math.random() * 8) - 4;
      state.speed = Math.max(10, Math.min(60, Math.round(state.speed + speedChange)));
      const distToNext = lastIdx === stops.length - 1 ? 0 : next.distance - currentDist;
      state.eta = distToNext > 0 && state.speed > 0 ? Math.ceil((distToNext / state.speed) * 60) : 0;

      state.lat = parseFloat(lat.toFixed(6));
      state.lng = parseFloat(lng.toFixed(6));
      state.currentStop = last.name;
      state.nextStop = next.name;
      state.lastStopIndex = lastIdx;
      state.nextStopIndex = nextIdx;
      state.distanceToNext = parseFloat(distToNext.toFixed(1));
      state.lastUpdated = new Date();
      changed = true;
    });

    if (changed) {
      SharedStore.setItem(KEYS.TRACKING, localBusStates);
      triggerListeners();
    }
  }, 2000);
}

// Start tracking sync ticker
if (typeof window !== 'undefined') {
  const sharedState = SharedStore.getItem(KEYS.TRACKING);
  const hasData = sharedState && Object.keys(sharedState).length > 0;

  if (hasData) {
    localBusStates = sharedState;
  } else {
    // No Supabase data - seed with defaults and run local simulation
    localBusStates = buildDefaultTrackingStates();
    SharedStore.setItem(KEYS.TRACKING, localBusStates);
    startLocalSimulation();
  }

  // Ticker: Pull latest coordinates from shared database and trigger subscribers
  setInterval(() => {
    const sharedData = SharedStore.getItem(KEYS.TRACKING);
    if (sharedData && Object.keys(sharedData).length > 0) {
      localBusStates = sharedData;
      // If Supabase has started providing real data, stop simulation
      if (simulationInterval) {
        clearInterval(simulationInterval);
        simulationInterval = null;
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
