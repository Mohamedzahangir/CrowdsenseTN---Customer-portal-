// BusCard.js - Reusable Bus summary card component
import { StatusBadge } from './StatusBadge';
import { RouteService } from '../services/RouteService';

export const BusCard = {
  getBadgeColors(bus) {
    if (bus.type === "Express") {
      return "bg-primary text-white";
    } else if (bus.type === "Local") {
      return "bg-outline/20 text-on-surface";
    } else if (bus.type === "Fast") {
      return "bg-primary/80 text-white";
    } else {
      return "bg-primary-container text-on-primary-container";
    }
  },

  render(bus, trackingState, occupancyState) {
    const bgClass = this.getBadgeColors(bus);
    const eta = trackingState ? trackingState.eta : 10;
    
    let currentStop = "-";
    if (trackingState) {
      currentStop = trackingState.currentStop;
    } else {
      const route = RouteService.getRouteDetails(bus.id);
      if (route && route.stops && route.stops.length > 0) {
        currentStop = route.stops[0].name;
      }
    }
    const percentage = occupancyState ? occupancyState.percentage : 30;
    
    return `
      <div data-bus-id="${bus.id}" class="bus-card-item glass-card p-3.5 md:p-4 rounded-xl flex items-center gap-3 md:gap-4 transition-all hover:bg-white/90 active:scale-[0.99] cursor-pointer group relative overflow-hidden">
        <!-- Route Badge -->
        <div class="w-12 h-12 md:w-14 md:h-14 rounded-lg ${bgClass} flex flex-col items-center justify-center flex-shrink-0 font-sans">
          <span class="text-lg md:text-xl font-bold leading-tight">${bus.id}</span>
          <span class="text-[8px] md:text-[9px] font-semibold uppercase tracking-tighter">${bus.type}</span>
        </div>
        
        <!-- Details Content -->
        <div class="flex-1 min-w-0">
          <div class="flex justify-between items-start mb-1 gap-2">
            <h3 class="text-base md:text-title-lg truncate pr-1 font-semibold text-on-surface">${bus.name}</h3>
            <div class="text-right flex flex-col items-end flex-shrink-0">
              <span class="font-bold text-primary text-base md:text-lg leading-none">${eta} min</span>
              <span class="text-[9px] md:text-[10px] text-outline uppercase font-semibold mt-1">ETA</span>
            </div>
          </div>
          
          <div class="flex items-center gap-1.5 mb-2">
            <span class="material-symbols-outlined text-outline text-sm md:text-base">location_on</span>
            <p class="font-body-sm text-xs md:text-body-sm text-on-surface-variant truncate">Currently at ${currentStop}</p>
          </div>
          
          <div class="flex items-center justify-between gap-2">
            <div class="flex flex-wrap items-center gap-1.5 md:gap-3">
              ${StatusBadge.render(percentage)}
              <span class="font-body-sm text-xs md:text-body-sm text-on-surface-variant flex items-center gap-1">
                <span class="material-symbols-outlined text-sm md:text-base">meeting_room</span>
                ${bus.platform || 'P1'}
              </span>
            </div>
            
            <!-- Icon symbols indicators matching Stitch -->
            <div class="flex -space-x-1 opacity-70 flex-shrink-0">
              <span class="material-symbols-outlined text-outline text-[16px] md:text-[18px]">wifi</span>
              <span class="material-symbols-outlined text-outline text-[16px] md:text-[18px]">ac_unit</span>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  bindClicks(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    
    container.querySelectorAll('[data-bus-id]').forEach(card => {
      card.addEventListener('click', (e) => {
        const busId = card.getAttribute('data-bus-id');
        if (busId) {
          // Visual feedback click flash
          card.style.backgroundColor = 'rgba(37, 99, 235, 0.05)';
          setTimeout(() => {
            window.location.hash = `#/bus-details?id=${busId}`;
          }, 100);
        }
      });
    });
  }
};
