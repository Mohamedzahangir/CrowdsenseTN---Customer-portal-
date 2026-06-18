// bus-details.js - Bus Details and Live Stop progression timeline page
import { BusService } from '../services/BusService';
import { RouteService } from '../services/RouteService';
import { TrackingService } from '../services/TrackingService';
import { OccupancyService } from '../services/OccupancyService';
import { StorageService } from '../services/StorageService';
import { StatusBadge } from '../components/StatusBadge';

let trackingSub = null;
let occupancySub = null;

export const BusDetailsPage = {
  render(params) {
    const busId = params.id || "47A";
    const bus = BusService.getBusDetails(busId);
    
    if (!bus) {
      return `
        <div class="p-8 text-center text-on-surface-variant min-h-screen flex flex-col justify-center items-center">
          <span class="material-symbols-outlined text-5xl text-error mb-4">error</span>
          <h2 class="text-xl font-bold">Bus Route Not Found</h2>
          <p class="text-sm mt-2">The requested bus ID ${busId} is invalid or has expired.</p>
          <a href="#/home" class="mt-6 px-4 py-2 bg-primary text-white rounded-lg">Return Home</a>
        </div>
      `;
    }

    return `
      <!-- TopAppBar Header -->
      <header class="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-md border-b border-outline-variant/20 shadow-sm shadow-primary/10 flex justify-between items-center px-margin-mobile h-16 w-full">
        <div class="flex items-center gap-4">
          <button id="back-btn" class="p-2 hover:bg-primary/5 transition-colors active:scale-95 duration-200 rounded-full">
            <span class="material-symbols-outlined text-primary font-bold">arrow_back</span>
          </button>
          <h1 class="text-lg md:text-xl font-bold text-primary">Live Tracking</h1>
        </div>
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-on-surface-variant">notifications</span>
          <div class="w-8 h-8 rounded-full bg-primary-container/20 flex items-center justify-center border border-primary/20 overflow-hidden">
            <img alt="User Profile" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhiCV1ImKbJqcGmnbA5-Y4SUordUH_NyHCayM_eaFJLzQ4CJS4W_5eywz5AUyLy1uU_njcvdqTgEIndhsC7wSGlEFszqIaIgI1PKJHeGX-kPJjN1fOvgC5mv9eIp4Khhj4KpI0-beOcW6WHUIl_UJibbpeEVEumWsD5X2E7MeGA0G0qUr_V_2hdNi7L3UXz4oo-IYrx3T5Q23kaNkj5tyUMrfqXPOPNc_CzqVujCfjineflqM-h8u7XI-dGpsZDMyALKrtwWs2HTiq">
          </div>
        </div>
      </header>

      <main class="pt-20 pb-28 px-4 md:px-margin-desktop max-w-2xl mx-auto">
        <!-- Hero Route Info Card -->
        <section class="mb-6">
          <div class="bg-surface-container-lowest rounded-xl p-4 md:p-6 shadow-sm border border-outline-variant/10">
            <div class="flex justify-between items-start mb-4">
              <div>
                <div class="flex items-center gap-2 mb-1.5">
                  <span class="bg-primary text-on-primary px-2.5 py-1 rounded-lg font-bold text-base md:text-title-lg shadow-sm">${bus.id}</span>
                  <span class="text-on-surface-variant font-label-caps text-label-caps tracking-widest px-2 py-0.5 bg-surface-container rounded-md flex items-center gap-1 font-bold">
                    <span class="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                    LIVE
                  </span>
                  <span class="text-on-surface font-semibold text-base md:text-title-lg ml-1">${bus.name}</span>
                </div>
                <h2 class="text-base md:text-title-lg text-on-surface font-semibold">${bus.source} <span class="text-primary mx-1">→</span> ${bus.destination}</h2>
              </div>
              <!-- Save button -->
              <button id="btn-save-route" class="w-10 h-10 rounded-full flex items-center justify-center border border-outline-variant hover:bg-surface-container transition-colors">
                <span class="material-symbols-outlined text-on-surface-variant" id="save-icon">star</span>
              </button>
            </div>
            
            <!-- Live Status Metrics -->
            <div class="grid grid-cols-2 gap-4 pt-4 border-t border-outline-variant/20">
              <div class="flex flex-col">
                <span class="text-label-caps font-label-caps text-on-secondary-container mb-1">CURRENT SPEED</span>
                <div class="flex items-baseline gap-1">
                  <span class="text-2xl md:text-headline-md text-primary font-bold" id="live-speed">--</span>
                  <span class="text-body-sm text-on-surface-variant">km/h</span>
                </div>
              </div>
              <div class="flex flex-col">
                <span class="text-label-caps font-label-caps text-on-secondary-container mb-1">LAST STOP</span>
                <span class="text-base md:text-title-lg text-on-surface truncate font-semibold" id="last-stop-val">--</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Live Location Badge (Circular progress) -->
        <section class="mb-6">
          <div class="bg-surface-container-high p-4 md:p-6 rounded-xl border border-primary/10 shadow-md flex items-center justify-between gap-4 md:gap-6">
            <div class="flex items-center gap-4">
              <div class="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center flex-shrink-0">
                <svg class="w-full h-full -rotate-90">
                  <circle class="text-surface-container-highest" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" stroke-width="6" class="md:hidden"></circle>
                  <circle class="text-surface-container-highest hidden md:block" cx="40" cy="40" fill="transparent" r="36" stroke="currentColor" stroke-width="8"></circle>
                  
                  <circle id="radial-progress-ring-mobile" class="text-primary transition-all duration-700 ease-out md:hidden" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" stroke-dasharray="175.9" stroke-dashoffset="175.9" stroke-width="6" stroke-linecap="round"></circle>
                  <circle id="radial-progress-ring" class="text-primary transition-all duration-700 ease-out hidden md:block" cx="40" cy="40" fill="transparent" r="36" stroke="currentColor" stroke-dasharray="226.2" stroke-dashoffset="226.2" stroke-width="8" stroke-linecap="round"></circle>
                </svg>
                <div class="absolute inset-0 flex flex-col items-center justify-center">
                  <span class="font-bold text-base md:text-title-lg text-on-surface font-sans" id="occupancy-pct">--%</span>
                </div>
              </div>
              <div class="flex flex-col">
                <span class="text-label-caps font-bold text-primary uppercase tracking-widest mb-1">Occupancy</span>
                <div id="occupancy-badge-container">
                  <!-- Occupancy status badge -->
                </div>
              </div>
            </div>
            <div class="flex flex-col items-end flex-shrink-0">
              <div class="flex items-baseline gap-1">
                <span class="font-bold text-xl md:text-headline-md text-on-surface" id="passengers-count">--</span>
                <span class="text-on-surface-variant text-body-sm">/ ${bus.capacity}</span>
              </div>
              <span class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Passengers</span>
            </div>
          </div>
        </section>

        <!-- Approaching Stop Banner Alert -->
        <div class="mb-8 flex justify-center">
          <div id="approaching-banner" class="bg-primary-container text-on-primary-container px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-pulse">
            <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">my_location</span>
            <span class="text-body-sm font-semibold" id="approaching-text">Syncing live location...</span>
          </div>
        </div>

        <!-- Railway Style Timeline -->
        <section class="space-y-0 relative pl-2 pr-1 md:pl-4 md:pr-2" id="timeline-container">
          <!-- Populated dynamically to ensure index matches coordinates -->
        </section>

        <!-- Detailed Crowd Widget -->
        <section class="mt-8">
          <div class="bg-surface-container rounded-xl p-4 flex items-center justify-between shadow-sm">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <span class="material-symbols-outlined text-primary text-[28px]">airline_seat_recline_normal</span>
              </div>
              <div>
                <h4 class="font-title-lg text-title-lg text-on-surface font-semibold">Seat Availability</h4>
                <p class="text-body-sm text-on-secondary-container" id="seats-vacant-text">Loading availability...</p>
              </div>
            </div>
            <button id="btn-notify-seats" class="bg-primary text-on-primary px-4 py-2.5 rounded-lg font-semibold text-body-sm active:scale-95 transition-transform shadow-md hover:shadow-primary/20">
              Notify Me
            </button>
          </div>
        </section>
      </main>
    `;
  },

  mount(params) {
    const busId = params.id || "47A";
    const bus = BusService.getBusDetails(busId);
    if (!bus) return;

    BusDetailsPage.currentBusId = busId;
    const route = RouteService.getRouteDetails(busId);
    const stops = route ? route.stops : [];

    // Back Button
    const backBtn = document.getElementById('back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        // Go back in history or return to map
        if (window.history.length > 1) {
          window.history.back();
        } else {
          window.location.hash = '#/map';
        }
      });
    }

    // Save Route Button
    const saveBtn = document.getElementById('btn-save-route');
    const saveIcon = document.getElementById('save-icon');
    let isSaved = StorageService.getSavedRoutes().some(r => r.busId === busId);
    
    function updateSaveButtonState() {
      if (isSaved) {
        saveIcon.style.fontVariationSettings = "'FILL' 1";
        saveIcon.classList.add('text-primary');
        saveIcon.innerText = "star";
      } else {
        saveIcon.style.fontVariationSettings = "'FILL' 0";
        saveIcon.classList.remove('text-primary');
        saveIcon.innerText = "star";
      }
    }
    updateSaveButtonState();

    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        if (isSaved) {
          StorageService.removeRoute(busId);
          isSaved = false;
        } else {
          StorageService.saveRoute({
            id: `route-${Date.now()}`,
            label: `${bus.source.split(' ')[0]} Route`,
            desc: `${bus.type} ${bus.id} • ${bus.destination}`,
            busId: bus.id
          });
          isSaved = true;
        }
        updateSaveButtonState();
      });
    }

    // Notify seats button
    const notifyBtn = document.getElementById('btn-notify-seats');
    let isSubscribed = false;
    if (notifyBtn) {
      notifyBtn.addEventListener('click', () => {
        isSubscribed = !isSubscribed;
        if (isSubscribed) {
          notifyBtn.innerText = "Subscribed";
          notifyBtn.classList.remove('bg-primary', 'text-on-primary');
          notifyBtn.classList.add('bg-surface-container-highest', 'text-on-surface-variant');
          alert(`We will notify you when a seat becomes vacant on Route ${bus.id}!`);
        } else {
          notifyBtn.innerText = "Notify Me";
          notifyBtn.classList.add('bg-primary', 'text-on-primary');
          notifyBtn.classList.remove('bg-surface-container-highest', 'text-on-surface-variant');
        }
      });
    }

    // Dynamic Element Updates
    const speedEl = document.getElementById('live-speed');
    const lastStopEl = document.getElementById('last-stop-val');
    const radialRing = document.getElementById('radial-progress-ring');
    const occupancyPctEl = document.getElementById('occupancy-pct');
    const passengersCountEl = document.getElementById('passengers-count');
    const occupancyBadgeBox = document.getElementById('occupancy-badge-container');
    const approachingBanner = document.getElementById('approaching-banner');
    const approachingText = document.getElementById('approaching-text');
    const timelineContainer = document.getElementById('timeline-container');
    const seatsVacantText = document.getElementById('seats-vacant-text');

    // Subscribe to tracking coordinates progression
    trackingSub = (state) => {
      if (speedEl) speedEl.textContent = state.speed;
      if (lastStopEl) lastStopEl.textContent = state.currentStop;
      
      // Update approaching banner status
      if (state.lastStopIndex === stops.length - 1) {
        approachingBanner.className = "bg-green-100 text-green-800 px-4 py-2 rounded-full shadow-lg flex items-center gap-2";
        approachingText.textContent = `Bus has arrived at ${bus.destination}`;
      } else {
        approachingBanner.className = "bg-primary-container text-on-primary-container px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-pulse";
        approachingText.textContent = `Bus is approaching ${state.nextStop}`;
      }

      // Draw railway timeline
      renderTimeline(state);
    };

    // Subscribe to occupancy load fluctuations
    occupancySub = (state) => {
      if (passengersCountEl) passengersCountEl.textContent = state.passengers;
      if (occupancyPctEl) occupancyPctEl.textContent = `${state.percentage}%`;
      
      if (seatsVacantText) {
        const vacant = bus.capacity - state.passengers;
        seatsVacantText.textContent = `${vacant > 0 ? vacant : 0} seats vacant`;
      }

      // Update occupancy radial rings
      if (radialRing) {
        const dashOffset = 226.2 - (state.percentage / 100) * 226.2;
        radialRing.style.strokeDashoffset = dashOffset;
      }
      const radialRingMobile = document.getElementById('radial-progress-ring-mobile');
      if (radialRingMobile) {
        const dashOffset = 175.9 - (state.percentage / 100) * 175.9;
        radialRingMobile.style.strokeDashoffset = dashOffset;
      }

      // Update occupancy badge
      if (occupancyBadgeBox) {
        occupancyBadgeBox.innerHTML = StatusBadge.render(state.percentage);
      }
    };

    function renderTimeline(trackingState) {
      if (!timelineContainer) return;
      
      const lastIdx = trackingState.lastStopIndex;
      const nextIdx = trackingState.nextStopIndex;

      timelineContainer.innerHTML = stops.map((stop, index) => {
        let nodeClass = "relative pl-10 pb-8 railway-line";
        let nodeDot = "";
        let contentClass = "flex justify-between items-start";
        let stopLabel = "";
        let estTimeLabel = "";

        if (index === 0) {
          stopLabel = "Source";
        } else if (index === stops.length - 1) {
          stopLabel = "Destination";
          nodeClass = "relative pl-10 pb-8"; // no tail line at destination
        }

        // Passed stop
        if (index <= lastIdx) {
          nodeClass += " railway-line-solid";
          nodeDot = `
            <div class="absolute left-0 top-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center z-10 border-4 border-background">
              <span class="material-symbols-outlined text-white text-[14px]">check</span>
            </div>
          `;
          contentClass += " opacity-70";
          estTimeLabel = `<span class="text-body-sm text-on-surface-variant font-semibold">Passed</span>`;
          if (index > 0 && index < stops.length - 1) {
            stopLabel = "Departed";
          }
        } 
        // Arriving stop
        else if (index === nextIdx) {
          nodeDot = `
            <div class="absolute left-0 top-1 w-6 h-6 bg-surface-container-highest border-2 border-primary rounded-full flex items-center justify-center z-10">
              <div class="w-2.5 h-2.5 bg-primary rounded-full animate-ping"></div>
            </div>
          `;
          nodeClass += " bg-primary/5 p-2.5 md:p-3 rounded-xl border border-primary/20 -mt-1 ml-6 md:ml-9 pl-3 md:pl-4 pb-3 md:pb-4"; // Highlight container
          // Remove absolute coordinate offset for internal layout adjustments
          nodeClass = nodeClass.replace("pl-10", "");
          
          stopLabel = stopLabel ? `${stopLabel} • Arriving` : `Arriving in ${trackingState.eta} mins`;
          contentClass += " text-primary font-medium";
          estTimeLabel = `<span class="text-body-sm text-primary font-bold">Arriving</span>`;
        } 
        // Upcoming stop
        else {
          nodeDot = `
            <div class="absolute left-0 top-1 w-6 h-6 bg-surface-container-high border-2 border-outline-variant rounded-full z-10"></div>
          `;
          contentClass += " opacity-50";
          
          // Estimate upcoming time based on schedules or distances
          stopLabel = stopLabel || `Distance: ${Math.round((stop.distance - (trackingState.progress/100)*stops[stops.length-1].distance)*10)/10} km`;
          estTimeLabel = `<span class="text-body-sm text-on-surface">${stop.scheduledTime}</span>`;
        }

        const timeCrossOut = index <= lastIdx ? `line-through` : '';

        return `
          <!-- Stop Item -->
          <div class="${nodeClass}">
            ${nodeDot}
            <div class="${contentClass}">
              <div>
                <h3 class="text-base md:text-title-lg text-on-surface font-semibold">${stop.name}</h3>
                <p class="text-body-sm text-on-surface-variant">${stopLabel || 'Upcoming Stop'}</p>
              </div>
              <div class="text-right">
                <span class="block font-label-caps text-label-caps text-on-secondary-container ${timeCrossOut}">${stop.scheduledTime}</span>
                ${estTimeLabel}
              </div>
            </div>
          </div>
          
          <!-- Vehicle Icon floating on timeline between last passed and next arriving stop -->
          ${index === lastIdx && lastIdx !== stops.length - 1 ? `
            <div class="relative pl-10 h-0 z-20">
              <div class="absolute -left-3 -top-3 flex items-center justify-center bg-white rounded-full p-1 shadow-md border-2 border-primary">
                <span class="material-symbols-outlined text-primary text-[20px] pulse-live" style="font-variation-settings: 'FILL' 1;">directions_bus</span>
              </div>
            </div>
          ` : ''}
        `;
      }).join('');
    }

    TrackingService.subscribe(busId, trackingSub);
    OccupancyService.subscribe(busId, occupancySub);
  },

  unmount() {
    const busId = BusDetailsPage.currentBusId || '47A';
    
    if (trackingSub) {
      TrackingService.unsubscribe(busId, trackingSub);
      trackingSub = null;
    }
    if (occupancySub) {
      OccupancyService.unsubscribe(busId, occupancySub);
      occupancySub = null;
    }
  }
};
