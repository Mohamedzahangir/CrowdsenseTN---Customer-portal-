// RouteService.js - Handles route search, autocomplete, and transit matching.
import { BusService } from './BusService';

// Extract a unique list of all stops for search auto-completion
const allStops = new Set();
BusService.getAllBuses().forEach(bus => {
  bus.stops.forEach(stop => allStops.add(stop.name));
});
const uniqueStops = Array.from(allStops).sort();

export const RouteService = {
  getAllStops() {
    return uniqueStops;
  },

  searchRoutes(source, destination) {
    if (!source || !destination) return [];

    const normSource = source.trim().toLowerCase();
    const normDest = destination.trim().toLowerCase();
    const allBuses = BusService.getAllBuses();
    const results = [];

    allBuses.forEach(bus => {
      let sourceIndex = -1;
      let destIndex = -1;

      for (let i = 0; i < bus.stops.length; i++) {
        const stopName = bus.stops[i].name.toLowerCase();
        if (stopName.includes(normSource) && sourceIndex === -1) {
          sourceIndex = i;
        }
        // Destination must appear after the source stop
        if (stopName.includes(normDest) && sourceIndex !== -1 && i > sourceIndex) {
          destIndex = i;
          break; // found a valid forward connection
        }
      }

      if (sourceIndex !== -1 && destIndex !== -1) {
        const boardStop = bus.stops[sourceIndex];
        const alightStop = bus.stops[destIndex];
        const travelDistance = alightStop.distance - boardStop.distance;

        // Estimate travel duration: roughly 2.5 minutes per km plus 1 minute dwell per stop
        const stopsCount = destIndex - sourceIndex;
        const estimatedDuration = Math.round(travelDistance * 2.5 + stopsCount);

        results.push({
          bus: bus,
          boardStop: boardStop.name,
          alightStop: alightStop.name,
          sourceIndex: sourceIndex,
          destIndex: destIndex,
          distance: parseFloat(travelDistance.toFixed(1)),
          duration: estimatedDuration,
          stopsCount: stopsCount
        });
      }
    });

    return results;
  }
};
