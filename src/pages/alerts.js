// alerts.js - Service Alerts feed page module
import { AlertService } from '../services/AlertService';

export const AlertsPage = {
  render() {
    return `
      <!-- TopAppBar Header -->
      <header class="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-md border-b border-outline-variant/20 shadow-sm shadow-primary/10 flex justify-between items-center px-margin-mobile h-16 w-full">
        <div class="flex items-center gap-3">
          <img class="w-8 h-8 object-contain mix-blend-multiply" src="/logo.png" alt="CrowdSense TN Logo" />
          <h1 class="text-xl md:text-2xl text-primary tracking-tight font-bold">CrowdSense TN</h1>
        </div>
        <button class="material-symbols-outlined text-primary p-2 rounded-full hover:bg-primary/5 transition-colors active:scale-95 duration-200">notifications</button>
      </header>

      <!-- Main alerts dashboard -->
      <main class="pt-20 pb-28 px-4 md:px-margin-desktop max-w-2xl mx-auto">
        <div class="flex items-center justify-between mb-6">
          <div>
            <span class="font-label-caps text-label-caps text-primary uppercase font-bold">Service Updates</span>
            <h2 class="font-headline-md text-headline-md text-on-surface font-bold">Live Alerts</h2>
          </div>
          <div class="flex gap-2">
            <span class="bg-primary/10 text-primary text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-primary/20">
              <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              LIVE
            </span>
          </div>
        </div>

        <!-- Alerts Filter Categories -->
        <div class="flex gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar" id="alerts-filter-bar">
          <button class="px-4 py-2 rounded-full bg-primary text-on-primary font-label-caps text-label-caps shadow-lg shadow-primary/20" data-filter="all">All Alerts</button>
          <button class="px-4 py-2 rounded-full bg-surface-container text-on-surface-variant font-label-caps text-label-caps hover:bg-surface-container-high transition-colors" data-filter="critical">Critical</button>
          <button class="px-4 py-2 rounded-full bg-surface-container text-on-surface-variant font-label-caps text-label-caps hover:bg-surface-container-high transition-colors" data-filter="diversions">Diversions</button>
          <button class="px-4 py-2 rounded-full bg-surface-container text-on-surface-variant font-label-caps text-label-caps hover:bg-surface-container-high transition-colors" data-filter="updates">Route Updates</button>
        </div>

        <!-- Alerts Feed List -->
        <div id="alerts-feed-list" class="space-y-4">
          <!-- Populated dynamically -->
        </div>

        <!-- Spacer for nav bar -->
        <div class="h-16"></div>
      </main>
    `;
  },

  mount() {
    const feedList = document.getElementById('alerts-feed-list');
    const filterBar = document.getElementById('alerts-filter-bar');

    function renderAlerts(filterType = "all") {
      if (!feedList) return;

      const alertsData = AlertService.getCustomerAlerts();
      const filtered = filterType === "all" 
        ? alertsData 
        : alertsData.filter(alert => alert.type === filterType);

      if (filtered.length === 0) {
        feedList.innerHTML = `
          <div class="p-8 text-center text-on-surface-variant opacity-80 bg-surface-container-low rounded-xl">
            <span class="material-symbols-outlined text-4xl mb-2">done_all</span>
            <p class="font-body-md font-semibold">All clear!</p>
            <p class="text-body-sm mt-1">No alerts active in this category.</p>
          </div>
        `;
        return;
      }

      feedList.innerHTML = filtered.map(alert => `
        <div class="glass-card p-4 md:p-5 rounded-xl border-l-4 ${alert.colorClass} shadow-sm hover:shadow-md transition-all duration-300 group">
          <div class="flex items-start justify-between gap-3">
            <div class="flex gap-3 md:gap-4 flex-1 min-w-0">
              <!-- Icon Frame -->
              <div class="w-11 h-11 md:w-12 md:h-12 rounded-lg ${alert.bgClass} flex items-center justify-center ${alert.textClass} flex-shrink-0">
                <span class="material-symbols-outlined text-xl md:text-2xl" style="font-variation-settings: 'FILL' 1;">${alert.icon}</span>
              </div>
              
              <!-- Content -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1">
                  <span class="font-label-caps text-[10px] md:text-label-caps ${alert.textClass} font-bold">${alert.categoryLabel}</span>
                  <span class="text-on-surface-variant/40 text-[10px]">•</span>
                  <span class="font-body-sm text-xs md:text-body-sm text-on-surface-variant">${alert.timeAgo}</span>
                </div>
                <h3 class="text-base md:text-title-lg text-on-surface mb-2 font-semibold truncate-2-lines">${alert.title}</h3>
                <p class="font-body-sm text-xs md:text-body-sm text-on-secondary-container mb-4 leading-normal">${alert.description}</p>
                <div class="flex flex-wrap gap-2">
                  ${alert.affectedRoutes.map(route => `
                    <span class="px-2.5 py-0.5 rounded-full bg-surface-container-highest text-primary font-label-caps text-[9px] md:text-[10px] font-semibold">${route}</span>
                  `).join('')}
                </div>
              </div>
            </div>
            
            <button class="share-alert-btn material-symbols-outlined text-on-surface-variant opacity-50 group-hover:opacity-100 transition-opacity p-2 hover:bg-surface-container rounded-full flex-shrink-0">share</button>
          </div>
        </div>
      `).join('');

      // Add share click handlers
      feedList.querySelectorAll('.share-alert-btn').forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const alertItem = filtered[index];
          if (navigator.share) {
            navigator.share({
              title: alertItem.title,
              text: alertItem.description,
              url: window.location.href
            }).catch(() => {});
          } else {
            alert(`Sharing Alert: ${alertItem.title}\n\n${alertItem.description}`);
          }
        });
      });
    }

    // Filter button clicking logic
    if (filterBar) {
      const buttons = filterBar.querySelectorAll('button');
      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          buttons.forEach(b => {
            b.className = "px-4 py-2 rounded-full bg-surface-container text-on-surface-variant font-label-caps text-label-caps hover:bg-surface-container-high transition-colors";
          });
          btn.className = "px-4 py-2 rounded-full bg-primary text-on-primary font-label-caps text-label-caps shadow-lg shadow-primary/20 font-semibold";
          
          const filter = btn.getAttribute('data-filter');
          renderAlerts(filter);
        });
      });
    }

    // Initial render
    renderAlerts();
  }
};
