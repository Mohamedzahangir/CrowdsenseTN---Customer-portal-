// SharedStore.js - Centralized Local Storage Data Store for CrowdSense TN
// Seeds mock data, provides shared keys, and acts as the client-side database.
import { supabase } from './supabaseClient';

export const KEYS = {
  BUSES: "crowdsense_admin_buses",
  ROUTES: "crowdsense_admin_routes",
  DEVICES: "crowdsense_admin_devices",
  ALERTS: "crowdsense_admin_alerts",
  USERS: "crowdsense_admin_users",
  SETTINGS: "crowdsense_admin_settings",
  ACTIVITIES: "crowdsense_admin_activities",
  TRACKING: "crowdsense_live_tracking",
  OCCUPANCY: "crowdsense_live_occupancy"
};

export const defaultBuses = [
  { id: "47A", number: "TN-23-N-4512", name: "Vellore Express", type: "Express", source: "Vellore Bus Terminus", destination: "Katpadi Jn.", platform: "P4", capacity: 60, status: "Active", deviceId: "ESP32-047A", driverName: "K. Rajendran" },
  { id: "19B", number: "TN-01-N-8829", name: "T. Nagar Loop", type: "Local", source: "Adyar Depot", destination: "T. Nagar Bus Terminus", platform: "P1", capacity: 60, status: "Active", deviceId: "ESP32-019B", driverName: "M. Saravanan" },
  { id: "23C", number: "TN-01-N-6610", name: "Thiruvanmiyur Fast", type: "Fast", source: "Mylapore Temple", destination: "Thiruvanmiyur", platform: "P2", capacity: 60, status: "Active", deviceId: "ESP32-023C", driverName: "R. Krishnan" },
  { id: "M70", number: "TN-01-N-3211", name: "Broadway Special", type: "City", source: "Guindy Estate", destination: "Broadway", platform: "P3", capacity: 75, status: "Active", deviceId: "ESP32-0M70", driverName: "S. Murugan" },
  { id: "102", number: "TN-11-N-9022", name: "Kelambakkam Local", type: "Local", source: "Adyar Depot", destination: "Kelambakkam", platform: "P5", capacity: 70, status: "Active", deviceId: "ESP32-0102", driverName: "G. Sekar" },
  { id: "570", number: "TN-11-N-7733", name: "OMR Express", type: "Express", source: "Koyambedu", destination: "Siruseri IT Park", platform: "P6", capacity: 70, status: "Inactive", deviceId: "ESP32-0570", driverName: "P. Loganathan" }
];

