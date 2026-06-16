// TrackingService.js - Simulated real-time bus location tracker with real geographical coordinates.
import { BusService } from './BusService';

// Active states of all buses
const busStates = {};
const listeners = {};

function initializeStates() {
  const allBuses = BusService.getAllBuses();
  allBuses.forEach(bus => {
    // Start each bus at a slightly different initial progress so they are spread out
    const initialProgress = Math.random() * 80; // percentage
    busStates[bus.id] = {
      busId: bus.id,
      progress: initialProgress,
      speed: 40 + Math.floor(Math.random() * 15), // km/h
      lastUpdated: new Date(),
      lat: 0,
      lng: 0
    };
    updateBusMetrics(bus.id);
  });
}

// Calculate stop index, ETA, and distance based on progress percentage
function updateBusMetrics(busId) {
  const bus = BusService.getBusDetails(busId);
  const state = busStates[busId];
  if (!bus || !state) return;

  const totalDistance = bus.stops[bus.stops.length - 1].distance;
  const currentDistance = (state.progress / 100) * totalDistance;

  // Find current stop index
  let lastStopIndex = 0;
  for (let i = 0; i < bus.stops.length; i++) {
    if (bus.stops[i].distance <= currentDistance) {
      lastStopIndex = i;
    } else {
      break;
    }
  }

  const nextStopIndex = Math.min(lastStopIndex + 1, bus.stops.length - 1);
  const lastStop = bus.stops[lastStopIndex];
  const nextStop = bus.stops[nextStopIndex];

  // Calculate distance to next stop
  let distanceToNext = 0;
  if (lastStopIndex === bus.stops.length - 1) {
    distanceToNext = 0;
  } else {
    distanceToNext = nextStop.distance - currentDistance;
  }

  // Speed fluctuation
  const speedChange = (Math.random() * 6) - 3; // -3 to +3
  state.speed = Math.max(15, Math.min(65, Math.round(state.speed + speedChange)));

  // Calculate dynamic ETA (minutes = distance / speed * 60)
  let eta = 0;
  if (distanceToNext > 0 && state.speed > 0) {
    eta = Math.ceil((distanceToNext / state.speed) * 60);
  }

  state.currentStop = lastStop.name;
  state.nextStop = nextStop.name;
  state.distanceToNext = parseFloat(distanceToNext.toFixed(1));
  state.eta = lastStopIndex === bus.stops.length - 1 ? 0 : eta;
  state.lastStopIndex = lastStopIndex;
  state.nextStopIndex = nextStopIndex;

  // Compute geographical coordinates by interpolating between lastStop and nextStop
  let lat = lastStop.lat;
  let lng = lastStop.lng;
  if (lastStopIndex !== nextStopIndex) {
    const segmentDistance = nextStop.distance - lastStop.distance;
    const segmentProgress = segmentDistance > 0 ? (currentDistance - lastStop.distance) / segmentDistance : 0;
    lat = lastStop.lat + (nextStop.lat - lastStop.lat) * segmentProgress;
    lng = lastStop.lng + (nextStop.lng - lastStop.lng) * segmentProgress;
  }
  state.lat = parseFloat(lat.toFixed(6));
  state.lng = parseFloat(lng.toFixed(6));
}

// Global update interval
if (typeof window !== 'undefined') {
  initializeStates();
  
  setInterval(() => {
    Object.keys(busStates).forEach(busId => {
      const state = busStates[busId];
      // Increment progress along route. Loops when reaching 100%
      state.progress += 0.5 + Math.random() * 0.5; // moves ~0.75% every tick
      if (state.progress >= 100) {
        state.progress = 0;
      }
      state.lastUpdated = new Date();
      updateBusMetrics(busId);

      // Notify page listeners
      if (listeners[busId]) {
        listeners[busId].forEach(callback => callback(state));
      }
      if (listeners['all']) {
        listeners['all'].forEach(callback => callback(busStates));
      }
    });
  }, 3000); // simulation ticks every 3 seconds
}

export const TrackingService = {
  getBusLocation(busId) {
    return busStates[busId] || null;
  },

  getAllBusStates() {
    return busStates;
  },

  subscribe(busId, callback) {
    if (!listeners[busId]) {
      listeners[busId] = [];
    }
    listeners[busId].push(callback);
    // Initial emit
    if (busId === 'all') {
      callback(busStates);
    } else if (busStates[busId]) {
      callback(busStates[busId]);
    }
  },

  unsubscribe(busId, callback) {
    if (listeners[busId]) {
      listeners[busId] = listeners[busId].filter(cb => cb !== callback);
    }
  }
};
