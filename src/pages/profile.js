// profile.js - Commuter Profile, Analytics, and Saved Routes Manager
import { StorageService } from '../services/StorageService';
import { BusService } from '../services/BusService';

export const ProfilePage = {
  render() {
    const profile = StorageService.getProfile();
    
    return `
      <!-- TopAppBar Header -->
      <header class="fixed top-0 w-full z-50 bg-surface/70 dark:bg-surface/70 backdrop-blur-md border-b border-outline-variant/30 shadow-md shadow-primary/10 flex justify-between items-center px-margin-mobile h-16 w-full">
        <div class="flex items-center gap-3">
          <img class="w-8 h-8 object-contain mix-blend-multiply" src="/logo.png" alt="CrowdSense TN Logo" />
          <h1 class="text-xl md:text-2xl text-primary tracking-tight font-bold">CrowdSense TN</h1>
        </div>
        <button class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary-container/10 transition-colors active:scale-95 duration-200" onclick="window.location.hash='#/profile'">
          <span class="material-symbols-outlined text-on-surface-variant">account_circle</span>
        </button>
      </header>

      <main class="pt-20 pb-28 px-4 md:px-margin-desktop max-w-container-max mx-auto">
        <!-- Profile Header Section -->
        <section class="mb-8">
          <div class="glass-card p-4 md:p-6 rounded-2xl flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <div class="relative">
              <img alt="User Profile" class="w-24 h-24 rounded-full border-4 border-primary/20 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhiCV1ImKbJqcGmnbA5-Y4SUordUH_NyHCayM_eaFJLzQ4CJS4W_5eywz5AUyLy1uU_njcvdqTgEIndhsC7wSGlEFszqIaIgI1PKJHeGX-kPJjN1fOvgC5mv9eIp4Khhj4KpI0-beOcW6WHUIl_UJibbpeEVEumWsD5X2E7MeGA0G0qUr_V_2hdNi7L3UXz4oo-IYrx3T5Q23kaNkj5tyUMrfqXPOPNc_CzqVujCfjineflqM-h8u7XI-dGpsZDMyALKrtwWs2HTiq">
              <div class="absolute bottom-0 right-0 bg-primary text-on-primary p-1.5 rounded-full border-2 border-white flex items-center justify-center">
                <span class="material-symbols-outlined text-[16px] block font-bold">verified</span>
              </div>
            </div>
            <div class="text-center md:text-left flex-1">
              <h2 class="font-headline-md text-headline-md text-on-background font-semibold">${profile.name}</h2>
              <p class="text-on-surface-variant font-body-md mb-2">Transit ID: ${profile.transitId}</p>
              <div class="inline-flex items-center gap-2 bg-primary-container/10 text-primary px-3 py-1 rounded-full">
                <span class="material-symbols-outlined text-[18px]">workspace_premium</span>
                <span class="font-label-caps text-label-caps font-bold">${profile.role}</span>
              </div>
            </div>
            <div class="flex gap-3 w-full md:w-auto">
              <button id="edit-profile-btn" class="w-full md:w-auto bg-primary text-on-primary px-5 py-2 md:px-6 md:py-2.5 rounded-lg text-sm md:text-title-lg flex items-center justify-center gap-2 hover:shadow-lg transition-all active:scale-95 font-semibold">
                <span class="material-symbols-outlined text-sm md:text-base">edit</span>
                Edit Profile
              </button>
            </div>
          </div>
        </section>

        <!-- Bento Grid for Analytics and Routes -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 mb-8">
          <!-- Travel Analytics Widget -->
          <div class="md:col-span-8 glass-card p-4 md:p-6 rounded-2xl">
            <div class="flex justify-between items-center mb-6">
              <h3 class="font-title-lg text-title-lg flex items-center gap-2 font-semibold">
                <span class="material-symbols-outlined text-primary">analytics</span>
                Travel Analytics
              </h3>
              <span class="text-on-surface-variant font-label-caps text-label-caps font-bold">OCTOBER 2026</span>
            </div>
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              <div class="p-3 md:p-4 bg-surface-container-low rounded-xl">
                <p class="text-on-surface-variant font-label-caps text-[10px] md:text-label-caps mb-1 truncate">TOTAL TRIPS</p>
                <p class="text-xl md:text-headline-md text-primary font-bold">${profile.tripsCount}</p>
                <p class="text-xs text-green-600 mt-1 flex items-center font-medium">
                  <span class="material-symbols-outlined text-[14px]">trending_up</span> +8%
                </p>
              </div>
              <div class="p-3 md:p-4 bg-surface-container-low rounded-xl">
                <p class="text-on-surface-variant font-label-caps text-[10px] md:text-label-caps mb-1 truncate">TIME SAVED</p>
                <p class="text-xl md:text-headline-md text-primary font-bold">${profile.timeSaved}</p>
                <p class="text-xs text-on-surface-variant mt-1 font-medium truncate">vs driving</p>
              </div>
              <div class="p-3 md:p-4 bg-surface-container-low rounded-xl">
                <p class="text-on-surface-variant font-label-caps text-[10px] md:text-label-caps mb-1 truncate">CO2 OFFSET</p>
                <p class="text-xl md:text-headline-md text-primary font-bold">${profile.co2Offset}</p>
                <p class="text-xs text-green-600 mt-1 font-medium truncate">Eco-Leader</p>
              </div>
              <div class="p-3 md:p-4 bg-surface-container-low rounded-xl">
                <p class="text-on-surface-variant font-label-caps text-[10px] md:text-label-caps mb-1 truncate">CROWD AVOIDANCE</p>
                <p class="text-xl md:text-headline-md text-primary font-bold">${profile.avoidanceScore}</p>
                <p class="text-xs text-on-surface-variant mt-1 font-medium truncate">Efficiency score</p>
              </div>
            </div>
            <div class="mt-8 h-32 w-full relative overflow-hidden rounded-xl bg-surface-variant/20 flex items-end justify-between px-2 pt-4">
              <!-- Mock Bar Chart (efficiency visualization) -->
              <div class="w-[8%] bg-primary/20 h-[40%] rounded-t-lg transition-all hover:bg-primary/40 cursor-help" title="Monday: 4 trips"></div>
              <div class="w-[8%] bg-primary/30 h-[60%] rounded-t-lg transition-all hover:bg-primary/50 cursor-help" title="Tuesday: 6 trips"></div>
              <div class="w-[8%] bg-primary-container h-[85%] rounded-t-lg transition-all hover:opacity-80 cursor-help" title="Wednesday: 9 trips"></div>
              <div class="w-[8%] bg-primary/40 h-[50%] rounded-t-lg transition-all hover:bg-primary/60 cursor-help" title="Thursday: 5 trips"></div>
              <div class="w-[8%] bg-primary/20 h-[30%] rounded-t-lg transition-all hover:bg-primary/40 cursor-help" title="Friday: 3 trips"></div>
              <div class="w-[8%] bg-primary/10 h-[15%] rounded-t-lg transition-all hover:bg-primary/30 cursor-help" title="Saturday: 1 trip"></div>
              <div class="w-[8%] bg-primary/10 h-[10%] rounded-t-lg transition-all hover:bg-primary/30 cursor-help" title="Sunday: 1 trip"></div>
              <div class="w-[8%] bg-primary/30 h-[55%] rounded-t-lg transition-all hover:bg-primary/50 cursor-help" title="Monday: 5 trips"></div>
              <div class="w-[8%] bg-primary/50 h-[75%] rounded-t-lg transition-all hover:bg-primary/70 cursor-help" title="Tuesday: 8 trips"></div>
              <div class="w-[8%] bg-primary-container h-[95%] rounded-t-lg transition-all hover:opacity-80 cursor-help" title="Wednesday: 10 trips"></div>
            </div>
          </div>

          <!-- Saved Routes Widget -->
          <div class="md:col-span-4 glass-card p-4 md:p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <div class="flex justify-between items-center mb-6">
                <h3 class="font-title-lg text-title-lg flex items-center gap-2 font-semibold">
                  <span class="material-symbols-outlined text-primary">bookmarks</span>
                  Saved Routes
                </h3>
              </div>
              <div id="saved-routes-list-box" class="space-y-4">
                <!-- Dynamically populated saved routes -->
              </div>
            </div>
            <button id="add-route-shortcut-btn" class="w-full mt-4 py-3 border-2 border-dashed border-outline-variant text-on-surface-variant rounded-xl flex items-center justify-center gap-2 hover:bg-surface-variant/30 transition-colors">
              <span class="material-symbols-outlined">add_circle</span>
              <span class="font-label-caps font-bold">ADD NEW ROUTE</span>
            </button>
          </div>
        </div>

        <!-- Recent Trips Section -->
        <section class="mb-8">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg md:text-headline-md text-on-background font-semibold">Recent Trips</h3>
            <button class="text-primary text-sm md:text-title-lg flex items-center gap-1 hover:gap-2 transition-all font-semibold" id="trip-history-btn">
              Full History <span class="material-symbols-outlined text-sm md:text-base">chevron_right</span>
            </button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <!-- Trip Card 1 -->
            <div class="glass-card p-3.5 md:p-5 rounded-2xl flex items-start gap-3 md:gap-4 hover:shadow-md transition-shadow cursor-pointer" onclick="window.location.hash='#/bus-details?id=47A'">
              <div class="w-11 h-11 md:w-12 md:h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center shrink-0 border border-green-200">
                <span class="material-symbols-outlined text-lg md:text-xl" style="font-variation-settings: 'FILL' 1;">directions_bus</span>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex justify-between items-start mb-1 gap-2">
                  <h4 class="text-base md:text-title-lg text-on-background font-semibold truncate">Green Circle</h4>
                  <span class="text-on-surface-variant text-[10px] md:text-[12px] font-medium flex-shrink-0">Yesterday</span>
                </div>
                <p class="text-body-sm text-xs md:text-body-sm text-on-surface-variant mb-2 truncate">To Katpadi Jn. (47A)</p>
                <div class="flex flex-wrap items-center gap-1.5 md:gap-2">
                  <span class="inline-block px-2 py-0.5 rounded bg-green-100 text-green-800 text-[9px] md:text-[10px] font-bold">LOW CROWD</span>
                  <span class="text-on-surface-variant text-[11px] md:text-[12px] whitespace-nowrap">• 18 min journey</span>
                </div>
              </div>
            </div>
            <!-- Trip Card 2 -->
            <div class="glass-card p-3.5 md:p-5 rounded-2xl flex items-start gap-3 md:gap-4 hover:shadow-md transition-shadow cursor-pointer" onclick="window.location.hash='#/bus-details?id=102'">
              <div class="w-11 h-11 md:w-12 md:h-12 bg-yellow-100 text-yellow-700 rounded-full flex items-center justify-center shrink-0 border border-yellow-200">
                <span class="material-symbols-outlined text-lg md:text-xl" style="font-variation-settings: 'FILL' 1;">directions_bus</span>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex justify-between items-start mb-1 gap-2">
                  <h4 class="text-base md:text-title-lg text-on-background font-semibold truncate">Tidel Park</h4>
                  <span class="text-on-surface-variant text-[10px] md:text-[12px] font-medium flex-shrink-0">2 days ago</span>
                </div>
                <p class="text-body-sm text-xs md:text-body-sm text-on-surface-variant mb-2 truncate">To Kelambakkam (102)</p>
                <div class="flex flex-wrap items-center gap-1.5 md:gap-2">
                  <span class="inline-block px-2 py-0.5 rounded bg-yellow-100 text-yellow-800 text-[9px] md:text-[10px] font-bold">MODERATE</span>
                  <span class="text-on-surface-variant text-[11px] md:text-[12px] whitespace-nowrap">• 24 min journey</span>
                </div>
              </div>
            </div>
            <!-- Trip Card 3 -->
            <div class="glass-card p-3.5 md:p-5 rounded-2xl flex items-start gap-3 md:gap-4 hover:shadow-md transition-shadow cursor-pointer" onclick="window.location.hash='#/bus-details?id=19B'">
              <div class="w-11 h-11 md:w-12 md:h-12 bg-red-100 text-red-700 rounded-full flex items-center justify-center shrink-0 border border-red-200">
                <span class="material-symbols-outlined text-lg md:text-xl" style="font-variation-settings: 'FILL' 1;">directions_bus</span>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex justify-between items-start mb-1 gap-2">
                  <h4 class="text-base md:text-title-lg text-on-background font-semibold truncate">Saidapet Stop</h4>
                  <span class="text-on-surface-variant text-[10px] md:text-[12px] font-medium flex-shrink-0">Oct 12</span>
                </div>
                <p class="text-body-sm text-xs md:text-body-sm text-on-surface-variant mb-2 truncate">To T. Nagar (19B)</p>
                <div class="flex flex-wrap items-center gap-1.5 md:gap-2">
                  <span class="inline-block px-2 py-0.5 rounded bg-red-100 text-red-800 text-[9px] md:text-[10px] font-bold">HIGH CROWD</span>
                  <span class="text-on-surface-variant text-[11px] md:text-[12px] whitespace-nowrap">• 12 min journey</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Settings & Support Section -->
        <section class="glass-card rounded-2xl overflow-hidden mb-12 shadow-sm">
          <div class="p-4 md:p-6 border-b border-outline-variant/20 bg-surface-container-low">
            <h3 class="text-base md:text-title-lg font-semibold">Account &amp; App Settings</h3>
          </div>
          <div class="divide-y divide-outline-variant/20">
            <div class="settings-item flex items-center justify-between p-3 md:p-4 hover:bg-surface-variant/20 transition-colors group cursor-pointer gap-2">
              <div class="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                <div class="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors flex-shrink-0">
                  <span class="material-symbols-outlined">notifications</span>
                </div>
                <div class="min-w-0 flex-1">
                  <p class="font-body-md text-sm md:text-body-md text-on-background font-semibold truncate">Notification Preferences</p>
                  <p class="text-xs md:text-body-sm text-on-surface-variant truncate">Crowd alerts, delays, and updates</p>
                </div>
              </div>
              <span class="material-symbols-outlined text-outline flex-shrink-0">chevron_right</span>
            </div>
            
            <div class="settings-item flex items-center justify-between p-3 md:p-4 hover:bg-surface-variant/20 transition-colors group cursor-pointer gap-2">
              <div class="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                <div class="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors flex-shrink-0">
                  <span class="material-symbols-outlined">security</span>
                </div>
                <div class="min-w-0 flex-1">
                  <p class="font-body-md text-sm md:text-body-md text-on-background font-semibold truncate">Privacy &amp; Security</p>
                  <p class="text-xs md:text-body-sm text-on-surface-variant truncate">Manage your data and location sharing</p>
                </div>
              </div>
              <span class="material-symbols-outlined text-outline flex-shrink-0">chevron_right</span>
            </div>

            <div class="settings-item flex items-center justify-between p-3 md:p-4 hover:bg-surface-variant/20 transition-colors group cursor-pointer gap-2">
              <div class="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                <div class="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors flex-shrink-0">
                  <span class="material-symbols-outlined">help</span>
                </div>
                <div class="min-w-0 flex-1">
                  <p class="font-body-md text-sm md:text-body-md text-on-background font-semibold truncate">Help &amp; Support</p>
                  <p class="text-xs md:text-body-sm text-on-surface-variant truncate">FAQs, User guide, and Contact us</p>
                </div>
              </div>
              <span class="material-symbols-outlined text-outline flex-shrink-0">chevron_right</span>
            </div>

            <button id="btn-signout" class="w-full flex items-center justify-between p-3 md:p-4 hover:bg-error-container/10 transition-colors group text-left gap-2">
              <div class="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                <div class="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-error flex-shrink-0">
                  <span class="material-symbols-outlined">logout</span>
                </div>
                <div class="min-w-0 flex-1">
                  <p class="font-body-md text-sm md:text-body-md text-error font-semibold truncate">Sign Out / Reset Session</p>
                </div>
              </div>
            </button>
          </div>
        </section>
      </main>
    `;
  },

  mount() {
    const editBtn = document.getElementById('edit-profile-btn');
    if (editBtn) {
      editBtn.addEventListener('click', () => {
        alert("Profile editing is disabled in demo mode.");
      });
    }

    const settingsItems = document.querySelectorAll('.settings-item');
    settingsItems.forEach(item => {
      item.addEventListener('click', () => {
        alert("This setting option is fully configured with standard options.");
      });
    });

    const historyBtn = document.getElementById('trip-history-btn');
    if (historyBtn) {
      historyBtn.addEventListener('click', () => {
        alert("Full trip logs are successfully synced with transit databases.");
      });
    }

    const signoutBtn = document.getElementById('btn-signout');
    if (signoutBtn) {
      signoutBtn.addEventListener('click', () => {
        if (confirm("Resetting session will clear local storage and reload the starting sequence. Proceed?")) {
          localStorage.clear();
          sessionStorage.clear();
          window.location.hash = '#/loading';
        }
      });
    }

    // Saved Routes rendering and management
    const routesBox = document.getElementById('saved-routes-list-box');
    const addBtn = document.getElementById('add-route-shortcut-btn');

    function renderSavedRoutes() {
      if (!routesBox) return;
      
      const saved = StorageService.getSavedRoutes();
      
      if (saved.length === 0) {
        routesBox.innerHTML = `
          <div class="p-6 text-center text-on-surface-variant opacity-80 border-2 border-dashed border-outline-variant/30 rounded-xl">
            <p class="text-sm font-semibold">No saved routes yet.</p>
            <p class="text-xs mt-1">Bookmark routes on tracking pages to view them here.</p>
          </div>
        `;
        return;
      }

      routesBox.innerHTML = saved.map(route => {
        const badgeColor = route.label.includes('WORK') ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary';
        return `
          <div class="saved-route-card-item p-3 md:p-4 bg-surface-container-low rounded-xl border border-transparent hover:border-primary/20 transition-all cursor-pointer group flex items-center justify-between gap-2" data-saved-bus-id="${route.busId}">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-2">
                <span class="${badgeColor} px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">${route.label}</span>
              </div>
              <p class="font-title-lg text-on-background font-semibold truncate">${route.desc}</p>
              <p class="text-xs text-on-surface-variant">Tap to view live tracking</p>
            </div>
            <button class="remove-saved-route-btn p-2 rounded-full hover:bg-surface-container-high transition-colors" data-remove-bus-id="${route.busId}">
              <span class="material-symbols-outlined text-error font-bold hover:scale-110 transition-transform">delete</span>
            </button>
          </div>
        `;
      }).join('');

      // Bind card clicks for route tracking redirection
      routesBox.querySelectorAll('.saved-route-card-item').forEach(card => {
        card.addEventListener('click', (e) => {
          // If delete button is clicked, do not navigate
          if (e.target.closest('.remove-saved-route-btn')) return;

          const busId = card.getAttribute('data-saved-bus-id');
          if (busId) {
            window.location.hash = `#/bus-details?id=${busId}`;
          }
        });
      });

      // Bind delete button clicks
      routesBox.querySelectorAll('.remove-saved-route-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const busId = btn.getAttribute('data-remove-bus-id');
          if (busId) {
            StorageService.removeRoute(busId);
            renderSavedRoutes();
          }
        });
      });
    }

    // Add Route Shortcut action
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        // Redirect user to Map/Routes list so they can choose a bus and save it
        window.location.hash = '#/map?tab=routes';
      });
    }

    renderSavedRoutes();
  }
};