export const defaultRoutes = [
  {
    number: "47A",
    name: "Vellore Express Route",
    source: "Vellore Bus Terminus",
    destination: "Katpadi Jn.",
    stops: [
      { name: "Vellore Bus Terminus", distance: 0, scheduledTime: "09:15 AM", lat: 12.9238, lng: 79.1352 },
      { name: "Vellore Fort", distance: 2.5, scheduledTime: "09:25 AM", lat: 12.9275, lng: 79.1302 },
      { name: "Green Circle", distance: 5.8, scheduledTime: "09:40 AM", lat: 12.9372, lng: 79.1355 },
      { name: "Silk Mill", distance: 9.0, scheduledTime: "09:55 AM", lat: 12.9460, lng: 79.1415 },
      { name: "Katpadi Jn.", distance: 12.0, scheduledTime: "10:15 AM", lat: 12.9680, lng: 79.1378 }
    ],
    dailyPassengers: 1250,
    occupancyStats: { peak: "82%", avg: "55%" }
  },
  {
    number: "19B",
    name: "T. Nagar Loop Route",
    source: "Adyar Depot",
    destination: "T. Nagar Bus Terminus",
    stops: [
      { name: "Adyar Depot", distance: 0, scheduledTime: "09:30 AM", lat: 13.0064, lng: 80.2577 },
      { name: "Saidapet Stop", distance: 3.1, scheduledTime: "09:42 AM", lat: 13.0210, lng: 80.2227 },
      { name: "Little Mount", distance: 4.8, scheduledTime: "09:50 AM", lat: 13.0163, lng: 80.2205 },
      { name: "Nandanam", distance: 6.2, scheduledTime: "09:58 AM", lat: 13.0298, lng: 80.2335 },
      { name: "T. Nagar Bus Terminus", distance: 8.5, scheduledTime: "10:10 AM", lat: 13.0405, lng: 80.2337 }
    ],
    dailyPassengers: 2400,
    occupancyStats: { peak: "94%", avg: "68%" }
  },
  {
    number: "23C",
    name: "Thiruvanmiyur Fast Route",
    source: "Mylapore Temple",
    destination: "Thiruvanmiyur",
    stops: [
      { name: "Mylapore Temple", distance: 0, scheduledTime: "09:45 AM", lat: 13.0330, lng: 80.2690 },
      { name: "Mandaveli", distance: 1.8, scheduledTime: "09:52 AM", lat: 13.0232, lng: 80.2625 },
      { name: "Adyar Depot", distance: 4.5, scheduledTime: "10:05 AM", lat: 13.0064, lng: 80.2577 },
      { name: "Thiruvanmiyur", distance: 7.2, scheduledTime: 12.9830, lng: 80.2516 }
    ],
    dailyPassengers: 1800,
    occupancyStats: { peak: "76%", avg: "48%" }
  },
  {
    number: "M70",
    name: "Broadway Special Route",
    source: "Guindy Estate",
    destination: "Broadway",
    stops: [
      { name: "Guindy Estate", distance: 0, scheduledTime: "09:10 AM", lat: 13.0084, lng: 80.2131 },
      { name: "Teynampet", distance: 5.2, scheduledTime: "09:25 AM", lat: 13.0340, lng: 80.2440 },
      { name: "Gemini Flyover", distance: 6.8, scheduledTime: "09:32 AM", lat: 13.0425, lng: 80.2514 },
      { name: "LIC", distance: 9.5, scheduledTime: "09:45 AM", lat: 13.0610, lng: 80.2640 },
      { name: "Broadway", distance: 13.0, scheduledTime: "10:00 AM", lat: 13.0880, lng: 80.2880 }
    ],
    dailyPassengers: 3100,
    occupancyStats: { peak: "88%", avg: "62%" }
  },
  {
    number: "102",
    name: "Kelambakkam Local Route",
    source: "Adyar Depot",
    destination: "Kelambakkam",
    stops: [
      { name: "Adyar Depot", distance: 0, scheduledTime: "09:20 AM", lat: 13.0064, lng: 80.2577 },
      { name: "Taramani", distance: 4.8, scheduledTime: "09:35 AM", lat: 12.9782, lng: 80.2418 },
      { name: "Tidel Park", distance: 6.1, scheduledTime: "09:40 AM", lat: 12.9894, lng: 80.2505 },
      { name: "Sholinganallur", distance: 14.5, scheduledTime: "10:05 AM", lat: 12.9010, lng: 80.2269 },
      { name: "Kelambakkam", distance: 28.0, scheduledTime: "10:35 AM", lat: 12.7850, lng: 80.2230 }
    ],
    dailyPassengers: 1500,
    occupancyStats: { peak: "71%", avg: "42%" }
  }
];

export const defaultDevices = [
  { id: "ESP32-047A", busId: "47A", status: "Online", lastComm: "Just now", fwVersion: "v1.4.2", rssi: "-58 dBm", heap: "182 KB", temperature: "41.5 °C" },
  { id: "ESP32-019B", busId: "19B", status: "Online", lastComm: "Just now", fwVersion: "v1.4.2", rssi: "-64 dBm", heap: "179 KB", temperature: "43.2 °C" },
  { id: "ESP32-023C", busId: "23C", status: "Online", lastComm: "Just now", fwVersion: "v1.4.2", rssi: "-55 dBm", heap: "185 KB", temperature: "39.8 °C" },
  { id: "ESP32-0M70", busId: "M70", status: "Offline", lastComm: "28 mins ago", fwVersion: "v1.3.9", rssi: "N/A", heap: "0 KB", temperature: "N/A" },
  { id: "ESP32-0102", busId: "102", status: "Maintenance", lastComm: "4 mins ago", fwVersion: "v1.4.2", rssi: "-82 dBm", heap: "155 KB", temperature: "48.1 °C" },
  { id: "ESP32-0570", busId: "570", status: "Fault", lastComm: "12 hours ago", fwVersion: "v1.3.1", rssi: "N/A", heap: "0 KB", temperature: "N/A" }
];

