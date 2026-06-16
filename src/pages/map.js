// map.js - Live Map & Route Listing page module with Leaflet real map integration.
import { BusService } from '../services/BusService';
import { TrackingService } from '../services/TrackingService';
import { OccupancyService } from '../services/OccupancyService';
import { StatusBadge } from '../components/StatusBadge';

let trackingSubscription = null;
let occupancySubscription = null;

export const MapPage = {
  mapInstance: null,

  render(params) {
    const activeTab = params.tab || 'map';
    
    return `
      <!-- TopAppBar Header -->
      <header class="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-md border-b border-outline-variant/30 shadow-md shadow-primary/10 flex justify-between items-center px-margin-mobile h-16 w-full">
        <div class="flex items-center gap-3">
          <img class="w-8 h-8 object-contain mix-blend-multiply" src="/logo.png" alt="CrowdSense TN Logo" />
          <h1 class="text-xl md:text-2xl text-primary tracking-tight font-bold">CrowdSense TN</h1>
        </div>
        <button class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary-container/10 transition-colors active:scale-95 duration-200" onclick="window.location.hash='#/profile'">
          <span class="material-symbols-outlined text-on-surface-variant">account_circle</span>
        </button>
      </header>

      <!-- Main Content Container -->
      <main class="relative h-screen w-full pt-16 pb-20 overflow-hidden">
        
        <!-- Toggle Button Header (Floating on top of content) -->
        <div class="absolute top-20 left-1/2 -translate-x-1/2 z-20 w-[90%] max-w-sm">
          <div class="flex p-1 bg-surface/85 backdrop-blur-xl rounded-full shadow-lg shadow-primary/10 border border-outline-variant/30">
            <button class="flex-1 py-2 rounded-full font-label-caps text-label-caps font-bold transition-all duration-300 ${activeTab === 'map' ? 'bg-primary-container text-on-primary-container shadow-md' : 'text-on-surface-variant hover:bg-surface-variant/50'}" id="toggle-tab-map">
              Live Map
            </button>
            <button class="flex-1 py-2 rounded-full font-label-caps text-label-caps font-bold transition-all duration-300 ${activeTab === 'routes' ? 'bg-primary-container text-on-primary-container shadow-md' : 'text-on-surface-variant hover:bg-surface-variant/50'}" id="toggle-tab-routes">
              Routes
            </button>
          </div>
        </div>

        <!-- TAB 1: LIVE MAP CONTAINER -->
        <div id="live-map-view" class="absolute inset-0 z-0 pt-16 pb-20 ${activeTab === 'map' ? '' : 'hidden'}">
          <!-- Interactive Map Background -->
          <div class="relative w-full h-full bg-[#e3e8f0] overflow-hidden">
            <!-- Map Canvas Container for Leaflet -->
            <div id="map-canvas" class="w-full h-full"></div>
            
            <!-- Zoom Controls -->
            <div class="absolute right-4 top-32 flex flex-col gap-2 z-20 pointer-events-auto">
              <button id="btn-map-myloc" class="w-12 h-12 glass-panel rounded-xl shadow-md flex items-center justify-center text-primary active:scale-95 transition-all hover:bg-white/90" title="Center on Current Location">
                <span class="material-symbols-outlined font-bold">my_location</span>
              </button>
              <button id="btn-map-fit" class="w-12 h-12 glass-panel rounded-xl shadow-md flex items-center justify-center text-on-surface-variant active:scale-95 transition-all hover:bg-white/90" title="Fit All Active Buses">
                <span class="material-symbols-outlined">layers</span>
              </button>
            </div>
          </div>

          <!-- Bottom Sheet Overlay -->
          <div class="bottom-sheet fixed bottom-20 left-0 right-0 z-30 mx-auto max-w-2xl" id="bottom-sheet" style="transform: translateY(0);">
            <div class="glass-panel rounded-t-[32px] shadow-[0_-10px_25px_-5px_rgba(37,99,235,0.1)] px-4 pb-28 pt-4 h-[380px] max-h-[45dvh] md:max-h-[50dvh] overflow-y-auto">
              <!-- Drag Handle -->
              <div id="drag-handle" class="w-12 h-1.5 bg-outline-variant/60 rounded-full mx-auto mb-6 cursor-row-resize"></div>
              
              <div class="flex justify-between items-center mb-5">
                <div>
                  <h2 class="font-title-lg text-title-lg text-on-surface font-bold">Nearby Buses</h2>
                  <p class="font-body-sm text-body-sm text-on-surface-variant" id="nearby-status-text">Detecting active vehicles...</p>
                </div>
                <button class="text-primary font-label-caps text-label-caps font-bold flex items-center gap-1 hover:underline" id="view-all-routes-btn">
                  View All <span class="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>

              <!-- Nearby Buses List -->
              <div id="nearby-buses-list" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Dynamically populated bus cards -->
              </div>
            </div>
          </div>
        </div>

        <!-- TAB 2: ROUTES LIST VIEW -->
        <div id="routes-list-view" class="w-full h-full overflow-y-auto px-4 md:px-margin-desktop pt-28 pb-28 ${activeTab === 'routes' ? '' : 'hidden'}">
          <div class="max-w-2xl mx-auto space-y-6">
            <!-- Header Result Counter -->
            <div class="flex justify-between items-end px-1">
              <h2 class="font-title-lg text-title-lg text-on-background font-bold">Available Buses</h2>
              <span class="font-label-caps text-label-caps text-on-surface-variant" id="routes-counter-badge">6 RESULTS NEARBY</span>
            </div>

            <!-- Route Search Field (Matches Routes layout) -->
            <div class="relative group">
              <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
              <input type="text" id="routes-search-input" class="w-full bg-surface-container-lowest border border-outline-variant rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm font-body-md text-body-md" placeholder="Search route number or destination...">
            </div>

            <!-- Full List Container -->
            <div id="full-routes-list" class="space-y-4">
              <!-- Dynamic Route lists -->
            </div>
          </div>
        </div>

      </main>
    `;
  },

  mount(params) {
    const toggleMapBtn = document.getElementById('toggle-tab-map');
    const toggleRoutesBtn = document.getElementById('toggle-tab-routes');
    const mapView = document.getElementById('live-map-view');
    const routesView = document.getElementById('routes-list-view');
    const viewAllBtn = document.getElementById('view-all-routes-btn');
    
    let currentTab = params.tab || 'map';
    let updateMapAndListsFn = null;

    // Tab switching
    function showTab(tab) {
      currentTab = tab;
      if (tab === 'map') {
        mapView.classList.remove('hidden');
        routesView.classList.add('hidden');
        toggleMapBtn.className = "flex-1 py-2 rounded-full font-label-caps text-label-caps font-bold transition-all duration-300 bg-primary-container text-on-primary-container shadow-md";
        toggleRoutesBtn.className = "flex-1 py-2 rounded-full font-label-caps text-label-caps font-bold transition-all duration-300 text-on-surface-variant hover:bg-surface-variant/50";
        window.history.replaceState(null, "", "#/map?tab=map");
        
        // Invalidate map size so Leaflet correctly redraws the tiles when container is unhidden
        if (MapPage.mapInstance) {
          setTimeout(() => {
            MapPage.mapInstance.invalidateSize();
          }, 100);
        }
        if (updateMapAndListsFn) updateMapAndListsFn();
      } else {
        mapView.classList.add('hidden');
        routesView.classList.remove('hidden');
        toggleMapBtn.className = "flex-1 py-2 rounded-full font-label-caps text-label-caps font-bold transition-all duration-300 text-on-surface-variant hover:bg-surface-variant/50";
        toggleRoutesBtn.className = "flex-1 py-2 rounded-full font-label-caps text-label-caps font-bold transition-all duration-300 bg-primary-container text-on-primary-container shadow-md";
        window.history.replaceState(null, "", "#/map?tab=routes");
        if (updateMapAndListsFn) updateMapAndListsFn();
      }
    }

    toggleMapBtn.addEventListener('click', () => showTab('map'));
    toggleRoutesBtn.addEventListener('click', () => showTab('routes'));
    if (viewAllBtn) {
      viewAllBtn.addEventListener('click', () => showTab('routes'));
    }

    // Bottom Sheet Swipe interaction
    const bottomSheet = document.getElementById('bottom-sheet');
    const dragHandle = document.getElementById('drag-handle');
    let startY = 0;
    let currentY = 0;
    let isDragging = false;

    if (dragHandle && bottomSheet) {
      const startDrag = (e) => {
        startY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
        isDragging = true;
        bottomSheet.style.transition = 'none'; // Disable transition for real-time tracking
        bottomSheet.style.willChange = 'transform'; // Opt-in hardware acceleration
      };

      const moveDrag = (e) => {
        if (!isDragging) return;
        currentY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
        const diff = currentY - startY;
        if (diff > 0) { // dragging down
          bottomSheet.style.transform = `translateY(${diff}px)`;
        }
      };

      const endDrag = () => {
        if (!isDragging) return;
        isDragging = false;
        bottomSheet.style.transition = ''; // Restore CSS snap transition
        bottomSheet.style.willChange = ''; // Clean up hardware acceleration
        const diff = currentY - startY;
        if (diff > 120) {
          // Collapse state
          bottomSheet.style.transform = 'translateY(240px)';
        } else {
          // Restore state
          bottomSheet.style.transform = 'translateY(0)';
        }
      };

      dragHandle.addEventListener('touchstart', startDrag);
      window.addEventListener('touchmove', moveDrag, { passive: false });
      window.addEventListener('touchend', endDrag);

      dragHandle.addEventListener('mousedown', startDrag);
      window.addEventListener('mousemove', moveDrag);
      window.addEventListener('mouseup', endDrag);
    }

    const nearbyList = document.getElementById('nearby-buses-list');
    const nearbyStatusText = document.getElementById('nearby-status-text');
    const routesListContainer = document.getElementById('full-routes-list');
    const routesCounter = document.getElementById('routes-counter-badge');
    const searchInput = document.getElementById('routes-search-input');

    // Render static lists once on mount
    const nearbyBuses = BusService.getNearbyBuses();
    if (nearbyList) {
      nearbyList.innerHTML = nearbyBuses.map(bus => {
        const badgeClass = bus.id === "19B" ? "bg-tertiary-fixed text-on-tertiary-fixed-variant" : "bg-primary-fixed text-primary";
        return `
          <div data-nearby-bus-id="${bus.id}" class="p-3.5 bg-surface-container-lowest hover:bg-surface-container-low transition-colors rounded-2xl border border-outline-variant/20 flex items-center justify-between gap-2 cursor-pointer shadow-sm group">
            <div class="flex items-center gap-3 flex-1 min-w-0">
              <div class="w-12 h-12 rounded-xl ${badgeClass} flex items-center justify-center font-bold flex-shrink-0">
                <span>${bus.id}</span>
              </div>
              <div class="min-w-0 flex-1">
                <h3 class="font-title-lg text-[15px] md:text-[16px] leading-snug text-on-surface font-semibold truncate">${bus.name}</h3>
                <p class="text-xs text-on-surface-variant truncate">To ${bus.destination}</p>
              </div>
            </div>
            <div class="text-right flex flex-col items-end flex-shrink-0">
              <div class="occupancy-badge px-2.5 py-0.5 rounded-full font-label-caps text-[9px] font-bold uppercase mb-1 flex-shrink-0">
                -
              </div>
              <p class="eta-value font-bold text-base md:text-lg text-primary whitespace-nowrap">- min</p>
            </div>
          </div>
        `;
      }).join('');

      nearbyList.querySelectorAll('[data-nearby-bus-id]').forEach(card => {
        card.addEventListener('click', () => {
          const busId = card.getAttribute('data-nearby-bus-id');
          if (busId) window.location.hash = `#/bus-details?id=${busId}`;
        });
      });
      nearbyStatusText.innerText = `${nearbyBuses.length} active vehicles in your zone`;
    }

    const buses = BusService.getAllBuses();
    if (routesListContainer) {
      routesListContainer.innerHTML = buses.map(bus => {
        return `
          <div data-route-bus-id="${bus.id}" class="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-4 md:p-5 shadow-[0_4px_12px_-4px_rgba(37,99,235,0.08)] hover:shadow-md transition-shadow active:scale-[0.99] cursor-pointer">
            <div class="flex justify-between items-start mb-3 gap-2">
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 flex-wrap mb-1.5">
                  <div class="bg-primary-container text-on-primary-container px-2.5 py-0.5 rounded-lg font-bold text-base shadow-sm font-sans flex-shrink-0">${bus.id}</div>
                  <span class="font-bold text-primary text-base truncate">${bus.name}</span>
                </div>
                <div class="flex items-center gap-1 text-on-surface-variant">
                  <span class="material-symbols-outlined text-primary text-[16px] pulse-live flex-shrink-0" style="font-variation-settings: 'FILL' 1;">sensors</span>
                  <p class="text-xs truncate">At <span class="current-stop-name text-on-background font-semibold">-</span></p>
                </div>
              </div>
              <div class="text-right flex-shrink-0">
                <p class="eta-value text-primary font-bold text-base md:text-headline-md leading-none whitespace-nowrap">- min</p>
                <p class="text-[9px] md:text-label-caps font-label-caps text-outline uppercase mt-1">ETA</p>
              </div>
            </div>
            
            <div class="flex items-center justify-between pt-3 border-t border-outline-variant/20 gap-2">
              <div class="occupancy-badge-container flex flex-wrap items-center gap-1.5 md:gap-2 min-w-0">
                <span class="font-label-caps text-[9px] md:text-label-caps text-on-surface-variant flex-shrink-0">CROWD LEVEL</span>
              </div>
              <div class="flex -space-x-1 opacity-70 flex-shrink-0">
                <span class="material-symbols-outlined text-outline text-[16px] md:text-[18px]">accessible</span>
                <span class="material-symbols-outlined text-outline text-[16px] md:text-[18px]">ac_unit</span>
              </div>
            </div>
          </div>
        `;
      }).join('');

      routesListContainer.querySelectorAll('[data-route-bus-id]').forEach(card => {
        card.addEventListener('click', () => {
          const busId = card.getAttribute('data-route-bus-id');
          if (busId) window.location.hash = `#/bus-details?id=${busId}`;
        });
      });
      routesCounter.innerText = `${buses.length} RESULTS NEARBY`;
    }

    // Leaflet Map Initialization
    const mapCanvas = document.getElementById('map-canvas');
    if (mapCanvas && typeof window.L !== 'undefined') {
      const L = window.L;
      
      // Initialize map centered at Chennai metro area
      const map = L.map('map-canvas', {
        zoomControl: false,
        attributionControl: false
      }).setView([12.985, 80.245], 11);

      // Add CartoDB Positron Styled Tiles (Premium light gray aesthetic matching Stitch style)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19
      }).addTo(map);

      MapPage.mapInstance = map;

      // Draw route polylines
      const routePolylines = {};
      const busMarkers = {};
      const animMarkers = {};

      buses.forEach(bus => {
        const routeCoords = bus.stops.map(stop => [stop.lat, stop.lng]);
        
        let pathColor = '#004ac6'; // Default primary blue
        if (bus.id === "19B") pathColor = '#943700'; // Orange
        else if (bus.id === "23C") pathColor = '#22c55e'; // Green
        else if (bus.id === "M70") pathColor = '#ba1a1a'; // Red
        else if (bus.id === "102") pathColor = '#008a4f'; // Dark Green
        else if (bus.id === "570") pathColor = '#5c647a'; // Slate Grey

        const polyline = L.polyline(routeCoords, {
          color: pathColor,
          weight: 4,
          opacity: 0.75,
          lineJoin: 'round'
        }).addTo(map);

        routePolylines[bus.id] = polyline;
      });

      // Custom marker icon creation helper
      function createBusIcon(busId) {
        const markerColor = busId === "19B" ? "bg-tertiary" : "bg-primary";
        const labelColor = busId === "19B" ? "text-tertiary" : "text-primary";
        
        return L.divIcon({
          className: 'custom-bus-marker-icon',
          html: `
            <div class="relative flex flex-col items-center select-none" style="transform: translate(-20px, -20px); width: 40px; height: 40px;">
              <div class="${markerColor} p-2 rounded-full shadow-lg border-2 border-white flex items-center justify-center animate-pulse">
                <span class="material-symbols-outlined text-white text-[14px]" style="font-variation-settings: 'FILL' 1;">directions_bus</span>
              </div>
              <div class="mt-1 px-1.5 py-0.5 glass-panel rounded-full shadow-md border border-white/40 bg-white/95">
                <span class="font-label-caps text-[8px] font-bold ${labelColor}">${busId}</span>
              </div>
            </div>
          `,
          iconSize: [40, 40],
          iconAnchor: [20, 20]
        });
      }

      function updateRoutesListValues() {
        if (!routesListContainer) return;
        const allStates = TrackingService.getAllBusStates();
        const allOccupancy = OccupancyService.getAllOccupancyStates();

        buses.forEach(bus => {
          const card = routesListContainer.querySelector(`[data-route-bus-id="${bus.id}"]`);
          if (!card) return;

          const state = allStates[bus.id] || { eta: 15, currentStop: bus.stops[0].name };
          const occupancy = allOccupancy[bus.id] || { percentage: 25 };

          const stopNameEl = card.querySelector('.current-stop-name');
          if (stopNameEl && stopNameEl.innerText !== state.currentStop) {
            stopNameEl.innerText = state.currentStop;
          }

          const etaValEl = card.querySelector('.eta-value');
          if (etaValEl && etaValEl.innerText !== `${state.eta} min`) {
            etaValEl.innerText = `${state.eta} min`;
          }

          const badgeContainer = card.querySelector('.occupancy-badge-container');
          if (badgeContainer) {
            let badgeEl = badgeContainer.querySelector('.status-badge-el');
            const newBadgeHtml = StatusBadge.render(occupancy.percentage);
            
            if (!badgeEl) {
              const temp = document.createElement('div');
              temp.innerHTML = newBadgeHtml;
              const child = temp.firstElementChild;
              child.classList.add('status-badge-el');
              badgeContainer.appendChild(child);
            } else {
              const temp = document.createElement('div');
              temp.innerHTML = newBadgeHtml;
              const child = temp.firstElementChild;
              child.classList.add('status-badge-el');
              
              if (badgeEl.outerHTML !== child.outerHTML) {
                badgeEl.replaceWith(child);
              }
            }
          }
        });
      }

      function filterRoutesList(query = '') {
        if (!routesListContainer) return;
        const normQuery = query.toLowerCase().trim();
        let visibleCount = 0;

        buses.forEach(bus => {
          const card = routesListContainer.querySelector(`[data-route-bus-id="${bus.id}"]`);
          if (!card) return;

          const matches = bus.id.toLowerCase().includes(normQuery) || 
                          bus.name.toLowerCase().includes(normQuery) ||
                          bus.destination.toLowerCase().includes(normQuery);

          if (matches) {
            card.classList.remove('hidden');
            visibleCount++;
          } else {
            card.classList.add('hidden');
          }
        });

        if (routesCounter) {
          routesCounter.innerText = `${visibleCount} RESULTS NEARBY`;
        }

        let noResultsEl = document.getElementById('no-routes-found-message');
        if (visibleCount === 0) {
          if (!noResultsEl) {
            noResultsEl = document.createElement('div');
            noResultsEl.id = 'no-routes-found-message';
            noResultsEl.className = 'p-8 text-center text-on-surface-variant opacity-80 w-full';
            noResultsEl.innerHTML = `
              <span class="material-symbols-outlined text-4xl mb-2">search_off</span>
              <p class="font-body-md font-semibold">No routes found matching "${query}"</p>
            `;
            routesListContainer.appendChild(noResultsEl);
          } else {
            noResultsEl.querySelector('p').innerText = `No routes found matching "${query}"`;
            noResultsEl.classList.remove('hidden');
          }
        } else if (noResultsEl) {
          noResultsEl.classList.add('hidden');
        }
      }

      // Update function bound to simulator coordinates
      function updateMapAndLists() {
        const allStates = TrackingService.getAllBusStates();
        const allOccupancy = OccupancyService.getAllOccupancyStates();

        // 1. UPDATE LEAFLET MARKER TARGET COORDINATES
        Object.keys(allStates).forEach(busId => {
          const state = allStates[busId];
          if (!state) return;

          if (!busMarkers[busId]) {
            const marker = L.marker([state.lat, state.lng], {
              icon: createBusIcon(busId)
            }).addTo(map);

            marker.on('click', () => {
              window.location.hash = `#/bus-details?id=${busId}`;
            });

            busMarkers[busId] = marker;
            animMarkers[busId] = {
              startLat: state.lat,
              startLng: state.lng,
              currentLat: state.lat,
              currentLng: state.lng,
              targetLat: state.lat,
              targetLng: state.lng,
              startTime: performance.now(),
              duration: 3000
            };
          } else {
            const anim = animMarkers[busId];
            if (anim) {
              anim.startLat = anim.currentLat;
              anim.startLng = anim.currentLng;
              anim.targetLat = state.lat;
              anim.targetLng = state.lng;
              anim.startTime = performance.now();
            }
          }
        });

        // 2. RENDER NEARBY BUSES DOM (Only if currentTab is 'map')
        if (currentTab === 'map' && nearbyList) {
          nearbyBuses.forEach(bus => {
            const state = allStates[bus.id] || { eta: 10 };
            const occupancy = allOccupancy[bus.id] || { percentage: 30 };
            const badgeDetails = StatusBadge.getBadgeDetails(occupancy.percentage);
            
            const card = nearbyList.querySelector(`[data-nearby-bus-id="${bus.id}"]`);
            if (card) {
              const etaEl = card.querySelector('.eta-value');
              if (etaEl) {
                const newEta = `${state.eta} min`;
                if (etaEl.innerText !== newEta) etaEl.innerText = newEta;
              }

              const badgeEl = card.querySelector('.occupancy-badge');
              if (badgeEl) {
                const newLabel = badgeDetails.label.split(' ')[0];
                if (badgeEl.innerText !== newLabel) {
                  badgeEl.innerText = newLabel;
                  badgeEl.className = `occupancy-badge px-2.5 py-0.5 rounded-full font-label-caps text-[9px] font-bold uppercase ${badgeDetails.chipClass} mb-1 flex-shrink-0`;
                }
              }
            }
          });
        }

        // 3. RENDER FULL ROUTES LIST DOM (Only if currentTab is 'routes')
        if (currentTab === 'routes') {
          updateRoutesListValues();
          filterRoutesList(searchInput ? searchInput.value : '');
        }
      }

      updateMapAndListsFn = updateMapAndLists;

      // Bind search input
      if (searchInput) {
        searchInput.addEventListener('input', (e) => {
          filterRoutesList(e.target.value);
        });
      }

      // Bind Floating controls
      const mylocBtn = document.getElementById('btn-map-myloc');
      const fitBtn = document.getElementById('btn-map-fit');

      if (mylocBtn) {
        mylocBtn.addEventListener('click', () => {
          map.setView([13.0064, 80.2577], 13);
        });
      }

      if (fitBtn) {
        fitBtn.addEventListener('click', () => {
          const activeCoords = [];
          Object.keys(busMarkers).forEach(busId => {
            const anim = animMarkers[busId];
            if (anim) {
              activeCoords.push([anim.currentLat, anim.currentLng]);
            } else {
              activeCoords.push(busMarkers[busId].getLatLng());
            }
          });
          if (activeCoords.length > 0) {
            const bounds = L.latLngBounds(activeCoords);
            map.fitBounds(bounds, { padding: [50, 50] });
          }
        });
      }

      // Smooth marker gliding animation frame loop
      let animationFrameId = null;
      function animateMarkers(timestamp) {
        Object.keys(busMarkers).forEach(busId => {
          const marker = busMarkers[busId];
          const anim = animMarkers[busId];
          if (!marker || !anim) return;

          const elapsed = timestamp - anim.startTime;
          const progress = Math.min(elapsed / anim.duration, 1.0);

          if (anim.startLat !== undefined) {
            const currentLat = anim.startLat + (anim.targetLat - anim.startLat) * progress;
            const currentLng = anim.startLng + (anim.targetLng - anim.startLng) * progress;
            
            anim.currentLat = currentLat;
            anim.currentLng = currentLng;
            marker.setLatLng([currentLat, currentLng]);
          } else {
            anim.currentLat = anim.targetLat;
            anim.currentLng = anim.targetLng;
            marker.setLatLng([anim.targetLat, anim.targetLng]);
          }
        });
        animationFrameId = requestAnimationFrame(animateMarkers);
      }
      animationFrameId = requestAnimationFrame(animateMarkers);
      MapPage.animationFrameId = animationFrameId;

      // Initial render updates
      updateMapAndLists();
      
      // Trigger size invalidation after mount rendering settles
      setTimeout(() => {
        map.invalidateSize();
      }, 200);

      // Subscribe to simulated updates
      trackingSubscription = () => updateMapAndLists();
      occupancySubscription = () => updateMapAndLists();

      TrackingService.subscribe('all', trackingSubscription);
      OccupancyService.subscribe('all', occupancySubscription);
    }
  },

  unmount() {
    if (trackingSubscription) {
      TrackingService.unsubscribe('all', trackingSubscription);
      trackingSubscription = null;
    }
    if (occupancySubscription) {
      OccupancyService.unsubscribe('all', occupancySubscription);
      occupancySubscription = null;
    }
    // Cancel the animation frame to prevent background memory leaks
    if (MapPage.animationFrameId) {
      cancelAnimationFrame(MapPage.animationFrameId);
      MapPage.animationFrameId = null;
    }
    // Remove Leaflet map instance to prevent WebGL/Context leaks
    if (MapPage.mapInstance) {
      MapPage.mapInstance.remove();
      MapPage.mapInstance = null;
    }
  }
};
