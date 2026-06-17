// DeviceService.js - Centralized service managing IoT Device nodes.
// Consumes the centralized SharedStore database and defines clear integration hooks.
import { SharedStore, KEYS } from './SharedStore';

export const DeviceService = {
  // Centralized IoT Device endpoints
  // Future Backend Readiness: Swap with REST API calls when IoT management portal backend is deployed.

  getDevices() {
    // PostgreSQL/REST API Integration point: return await fetch('/api/devices').then(r => r.json());
    return SharedStore.getItem(KEYS.DEVICES) || [];
  },

  getDeviceDetails(deviceId) {
    // PostgreSQL/REST API Integration point: return await fetch(`/api/devices/${deviceId}`).then(r => r.json());
    const devices = this.getDevices();
    return devices.find(d => d.id === deviceId) || null;
  },

  // Admin Device management actions
  addDevice(device) {
    // REST API Integration point: fetch('/api/devices', { method: 'POST', body: JSON.stringify(device) });
    const devices = this.getDevices();
    devices.push(device);
    SharedStore.setItem(KEYS.DEVICES, devices);
  },

  updateDevice(deviceId, updatedFields) {
    // REST API Integration point: fetch(`/api/devices/${deviceId}`, { method: 'PUT', body: JSON.stringify(updatedFields) });
    const devices = this.getDevices();
    const idx = devices.findIndex(d => d.id === deviceId);
    if (idx !== -1) {
      devices[idx] = { ...devices[idx], ...updatedFields };
      SharedStore.setItem(KEYS.DEVICES, devices);
    }
  },

  deleteDevice(deviceId) {
    // REST API Integration point: fetch(`/api/devices/${deviceId}`, { method: 'DELETE' });
    let devices = this.getDevices();
    devices = devices.filter(d => d.id !== deviceId);
    SharedStore.setItem(KEYS.DEVICES, devices);
  }
};