export const defaultAlerts = [
  { id: "a1", type: "High Occupancy", title: "Bus 19B Overcrowded", desc: "Route 19B occupancy reached 93% (56/60 passengers) near Nandanam.", busId: "19B", priority: "High", status: "Unread", time: "5 mins ago" },
  { id: "a2", type: "Device Offline", title: "IoT Node ESP32-0M70 Disconnected", desc: "Bus M70 device heartbeat timeout. Last reported ping -72dBm.", busId: "M70", priority: "Critical", status: "Unread", time: "28 mins ago" },
  { id: "a3", type: "Route Delay", title: "Route 47A Major Delay", desc: "Vellore Express is running 15 minutes behind schedule due to traffic congestion.", busId: "47A", priority: "Medium", status: "Unread", time: "42 mins ago" },
  { id: "a4", type: "Sensor Failure", title: "Bus 102 Passenger Counter Error", desc: "ESP32-0102 door-beam sensor reported inconsistent count. Pin D5 low.", busId: "102", priority: "High", status: "Unread", time: "1 hour ago" },
  { id: "a5", type: "System Notification", title: "System Overload Warning", desc: "Central database prediction engine CPU utilization exceeded 90% for 5m.", busId: "", priority: "Low", status: "Unread", time: "2 hours ago" },
  { id: "a6", type: "Bus Delay", title: "Bus 23C minor delay", desc: "Thiruvanmiyur Fast running 5 mins late due to temple festival crowd near Mylapore.", busId: "23C", priority: "Low", status: "Read", time: "4 hours ago" }
];

export const defaultUsers = [
  { id: "u1", name: "Anand Selvam", email: "anand.s@crowdsense.tn.gov", role: "Super Admin", status: "Active" },
  { id: "u2", name: "Priya Murthy", email: "priya.m@crowdsense.tn.gov", role: "Transport Officer", status: "Active" },
  { id: "u3", name: "Karthik Raja", email: "karthik.r@crowdsense.tn.gov", role: "Route Manager", status: "Active" },
  { id: "u4", name: "Deepak Kumar", email: "deepak.k@crowdsense.tn.gov", role: "Operations Manager", status: "Active" }
];

export const defaultSettings = {
  highOccupancyThreshold: 75,
  criticalOccupancyThreshold: 90,
  gpsPollingInterval: 3, // seconds
  offlineTimeout: 60, // seconds
  alertEmailNotif: true,
  alertSmsNotif: false,
  alertPushNotif: true,
  autoRefreshDashboard: true
};

export const defaultActivities = [
  { id: "act1", title: "Bus Route Assigned", desc: "Transport Officer Priya assigned Route 47A to Bus TN-23-N-4512.", time: "10 mins ago" },
  { id: "act2", title: "IoT Device Configured", desc: "Super Admin updated configuration parameters for ESP32-019B.", time: "1 hour ago" },
  { id: "act3", title: "New Route Created", desc: "Route Manager Karthik added Route 570 - Koyambedu to Siruseri IT Park.", time: "4 hours ago" },
  { id: "act4", title: "Settings Modified", desc: "Super Admin modified High Occupancy alert threshold to 75%.", time: "1 day ago" }
];

