// RouteService.js - Centralized service managing transit routes and stop queries.
// Consumes the centralized SharedStore database and defines clear integration hooks.
import { SharedStore, KEYS } from './SharedStore';

export const RouteService = {
  // Synchronous contract to maintain backward-compatibility with UI modules.
  // API Integration: Swap with async/await and fetch('/api/v1/routes') when PostgreSQL/REST API backend is deployed.

  getAllRoutes() {
    // PostgreSQL Integration point: return await fetch('/api/routes').then(r => r.json());
    return SharedStore.getItem(KEYS.ROUTES) || [];
  },

  getRouteDetails(routeNum) {
    // PostgreSQL Integration point: return await fetch(`/api/routes/${routeNum}`).then(r => r.json());
    const routes = this.getAllRoutes();
    return routes.find(r => r.number === routeNum) || null;
  },

  getAllStops() {
    const routes = this.getAllRoutes();
    const allStops = new Set();
    routes.forEach(route => {
      route.stops.forEach(stop => allStops.add(stop.name));
    });
    return Array.from(allStops).sort();
  },

  // Admin Route Management actions
  addRoute(route) {
    // REST API Integration point: fetch('/api/routes', { method: 'POST', body: JSON.stringify(route) });
    const routes = this.getAllRoutes();
    routes.push(route);
    SharedStore.setItem(KEYS.ROUTES, routes);
  },

  updateRoute(routeNum, updatedFields) {
    // REST API Integration point: fetch(`/api/routes/${routeNum}`, { method: 'PUT', body: JSON.stringify(updatedFields) });
    const routes = this.getAllRoutes();
    const idx = routes.findIndex(r => r.number === routeNum);
    if (idx !== -1) {
      routes[idx] = { ...routes[idx], ...updatedFields };
      SharedStore.setItem(KEYS.ROUTES, routes);
    }
  },

  deleteRoute(routeNum) {
    // REST API Integration point: fetch(`/api/routes/${routeNum}`, { method: 'DELETE' });
    let routes = this.getAllRoutes();
    routes = routes.filter(r => r.number !== routeNum);
    SharedStore.setItem(KEYS.ROUTES, routes);
  },

  searchRoutes(source, destination) {
    if (!source || !destination) return [];

    const normSource = source.trim().toLowerCase();
    const normDest = destination.trim().toLowerCase();
    const routes = this.getAllRoutes();
    const results = [];

    routes.forEach(route => {
      let sourceIndex = -1;
      let destIndex = -1;

      for (let i = 0; i < route.stops.length; i++) {
        const stopName = route.stops[i].name.toLowerCase();
        if (stopName.includes(normSource) && sourceIndex === -1) {
          sourceIndex = i;
        }
        if (stopName.includes(normDest) && sourceIndex !== -1 && i > sourceIndex) {
          destIndex = i;
          break;
        }
      }

      if (sourceIndex !== -1 && destIndex !== -1) {
        const boardStop = route.stops[sourceIndex];
        const alightStop = route.stops[destIndex];
        const travelDistance = alightStop.distance - boardStop.distance;

        // Estimate travel duration: roughly 2.5 minutes per km plus 1 minute dwell per stop
        const stopsCount = destIndex - sourceIndex;
        const estimatedDuration = Math.round(travelDistance * 2.5 + stopsCount);

        // Fetch corresponding bus object
        const busesData = SharedStore.getItem(KEYS.BUSES) || [];
        const bus = busesData.find(b => b.id === route.number) || {
          id: route.number,
          name: route.name,
          type: "City",
          stops: route.stops
        };

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
