// home.js - Passenger Home page module
import { BusService } from '../services/BusService';
import { TrackingService } from '../services/TrackingService';
import { OccupancyService } from '../services/OccupancyService';
import { BusCard } from '../components/BusCard';
import { SearchComponent } from '../components/SearchComponent';

let trackingSubscription = null;
let occupancySubscription = null;

export const HomePage = {
  render() {
    return `
      <!-- TopAppBar Header -->
      <header class="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-md border-b border-outline-variant/20 shadow-sm shadow-primary/10 flex justify-between items-center px-margin-mobile h-16 w-full">
        <div class="flex items-center gap-3">
          <img class="w-8 h-8 object-contain mix-blend-multiply" src="/logo.png" alt="CrowdSense TN Logo" />
          <h1 class="text-xl md:text-2xl text-primary tracking-tight font-bold">CrowdSense TN</h1>
        </div>
        <button id="header-noti-btn" class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary/5 transition-colors active:scale-95 duration-200">
          <span class="material-symbols-outlined text-primary">notifications</span>
        </button>
      </header>

      <!-- Main Canvas Container -->
      <main class="pt-20 pb-28 px-4 md:px-margin-desktop max-w-container-max mx-auto space-y-6">
        
        <!-- Hero Search Section -->
        <section class="mt-4" id="search-widget-container">
          ${SearchComponent.renderHomeSearch()}
        </section>
        
        <!-- Quick Actions Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div class="quick-action-btn glass-card p-3 md:p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-center transition-transform active:scale-95 cursor-pointer" data-dest="Adyar Depot">
            <span class="material-symbols-outlined text-primary text-2xl md:text-3xl">home</span>
            <span class="font-label-caps text-[11px] md:text-label-caps font-semibold">Home (Adyar)</span>
          </div>
          <div class="quick-action-btn glass-card p-3 md:p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-center transition-transform active:scale-95 cursor-pointer" data-dest="Tidel Park">
            <span class="material-symbols-outlined text-primary text-2xl md:text-3xl">work</span>
            <span class="font-label-caps text-[11px] md:text-label-caps font-semibold">Work (Tidel)</span>
          </div>
          <div class="quick-action-btn glass-card p-3 md:p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-center transition-transform active:scale-95 cursor-pointer" data-dest="Saidapet Stop">
            <span class="material-symbols-outlined text-primary text-2xl md:text-3xl">history</span>
            <span class="font-label-caps text-[11px] md:text-label-caps font-semibold">Recent Stop</span>
          </div>
          <div class="quick-action-btn glass-card p-3 md:p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-center transition-transform active:scale-95 cursor-pointer" data-dest="Katpadi Jn.">
            <span class="material-symbols-outlined text-primary text-2xl md:text-3xl">star</span>
            <span class="font-label-caps text-[11px] md:text-label-caps font-semibold">Saved (Katpadi)</span>
          </div>
        </div>
        
        <!-- Active Alerts Section -->
        <section class="space-y-3">
          <div class="flex justify-between items-end">
            <h2 class="font-title-lg text-title-lg text-on-background">Active Alerts</h2>
            <a href="#/alerts" class="text-primary font-label-caps text-label-caps font-semibold hover:underline">View All</a>
          </div>
          <div class="glass-card p-4 rounded-xl border-l-4 border-error flex gap-4 animate-pulse cursor-pointer" onclick="window.location.hash='#/alerts'">
            <div class="w-10 h-10 rounded-full bg-error-container flex items-center justify-center text-error flex-shrink-0">
              <span class="material-symbols-outlined">warning</span>
            </div>
            <div class="flex-1">
              <p class="font-title-lg text-[16px] leading-tight text-on-error-container font-semibold">Heavy Traffic: Mount Road</p>
              <p class="font-body-sm text-body-sm text-on-surface-variant mt-1">Expected delay of 15-20 mins due to construction near Gemini Flyover.</p>
            </div>
          </div>
        </section>
        
        <!-- Available Buses Section -->
        <section class="space-y-4">
          <div class="flex justify-between items-end">
            <h2 class="font-title-lg text-title-lg text-on-background">Available Buses</h2>
            <button class="p-2 bg-surface-container rounded-lg hover:bg-surface-container-high transition-colors"><span class="material-symbols-outlined text-[20px]">filter_list</span></button>
          </div>
          <div id="available-buses-container" class="space-y-3">
            <!-- Dynamically populated bus items -->
          </div>
        </section>
        
        <!-- Popular Destinations Section -->
        <section class="space-y-4 pb-8">
          <h2 class="font-title-lg text-title-lg text-on-background">Popular Destinations</h2>
          <div class="flex gap-4 overflow-x-auto scroll-hide pb-4 -mx-margin-mobile px-margin-mobile">
            <div class="popular-dest-card min-w-[140px] flex-shrink-0 space-y-2 cursor-pointer" data-dest="Marina Beach">
              <div class="w-full h-24 rounded-xl overflow-hidden shadow-sm relative group">
                <div class="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors"></div>
                <img class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQZLHvu5WicWio9F2JXMS4s2ioNOQQuFfZD2vPgfKDzq8P0k7D_cmaAdp906rGbVGPH6J4uuLWtrhPK6WgXr77TTFYP08KChCUuxl-tEa_8STxsk8zXF96qPyamDUK1oz1Yz_bf92DGvGBT5sGRiiOmBa1gO-yM58KNAWLwwnh21pqrXfYHtaHpTEikKacXGH-EBFI6qqFJ8h70gVfQLM3R-Nh0Ad8asbB_22Dn5L-c_b3eaB1CBKrJb6ku9cObPuzsJY4dC15O7jW" alt="Marina Beach">
              </div>
              <p class="font-body-sm text-body-sm font-semibold">Marina Beach</p>
            </div>
            
            <div class="popular-dest-card min-w-[140px] flex-shrink-0 space-y-2 cursor-pointer" data-dest="Central Station">
              <div class="w-full h-24 rounded-xl overflow-hidden shadow-sm relative group">
                <div class="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors"></div>
                <img class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0B7CYssova6fbd2-R7o2FLWn4rVutNAFUX3PqqdfhsVXCEZUPHiv4kt_MzuAumRmo85EW4q6N-JHmrKBnZgBvkOkvu0erQsC8Yk_9M-Csqtunt2sRvW0-Vzeu9JcCFOrBBzWXdwg7MpZWE2-pK1almHlYJLIlkBDznw9bxeSvo5LCQjSqTDDsCUkaEOdLxwWfc2uaxACQ2Oyo-363hiahlf5Qq8ZibHLuDCK4dt8TZMJbYjKYNG47zyL9UXJGdaZ186bmY-S5-BH9" alt="Central Station">
              </div>
              <p class="font-body-sm text-body-sm font-semibold">Central Station</p>
            </div>
            
            <div class="popular-dest-card min-w-[140px] flex-shrink-0 space-y-2 cursor-pointer" data-dest="Tidel Park">
              <div class="w-full h-24 rounded-xl overflow-hidden shadow-sm relative group">
                <div class="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors"></div>
                <img class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrujcYNSSeM-r-aBOY5zk44SRie6SENCywjwArnuWj45sBEu5JQAaVp4KC0sRS_DLXT414Utd0M4l3ncwlqoQeEoW8WzfUxB9VvjwRVm1X0eVtNo2IbH9W26mFfVEfstT3CfeG1-aMCCX5OkBU_TN31v3tH6hlYVba3VbQ2joXVHzsxZOt5e41CJUUGXond1KbwF5BXb-A68-xGRB3c8C8I4L4AsqU85UkQYRfFVSL3ttg8Vv8CFN-RCatQEYfWWYq7VrykrCBEXAD" alt="Tidel Park">
              </div>
              <p class="font-body-sm text-body-sm font-semibold">Tidel Park</p>
            </div>
          </div>
        </section>
      </main>
    `;
  },

  mount() {
    // Mount Search
    SearchComponent.mountHomeSearch();

    // Bind Quick Action buttons to open Route Search with predefined destination
    document.querySelectorAll('.quick-action-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const dest = btn.getAttribute('data-dest');
        const trigger = document.getElementById('home-search-trigger');
        if (trigger && dest) {
          trigger.click();
          const destSelect = document.getElementById('search-destination');
          if (destSelect) {
            destSelect.value = dest;
            const searchBtn = document.getElementById('btn-do-search');
            if (searchBtn) searchBtn.click();
          }
        }
      });
    });

    // Bind Popular Destination cards
    document.querySelectorAll('.popular-dest-card').forEach(card => {
      card.addEventListener('click', () => {
        const dest = card.getAttribute('data-dest');
        const trigger = document.getElementById('home-search-trigger');
        if (trigger && dest) {
          trigger.click();
          const destSelect = document.getElementById('search-destination');
          if (destSelect) {
            destSelect.value = dest;
            const searchBtn = document.getElementById('btn-do-search');
            if (searchBtn) searchBtn.click();
          }
        }
      });
    });

    // Header notification click
    const notiBtn = document.getElementById('header-noti-btn');
    if (notiBtn) {
      notiBtn.addEventListener('click', () => {
        window.location.hash = '#/alerts';
      });
    }

    // Dynamic available buses rendering
    const container = document.getElementById('available-buses-container');
    const buses = BusService.getNearbyBuses();

    function renderBuses() {
      if (!container) return;
      container.innerHTML = buses.map(bus => {
        const tracking = TrackingService.getBusLocation(bus.id);
        const occupancy = OccupancyService.getOccupancy(bus.id);
        return BusCard.render(bus, tracking, occupancy);
      }).join('');
      
      BusCard.bindClicks('#available-buses-container');
    }

    renderBuses();

    // Subscribe to updates for real-time visual syncing on the home dashboard
    trackingSubscription = () => renderBuses();
    occupancySubscription = () => renderBuses();

    TrackingService.subscribe('all', trackingSubscription);
    OccupancyService.subscribe('all', occupancySubscription);
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
  }
};