export const SharedStore = {
  initialized: false,
  init() {
    if (this.initialized) return;
    this.initialized = true;
    if (!localStorage.getItem(KEYS.BUSES) || localStorage.getItem(KEYS.BUSES) === "[]") localStorage.setItem(KEYS.BUSES, JSON.stringify(defaultBuses));
    if (!localStorage.getItem(KEYS.ROUTES) || localStorage.getItem(KEYS.ROUTES) === "[]") localStorage.setItem(KEYS.ROUTES, JSON.stringify(defaultRoutes));
    if (!localStorage.getItem(KEYS.DEVICES) || localStorage.getItem(KEYS.DEVICES) === "[]") localStorage.setItem(KEYS.DEVICES, JSON.stringify(defaultDevices));
    if (!localStorage.getItem(KEYS.ALERTS) || localStorage.getItem(KEYS.ALERTS) === "[]") localStorage.setItem(KEYS.ALERTS, JSON.stringify(defaultAlerts));
    if (!localStorage.getItem(KEYS.USERS) || localStorage.getItem(KEYS.USERS) === "[]") localStorage.setItem(KEYS.USERS, JSON.stringify(defaultUsers));
    if (!localStorage.getItem(KEYS.SETTINGS)) localStorage.setItem(KEYS.SETTINGS, JSON.stringify(defaultSettings));
    if (!localStorage.getItem(KEYS.ACTIVITIES) || localStorage.getItem(KEYS.ACTIVITIES) === "[]") localStorage.setItem(KEYS.ACTIVITIES, JSON.stringify(defaultActivities));
    
    // Trigger async supabase replication
    this.syncFromSupabase();
    this.subscribeToRealtime();
  },

  getItem(key) {
    const data = localStorage.getItem(key);
    try {
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error("Error parsing localStorage key:", key, e);
      return null;
    }
  },

  setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("crowdsense_store_updated", { detail: { key } }));
    }
  },

  async syncFromSupabase() {
    if (!supabase) {
      console.warn("SharedStore: Supabase client is not initialized. Skipping initial database sync.");
      return;
    }
    try {
      // 1. Buses
      const { data: buses } = await supabase.from('buses').select('*');
      if (buses) {
        const formatted = buses.map(b => ({
          id: b.id,
          number: b.number,
          name: b.name,
          type: b.type,
          source: b.source,
          destination: b.destination,
          platform: b.platform,
          capacity: b.capacity,
          status: b.status,
          deviceId: b.device_id,
          driverName: b.driver_name
        }));
        localStorage.setItem(KEYS.BUSES, JSON.stringify(formatted));
      }

      // 2. Routes
      const { data: routesData } = await supabase
        .from('routes')
        .select(`
          number,
          name,
          source,
          destination,
          daily_passengers,
          occupancy_stats,
          route_stops (
            distance,
            scheduled_time,
            sequence_order,
            stops (
              name,
              latitude,
              longitude
            )
          )
        `);
      if (routesData) {
        const formatted = routesData.map(r => ({
          number: r.number,
          name: r.name,
          source: r.source,
          destination: r.destination,
          dailyPassengers: r.daily_passengers,
          occupancyStats: r.occupancy_stats,
          stops: r.route_stops
            ? r.route_stops
                .sort((a, b) => a.sequence_order - b.sequence_order)
                .map(rs => ({
                  name: rs.stops ? rs.stops.name : '',
                  distance: rs.distance ? Number(rs.distance) : 0,
                  scheduledTime: rs.scheduled_time || '',
                  lat: rs.stops ? Number(rs.stops.latitude) : 0,
                  lng: rs.stops ? Number(rs.stops.longitude) : 0
                }))
            : []
        }));
        localStorage.setItem(KEYS.ROUTES, JSON.stringify(formatted));
      }

      // 3. Devices
      const { data: devices } = await supabase.from('devices').select('*');
      if (devices) {
        const formatted = devices.map(d => ({
          id: d.id,
          busId: d.bus_id,
          status: d.status,
          lastComm: d.last_comm,
          fwVersion: d.fw_version,
          rssi: d.rssi,
          heap: d.heap,
          temperature: d.temperature
        }));
        localStorage.setItem(KEYS.DEVICES, JSON.stringify(formatted));
      }

      // 4. Alerts
      const { data: alerts } = await supabase.from('alerts').select('*').order('created_at', { ascending: false });
      if (alerts) {
        const formatted = alerts.map(a => ({
          id: a.id,
          type: a.type,
          title: a.title,
          desc: a.description,
          busId: a.bus_id,
          priority: a.priority,
          status: a.status,
          time: a.time
        }));
        localStorage.setItem(KEYS.ALERTS, JSON.stringify(formatted));
      }

      // 5. Admin Users
      const { data: users } = await supabase.from('admin_users').select('*');
      if (users) {
        const formatted = users.map(u => ({
          id: u.id,
          name: u.name,
          email: u.email,
          role: u.role,
          status: u.status
        }));
        localStorage.setItem(KEYS.USERS, JSON.stringify(formatted));
      }

      // 6. Settings
      const { data: settings } = await supabase.from('system_settings').select('*').eq('key', 'config').single();
      if (settings) {
        localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings.value));
      }

      // 7. Live Bus Status
      const { data: liveStatus } = await supabase.from('live_bus_status').select('*');
      if (liveStatus) {
        const tracking = {};
        const occupancy = {};
        liveStatus.forEach(r => {
          tracking[r.bus_id] = {
            busId: r.bus_id,
            progress: Number(r.progress),
            speed: Number(r.speed),
            currentStop: r.current_stop,
            nextStop: r.next_stop,
            eta: Number(r.eta),
            lat: Number(r.latitude),
            lng: Number(r.longitude),
            health: r.health,
            lastStopIndex: r.last_stop_index,
            nextStopIndex: r.next_stop_index,
            distanceToNext: Number(r.distance_to_next),
            lastUpdated: new Date(r.last_updated)
          };
          occupancy[r.bus_id] = {
            busId: r.bus_id,
            passengers: r.passengers,
            capacity: r.capacity,
            percentage: r.percentage,
            status: r.percentage <= 40 ? "Low Crowd" : r.percentage <= 75 ? "Medium Crowd" : "High Crowd",
            class: r.percentage <= 40 ? "status-chip-low" : r.percentage <= 75 ? "status-chip-medium" : "status-chip-high",
            colorHex: r.percentage <= 40 ? "#22c55e" : r.percentage <= 75 ? "#eab308" : "#ef4444",
            lastUpdated: new Date(r.last_updated)
          };
        });
        localStorage.setItem(KEYS.TRACKING, JSON.stringify(tracking));
        localStorage.setItem(KEYS.OCCUPANCY, JSON.stringify(occupancy));
      }

      // 8. Activities
      const { data: activities } = await supabase
        .from('iot_events')
        .select('*')
        .eq('event_type', 'system_activity')
        .order('timestamp', { ascending: false })
        .limit(30);
      if (activities) {
        const formatted = activities.map(act => ({
          id: 'act_' + act.id,
          title: act.payload ? act.payload.title : 'System Log',
          desc: act.payload ? act.payload.desc : '',
          time: 'Just now'
        }));
        localStorage.setItem(KEYS.ACTIVITIES, JSON.stringify(formatted));
      }

      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("crowdsense_store_updated", { detail: { key: "all" } }));
      }
    } catch (e) {
      console.error("SharedStore Supabase initial sync failed:", e);
    }
  },

  subscribeToRealtime() {
    if (!supabase) {
      console.warn("SharedStore: Supabase client is not initialized. Skipping realtime subscriptions.");
      return;
    }
    // 1. live_bus_status
    supabase
      .channel('live_bus_status_channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'live_bus_status' }, payload => {
        const r = payload.new;
        if (r) {
          const tracking = this.getItem(KEYS.TRACKING) || {};
          const occupancy = this.getItem(KEYS.OCCUPANCY) || {};

          tracking[r.bus_id] = {
            busId: r.bus_id,
            progress: Number(r.progress),
            speed: Number(r.speed),
            currentStop: r.current_stop,
            nextStop: r.next_stop,
            eta: Number(r.eta),
            lat: Number(r.latitude),
            lng: Number(r.longitude),
            health: r.health,
            lastStopIndex: r.last_stop_index,
            nextStopIndex: r.next_stop_index,
            distanceToNext: Number(r.distance_to_next),
            lastUpdated: new Date(r.last_updated)
          };

          occupancy[r.bus_id] = {
            busId: r.bus_id,
            passengers: r.passengers,
            capacity: r.capacity,
            percentage: r.percentage,
            status: r.percentage <= 40 ? "Low Crowd" : r.percentage <= 75 ? "Medium Crowd" : "High Crowd",
            class: r.percentage <= 40 ? "status-chip-low" : r.percentage <= 75 ? "status-chip-medium" : "status-chip-high",
            colorHex: r.percentage <= 40 ? "#22c55e" : r.percentage <= 75 ? "#eab308" : "#ef4444",
            lastUpdated: new Date(r.last_updated)
          };

          localStorage.setItem(KEYS.TRACKING, JSON.stringify(tracking));
          localStorage.setItem(KEYS.OCCUPANCY, JSON.stringify(occupancy));
          
          window.dispatchEvent(new CustomEvent("crowdsense_store_updated", { detail: { key: KEYS.TRACKING } }));
        }
      })
      .subscribe();

    // 2. alerts
    supabase
      .channel('alerts_channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'alerts' }, () => {
        supabase.from('alerts').select('*').order('created_at', { ascending: false }).then(({ data }) => {
          if (data) {
            const formatted = data.map(a => ({
              id: a.id,
              type: a.type,
              title: a.title,
              desc: a.description,
              busId: a.bus_id,
              priority: a.priority,
              status: a.status,
              time: a.time
            }));
            localStorage.setItem(KEYS.ALERTS, JSON.stringify(formatted));
            window.dispatchEvent(new CustomEvent("crowdsense_store_updated", { detail: { key: KEYS.ALERTS } }));
          }
        });
      })
      .subscribe();

    // 3. devices
    supabase
      .channel('devices_channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'devices' }, () => {
        supabase.from('devices').select('*').then(({ data }) => {
          if (data) {
            const formatted = data.map(d => ({
              id: d.id,
              busId: d.bus_id,
              status: d.status,
              lastComm: d.last_comm,
              fwVersion: d.fw_version,
              rssi: d.rssi,
              heap: d.heap,
              temperature: d.temperature
            }));
            localStorage.setItem(KEYS.DEVICES, JSON.stringify(formatted));
            window.dispatchEvent(new CustomEvent("crowdsense_store_updated", { detail: { key: KEYS.DEVICES } }));
          }
        });
      })
      .subscribe();

    // 4. iot_events
    supabase
      .channel('iot_events_channel')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'iot_events' }, payload => {
        const event = payload.new;
        if (event && event.event_type === 'system_activity') {
          const activities = this.getItem(KEYS.ACTIVITIES) || [];
          activities.unshift({
            id: 'act_' + event.id,
            title: event.payload ? event.payload.title : 'System Log',
            desc: event.payload ? event.payload.desc : '',
            time: 'Just now'
          });
          const capped = activities.slice(0, 30);
          localStorage.setItem(KEYS.ACTIVITIES, JSON.stringify(capped));
          window.dispatchEvent(new CustomEvent("crowdsense_store_updated", { detail: { key: KEYS.ACTIVITIES } }));
        }
      })
      .subscribe();

    // 5. buses realtime
    supabase
      .channel('buses_channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'buses' }, () => {
        supabase.from('buses').select('*').then(({ data }) => {
          if (data) {
            const formatted = data.map(b => ({
              id: b.id,
              number: b.number,
              name: b.name,
              type: b.type,
              source: b.source,
              destination: b.destination,
              platform: b.platform,
              capacity: b.capacity,
              status: b.status,
              deviceId: b.device_id,
              driverName: b.driver_name
            }));
            localStorage.setItem(KEYS.BUSES, JSON.stringify(formatted));
            window.dispatchEvent(new CustomEvent("crowdsense_store_updated", { detail: { key: KEYS.BUSES } }));
          }
        });
      })
      .subscribe();

    // 6. routes realtime
    supabase
      .channel('routes_channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'routes' }, () => {
        supabase
          .from('routes')
          .select(`
            number,
            name,
            source,
            destination,
            daily_passengers,
            occupancy_stats,
            route_stops (
              distance,
              scheduled_time,
              sequence_order,
              stops (
                name,
                latitude,
                longitude
              )
            )
          `).then(({ data: routesData }) => {
            if (routesData) {
              const formatted = routesData.map(r => ({
                number: r.number,
                name: r.name,
                source: r.source,
                destination: r.destination,
                dailyPassengers: r.daily_passengers,
                occupancyStats: r.occupancy_stats,
                stops: r.route_stops
                  ? r.route_stops
                      .sort((a, b) => a.sequence_order - b.sequence_order)
                      .map(rs => ({
                        name: rs.stops ? rs.stops.name : '',
                        distance: rs.distance ? Number(rs.distance) : 0,
                        scheduledTime: rs.scheduled_time || '',
                        lat: rs.stops ? Number(rs.stops.latitude) : 0,
                        lng: rs.stops ? Number(rs.stops.longitude) : 0
                      }))
                  : []
              }));
              localStorage.setItem(KEYS.ROUTES, JSON.stringify(formatted));
              window.dispatchEvent(new CustomEvent("crowdsense_store_updated", { detail: { key: KEYS.ROUTES } }));
            }
          });
      })
      .subscribe();
  }
};

// Auto-initialize when the store module is loaded
if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
  SharedStore.init();
}
