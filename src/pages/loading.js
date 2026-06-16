// loading.js - Loading screen page module
export const LoadingPage = {
  render() {
    return `
      <div class="bg-white min-h-screen flex flex-col items-center justify-between p-8 antialiased selection:bg-primary/20">
        <!-- Top Spacer for vertical balance -->
        <div class="h-12 w-full"></div>
        
        <!-- Central Focal Point -->
        <main class="flex flex-col items-center max-w-lg w-full text-center fade-in">
          <!-- Logo & Tagline Container -->
          <div class="relative group mb-10 w-full px-6 flex justify-center">
            <img class="relative max-w-xs md:max-w-sm w-full object-contain mix-blend-multiply" style="filter: brightness(1.05) contrast(1.02);" src="/src/assets/logo_with_tagline.png" alt="CrowdSense TN Logo with Tagline" />
          </div>
          
          <p class="text-on-surface-variant text-sm md:text-base font-medium opacity-80 mb-12">
            CrowdSense TN Transit System v4.2
          </p>
          
          <!-- Progress Indicator -->
          <div class="w-full max-w-xs space-y-3">
            <div class="flex justify-between items-end px-1">
              <span class="text-label-caps text-primary font-semibold tracking-widest uppercase" id="loading-status">Initializing Systems</span>
              <span class="text-body-sm font-mono text-on-surface-variant" id="percent">0%</span>
            </div>
            <div class="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
              <div class="h-full bg-primary rounded-full transition-all duration-300 ease-out shimmer-effect" id="progress-bar" style="width: 0%"></div>
            </div>
          </div>
        </main>
        
        <!-- Footer Branding -->
        <footer class="w-full flex flex-col items-center gap-6 pb-8 fade-in" style="animation-delay: 0.2s;">
          <div class="h-px w-16 bg-outline-variant"></div>
          <div class="flex flex-col items-center gap-2">
            <p class="text-label-caps text-on-surface-variant tracking-[0.2em] font-bold uppercase">
              Department of Transport
            </p>
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-primary scale-90" style="font-variation-settings: 'FILL' 1;">account_balance</span>
              <h2 class="text-on-surface font-semibold text-lg tracking-tight">
                Government of Tamil Nadu
              </h2>
            </div>
          </div>
          <div class="flex gap-4 opacity-40">
            <div class="w-1.5 h-1.5 rounded-full bg-on-surface-variant"></div>
            <div class="w-1.5 h-1.5 rounded-full bg-on-surface-variant"></div>
            <div class="w-1.5 h-1.5 rounded-full bg-on-surface-variant"></div>
          </div>
        </footer>
      </div>
    `;
  },

  mount() {
    const progressBar = document.getElementById('progress-bar');
    const percentText = document.getElementById('percent');
    const statusText = document.getElementById('loading-status');
    if (!progressBar || !percentText || !statusText) return;
    
    const steps = [
      { threshold: 20, label: "Connecting to Satellite..." },
      { threshold: 45, label: "Fetching Transit Data..." },
      { threshold: 70, label: "Optimizing Route Matrices..." },
      { threshold: 90, label: "Synchronizing Dashboards..." },
      { threshold: 100, label: "System Ready" }
    ];

    let progress = 0;
    let timeoutId = null;
    
    function updateProgress() {
      if (progress < 100) {
        progress += Math.floor(Math.random() * 10) + 2;
        if (progress > 100) progress = 100;
        
        progressBar.style.width = `${progress}%`;
        percentText.innerText = `${progress}%`;
        
        const currentStep = steps.find(s => progress <= s.threshold) || steps[steps.length - 1];
        statusText.innerText = currentStep.label;
        
        timeoutId = setTimeout(updateProgress, Math.random() * 200 + 80);
      } else {
        statusText.classList.add('text-green-600');
        timeoutId = setTimeout(() => {
          const redirectTarget = sessionStorage.getItem('redirect_target');
          sessionStorage.removeItem('redirect_target');
          window.location.hash = redirectTarget || '#/home';
        }, 600);
      }
    }

    updateProgress();

    // Store timeout ID to clear if unmounted early
    this._timeoutId = timeoutId;
  },

  unmount() {
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
    }
  }
};
