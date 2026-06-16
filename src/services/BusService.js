// BusService.js - Manages Tamil Nadu Bus static metadata and scheduling.

const buses = {
  "47A": {
    id: "47A",
    number: "TN-23-N-4512",
    name: "Vellore Express",
    type: "Express",
    source: "Vellore Bus Terminus",
    destination: "Katpadi Jn.",
    platform: "P4",
    capacity: 60,
    stops: [
      { name: "Vellore Bus Terminus", distance: 0, scheduledTime: "09:15 AM", lat: 12.9238, lng: 79.1352 },
      { name: "Vellore Fort", distance: 2.5, scheduledTime: "09:25 AM", lat: 12.9275, lng: 79.1302 },
      { name: "Green Circle", distance: 5.8, scheduledTime: "09:40 AM", lat: 12.9372, lng: 79.1355 },
      { name: "Silk Mill", distance: 9.0, scheduledTime: "09:55 AM", lat: 12.9460, lng: 79.1415 },
      { name: "Katpadi Jn.", distance: 12.0, scheduledTime: "10:15 AM", lat: 12.9680, lng: 79.1378 }
    ]
  },
  "19B": {
    id: "19B",
    number: "TN-01-N-8829",
    name: "T. Nagar Loop",
    type: "Local",
    source: "Adyar Depot",
    destination: "T. Nagar Bus Terminus",
    platform: "P1",
    capacity: 60,
    stops: [
      { name: "Adyar Depot", distance: 0, scheduledTime: "09:30 AM", lat: 13.0064, lng: 80.2577 },
      { name: "Saidapet Stop", distance: 3.1, scheduledTime: "09:42 AM", lat: 13.0210, lng: 80.2227 },
      { name: "Little Mount", distance: 4.8, scheduledTime: "09:50 AM", lat: 13.0163, lng: 80.2205 },
      { name: "Nandanam", distance: 6.2, scheduledTime: "09:58 AM", lat: 13.0298, lng: 80.2335 },
      { name: "T. Nagar Bus Terminus", distance: 8.5, scheduledTime: "10:10 AM", lat: 13.0405, lng: 80.2337 }
    ]
  },
  "23C": {
    id: "23C",
    number: "TN-01-N-6610",
    name: "Thiruvanmiyur Fast",
    type: "Fast",
    source: "Mylapore Temple",
    destination: "Thiruvanmiyur",
    platform: "P2",
    capacity: 60,
    stops: [
      { name: "Mylapore Temple", distance: 0, scheduledTime: "09:45 AM", lat: 13.0330, lng: 80.2690 },
      { name: "Mandaveli", distance: 1.8, scheduledTime: "09:52 AM", lat: 13.0232, lng: 80.2625 },
      { name: "Adyar Depot", distance: 4.5, scheduledTime: "10:05 AM", lat: 13.0064, lng: 80.2577 },
      { name: "Thiruvanmiyur", distance: 7.2, scheduledTime: "10:20 AM", lat: 12.9830, lng: 80.2516 }
    ]
  },
  "M70": {
    id: "M70",
    number: "TN-01-N-3211",
    name: "Broadway Special",
    type: "City",
    source: "Guindy Estate",
    destination: "Broadway",
    platform: "P3",
    capacity: 75,
    stops: [
      { name: "Guindy Estate", distance: 0, scheduledTime: "09:10 AM", lat: 13.0084, lng: 80.2131 },
      { name: "Teynampet", distance: 5.2, scheduledTime: "09:25 AM", lat: 13.0340, lng: 80.2440 },
      { name: "Gemini Flyover", distance: 6.8, scheduledTime: "09:32 AM", lat: 13.0425, lng: 80.2514 },
      { name: "LIC", distance: 9.5, scheduledTime: "09:45 AM", lat: 13.0610, lng: 80.2640 },
      { name: "Broadway", distance: 13.0, scheduledTime: "10:00 AM", lat: 13.0880, lng: 80.2880 }
    ]
  },
  "102": {
    id: "102",
    number: "TN-11-N-9022",
    name: "Kelambakkam Local",
    type: "Local",
    source: "Adyar Depot",
    destination: "Kelambakkam",
    platform: "P5",
    capacity: 70,
    stops: [
      { name: "Adyar Depot", distance: 0, scheduledTime: "09:20 AM", lat: 13.0064, lng: 80.2577 },
      { name: "Taramani", distance: 4.8, scheduledTime: "09:35 AM", lat: 12.9782, lng: 80.2418 },
      { name: "Tidel Park", distance: 6.1, scheduledTime: "09:40 AM", lat: 12.9894, lng: 80.2505 },
      { name: "Sholinganallur", distance: 14.5, scheduledTime: "10:05 AM", lat: 12.9010, lng: 80.2269 },
      { name: "Kelambakkam", distance: 28.0, scheduledTime: "10:35 AM", lat: 12.7850, lng: 80.2230 }
    ]
  },
  "570": {
    id: "570",
    number: "TN-11-N-7733",
    name: "OMR Express",
    type: "Express",
    source: "Koyambedu",
    destination: "Siruseri IT Park",
    platform: "P6",
    capacity: 70,
    stops: [
      { name: "Koyambedu", distance: 0, scheduledTime: "09:00 AM", lat: 13.0694, lng: 80.1914 },
      { name: "Guindy", distance: 8.5, scheduledTime: "09:20 AM", lat: 13.0084, lng: 80.2131 },
      { name: "Taramani", distance: 15.2, scheduledTime: "09:40 AM", lat: 12.9782, lng: 80.2418 },
      { name: "Sholinganallur", distance: 24.8, scheduledTime: "10:05 AM", lat: 12.9010, lng: 80.2269 },
      { name: "Siruseri IT Park", distance: 34.0, scheduledTime: "10:30 AM", lat: 12.8340, lng: 80.2190 }
    ]
  }
};

export const BusService = {
  getBusDetails(busId) {
    return buses[busId] || null;
  },

  getAllBuses() {
    return Object.values(buses);
  },

  getNearbyBuses() {
    // Returns a subset of buses styled as "nearby"
    return [buses["47A"], buses["19B"], buses["23C"], buses["102"]];
  }
};
