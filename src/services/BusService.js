// BusService.js - Centralized service managing bus fleet metadata.
// Consumes the centralized SharedStore database and defines clear integration hooks.
import { SharedStore, KEYS } from './SharedStore';

export const BusService = {
  // Synchronous contract to maintain backward-compatibility with UI modules.
  // API Integration: Swap with async/await and fetch('/api/v1/buses') when PostgreSQL/REST API backend is deployed.
  
  getAllBuses() {
    // PostgreSQL Integration point: return await fetch('/api/buses').then(r => r.json());
    return SharedStore.getItem(KEYS.BUSES) || [];
  },

  getBusDetails(busId) {
    // PostgreSQL Integration point: return await fetch(`/api/buses/${busId}`).then(r => r.json());
    const buses = this.getAllBuses();
    return buses.find(b => b.id === busId) || null;
  },

  getNearbyBuses() {
    const buses = this.getAllBuses();
    return buses.filter(b => b.status === "Active").slice(0, 4);
  },

  // Admin Fleet Management actions
  addBus(bus) {
    // REST API Integration point: fetch('/api/buses', { method: 'POST', body: JSON.stringify(bus) });
    const buses = this.getAllBuses();
    buses.push(bus);
    SharedStore.setItem(KEYS.BUSES, buses);
  },

  updateBus(busId, updatedFields) {
    // REST API Integration point: fetch(`/api/buses/${busId}`, { method: 'PUT', body: JSON.stringify(updatedFields) });
    const buses = this.getAllBuses();
    const idx = buses.findIndex(b => b.id === busId);
    if (idx !== -1) {
      buses[idx] = { ...buses[idx], ...updatedFields };
      SharedStore.setItem(KEYS.BUSES, buses);
    }
  },

  deleteBus(busId) {
    // REST API Integration point: fetch(`/api/buses/${busId}`, { method: 'DELETE' });
    let buses = this.getAllBuses();
    buses = buses.filter(b => b.id !== busId);
    SharedStore.setItem(KEYS.BUSES, buses);
  }
};
