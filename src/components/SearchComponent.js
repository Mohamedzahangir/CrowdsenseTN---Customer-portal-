// SearchComponent.js - Search routes input and auto-completion panel
import { RouteService } from '../services/RouteService';
import { BusService } from '../services/BusService';
import { TrackingService } from '../services/TrackingService';
import { OccupancyService } from '../services/OccupancyService';
import { StorageService } from '../services/StorageService';
import { StatusBadge } from './StatusBadge';

export const SearchComponent = {
  renderHomeSearch() {
    return `
      <div class="glass-card rounded-xl p-5 space-y-4">
        <!-- Search trigger input -->
        <div class="relative group cursor-pointer" id="home-search-trigger">
          <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">search</span>
          <input class="w-full h-14 pl-12 pr-4 bg-surface-container-low border-none rounded-xl font-body-md text-body-md focus:ring-0 cursor-pointer placeholder:text-outline" placeholder="Where are you going? Enter destination..." type="text" readonly>
        </div>
        
        <!-- Current Location Badge -->
        <button class="w-full flex items-center justify-between p-3.5 bg-primary/5 rounded-xl border border-primary/10 hover:bg-primary/10 transition-all active:scale-[0.98] gap-2">
          <div class="flex items-center gap-3 text-left flex-1 min-w-0">
            <div class="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-primary flex-shrink-0">
              <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">location_on</span>
            </div>
            <div class="min-w-0 flex-1">
              <p class="font-label-caps text-[10px] md:text-label-caps text-primary uppercase">Current Location</p>
              <p class="font-body-md text-sm md:text-body-md font-semibold truncate">Anna Salai, Chennai City Centre</p>
            </div>
          </div>
          <span class="material-symbols-outlined text-outline flex-shrink-0">chevron_right</span>
        </button>
      </div>

      <!-- Full Search Panel (Hidden overlay) -->
      <div id="full-search-overlay" class="fixed inset-0 z-50 bg-background/95 backdrop-blur-md p-4 md:p-6 overflow-y-auto hidden">
        <div class="max-w-xl mx-auto space-y-6">
          <div class="flex justify-between items-center">
            <h2 class="font-headline-md text-headline-md text-primary font-bold">Route Planner</h2>
            <button id="close-search" class="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center hover:bg-surface-container-high transition-colors">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <div class="glass-card rounded-xl p-5 space-y-4">
            <!-- Source Input -->
            <div class="relative">
              <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary">my_location</span>
              <select id="search-source" class="w-full h-14 pl-12 pr-4 bg-surface-container-low border border-outline-variant/30 rounded-xl font-body-md text-body-md focus:ring-2 focus:ring-primary/20 appearance-none">
                <option value="Anna Salai, Chennai City Centre">Anna Salai, Chennai City Centre (Current)</option>
                ${RouteService.getAllStops().map(stop => `<option value="${stop}">${stop}</option>`).join('')}
              </select>
            </div>

            <!-- Destination Input -->
            <div class="relative">
              <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">location_on</span>
              <select id="search-destination" class="w-full h-14 pl-12 pr-4 bg-surface-container-low border border-outline-variant/30 rounded-xl font-body-md text-body-md focus:ring-2 focus:ring-primary/20">
                <option value="" disabled selected>Select destination stop...</option>
                ${RouteService.getAllStops().map(stop => `<option value="${stop}">${stop}</option>`).join('')}
              </select>
            </div>

            <button id="btn-do-search" class="w-full h-12 bg-primary text-on-primary rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all active:scale-[0.98]">
              Search Available Buses
            </button>
          </div>

          <!-- Saved / Recent Searches -->
          <div id="search-history-container" class="space-y-3">
            <h3 class="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Recent Searches</h3>
            <div id="recent-searches-list" class="space-y-2"></div>
          </div>

          <!-- Search Results Container -->
          <div id="search-results-container" class="space-y-4 hidden">
            <div class="flex justify-between items-end">
              <h3 class="font-title-lg text-title-lg text-on-background">Matching Services</h3>
              <span id="results-count" class="font-label-caps text-label-caps text-on-surface-variant">0 RESULTS</span>
            </div>
            <div id="search-results-list" class="space-y-3"></div>
          </div>
        </div>
      </div>
    `;
  },

  mountHomeSearch() {
    const trigger = document.getElementById('home-search-trigger');
    const overlay = document.getElementById('full-search-overlay');
    const closeBtn = document.getElementById('close-search');
    const searchBtn = document.getElementById('btn-do-search');
    const sourceSelect = document.getElementById('search-source');
    const destSelect = document.getElementById('search-destination');
    const resultsContainer = document.getElementById('search-results-container');
    const resultsList = document.getElementById('search-results-list');
    const resultsCount = document.getElementById('results-count');
    const historyContainer = document.getElementById('search-history-container');
    const recentList = document.getElementById('recent-searches-list');

    if (!trigger || !overlay || !closeBtn || !searchBtn) return;

    // Open full search panel
    trigger.addEventListener('click', () => {
      overlay.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
      renderRecentSearches();
    });

    // Close search panel
    closeBtn.addEventListener('click', () => {
      overlay.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
      resultsContainer.classList.add('hidden');
      destSelect.value = "";
    });

    // Render recent searches from LocalStorage
    function renderRecentSearches() {
      const recents = StorageService.getRecentSearches();
      if (recents.length === 0) {
        historyContainer.classList.add('hidden');
        return;
      }
      historyContainer.classList.remove('hidden');
      recentList.innerHTML = recents.map(search => `
        <div class="recent-search-item flex items-center justify-between p-3 bg-surface-container-low hover:bg-surface-container rounded-xl cursor-pointer transition-colors gap-2" data-src="${search.source}" data-dest="${search.destination}">
          <div class="flex items-center gap-3 flex-1 min-w-0">
            <span class="material-symbols-outlined text-outline flex-shrink-0">history</span>
            <div class="min-w-0 flex-1">
              <p class="font-body-md text-sm md:text-body-md font-semibold text-on-surface truncate">${search.source} → ${search.destination}</p>
            </div>
          </div>
          <span class="material-symbols-outlined text-outline flex-shrink-0">arrow_forward</span>
        </div>
      `).join('');

      recentList.querySelectorAll('.recent-search-item').forEach(item => {
        item.addEventListener('click', () => {
          const src = item.getAttribute('data-src');
          const dest = item.getAttribute('data-dest');
          // If source is not in the select dropdown list, set to first stop or custom
          if (Array.from(sourceSelect.options).some(opt => opt.value === src)) {
            sourceSelect.value = src;
          } else {
            sourceSelect.value = "Anna Salai, Chennai City Centre";
          }
          destSelect.value = dest;
          executeSearch();
        });
      });
    }

    // Execute Search
    searchBtn.addEventListener('click', executeSearch);

    function executeSearch() {
      let src = sourceSelect.value;
      const dest = destSelect.value;
      if (!dest) {
        alert("Please select a destination stop");
        return;
      }

      // If source is current location dummy, use the first stop of Vellore/Adyar as source fallback
      if (src.includes("Anna Salai")) {
        src = "Adyar Depot"; // Fallback to nearest major hub
      }

      const matches = RouteService.searchRoutes(src, dest);
      
      // Save search
      StorageService.addRecentSearch({ source: src, destination: dest });
      renderRecentSearches();

      resultsContainer.classList.remove('hidden');
      resultsCount.innerText = `${matches.length} RESULTS`;

      if (matches.length === 0) {
        resultsList.innerHTML = `
          <div class="p-6 text-center text-on-surface-variant opacity-80 bg-surface-container-low rounded-xl">
            <span class="material-symbols-outlined text-4xl mb-2">info</span>
            <p class="font-body-md font-semibold">No direct buses found between these stops.</p>
            <p class="text-body-sm mt-1">Try another destination stop or check active service updates.</p>
          </div>
        `;
        return;
      }

      resultsList.innerHTML = matches.map(match => {
        const tracker = TrackingService.getBusLocation(match.bus.id);
        const occupancy = OccupancyService.getOccupancy(match.bus.id);
        const eta = tracker ? tracker.eta : 10;
        const currentStop = tracker ? tracker.currentStop : match.bus.stops[0].name;
        const crowdLevelBadge = StatusBadge.render(occupancy ? occupancy.percentage : 30);

        return `
          <div data-result-bus-id="${match.bus.id}" class="search-result-card bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-4 md:p-5 shadow-[0_4px_12px_-4px_rgba(37,99,235,0.08)] hover:shadow-md transition-shadow active:scale-[0.99] cursor-pointer">
            <div class="flex justify-between items-start mb-3 gap-2">
              <div class="flex items-center gap-2 flex-1 min-w-0">
                <div class="bg-primary text-on-primary px-2.5 py-0.5 rounded-lg font-bold text-base md:text-title-lg flex-shrink-0">${match.bus.id}</div>
                <div class="min-w-0 flex-1">
                  <h4 class="font-bold text-primary text-body-sm md:text-body-md truncate">${match.bus.name}</h4>
                  <p class="text-[11px] md:text-xs text-on-surface-variant truncate">Via ${match.stopsCount} stops • ${match.distance} km</p>
                </div>
              </div>
              <div class="text-right flex-shrink-0">
                <p class="text-primary font-bold text-base md:text-headline-md leading-none whitespace-nowrap">${eta} min</p>
                <p class="text-[9px] md:text-label-caps font-label-caps text-outline uppercase mt-1">ETA</p>
              </div>
            </div>
            
            <div class="flex items-center gap-1.5 mb-3 text-on-surface-variant min-w-0">
              <span class="material-symbols-outlined text-primary text-[16px] pulse-live flex-shrink-0" style="font-variation-settings: 'FILL' 1;">sensors</span>
              <p class="text-xs truncate">Current Stop: <span class="text-on-background font-semibold">${currentStop}</span></p>
            </div>

            <div class="flex items-center justify-between pt-3 border-t border-outline-variant/20 gap-2">
              <div class="flex items-center gap-1.5 min-w-0">
                <span class="text-[9px] md:text-label-caps font-label-caps text-on-surface-variant flex-shrink-0">CROWD</span>
                ${crowdLevelBadge}
              </div>
              <div class="text-right text-[11px] md:text-xs text-on-surface-variant font-medium flex-shrink-0">
                Duration: ${match.duration} mins
              </div>
            </div>
          </div>
        `;
      }).join('');

      // Bind result card clicks
      resultsList.querySelectorAll('[data-result-bus-id]').forEach(card => {
        card.addEventListener('click', () => {
          const busId = card.getAttribute('data-result-bus-id');
          overlay.classList.add('hidden');
          document.body.classList.remove('overflow-hidden');
          window.location.hash = `#/bus-details?id=${busId}`;
        });
      });
    }
  }
};
