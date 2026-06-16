(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function a(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=a(s);fetch(s.href,n)}})();const Ie={render(){return`
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
    `},mount(){const e=document.getElementById("progress-bar"),t=document.getElementById("percent"),a=document.getElementById("loading-status");if(!e||!t||!a)return;const i=[{threshold:20,label:"Connecting to Satellite..."},{threshold:45,label:"Fetching Transit Data..."},{threshold:70,label:"Optimizing Route Matrices..."},{threshold:90,label:"Synchronizing Dashboards..."},{threshold:100,label:"System Ready"}];let s=0,n=null;function r(){if(s<100){s+=Math.floor(Math.random()*10)+2,s>100&&(s=100),e.style.width=`${s}%`,t.innerText=`${s}%`;const o=i.find(l=>s<=l.threshold)||i[i.length-1];a.innerText=o.label,n=setTimeout(r,Math.random()*200+80)}else a.classList.add("text-green-600"),n=setTimeout(()=>{const o=sessionStorage.getItem("redirect_target");sessionStorage.removeItem("redirect_target"),window.location.hash=o||"#/home"},600)}r(),this._timeoutId=n},unmount(){this._timeoutId&&clearTimeout(this._timeoutId)}},Q={"47A":{id:"47A",number:"TN-23-N-4512",name:"Vellore Express",type:"Express",source:"Vellore Bus Terminus",destination:"Katpadi Jn.",platform:"P4",capacity:60,stops:[{name:"Vellore Bus Terminus",distance:0,scheduledTime:"09:15 AM",lat:12.9238,lng:79.1352},{name:"Vellore Fort",distance:2.5,scheduledTime:"09:25 AM",lat:12.9275,lng:79.1302},{name:"Green Circle",distance:5.8,scheduledTime:"09:40 AM",lat:12.9372,lng:79.1355},{name:"Silk Mill",distance:9,scheduledTime:"09:55 AM",lat:12.946,lng:79.1415},{name:"Katpadi Jn.",distance:12,scheduledTime:"10:15 AM",lat:12.968,lng:79.1378}]},"19B":{id:"19B",number:"TN-01-N-8829",name:"T. Nagar Loop",type:"Local",source:"Adyar Depot",destination:"T. Nagar Bus Terminus",platform:"P1",capacity:60,stops:[{name:"Adyar Depot",distance:0,scheduledTime:"09:30 AM",lat:13.0064,lng:80.2577},{name:"Saidapet Stop",distance:3.1,scheduledTime:"09:42 AM",lat:13.021,lng:80.2227},{name:"Little Mount",distance:4.8,scheduledTime:"09:50 AM",lat:13.0163,lng:80.2205},{name:"Nandanam",distance:6.2,scheduledTime:"09:58 AM",lat:13.0298,lng:80.2335},{name:"T. Nagar Bus Terminus",distance:8.5,scheduledTime:"10:10 AM",lat:13.0405,lng:80.2337}]},"23C":{id:"23C",number:"TN-01-N-6610",name:"Thiruvanmiyur Fast",type:"Fast",source:"Mylapore Temple",destination:"Thiruvanmiyur",platform:"P2",capacity:60,stops:[{name:"Mylapore Temple",distance:0,scheduledTime:"09:45 AM",lat:13.033,lng:80.269},{name:"Mandaveli",distance:1.8,scheduledTime:"09:52 AM",lat:13.0232,lng:80.2625},{name:"Adyar Depot",distance:4.5,scheduledTime:"10:05 AM",lat:13.0064,lng:80.2577},{name:"Thiruvanmiyur",distance:7.2,scheduledTime:"10:20 AM",lat:12.983,lng:80.2516}]},M70:{id:"M70",number:"TN-01-N-3211",name:"Broadway Special",type:"City",source:"Guindy Estate",destination:"Broadway",platform:"P3",capacity:75,stops:[{name:"Guindy Estate",distance:0,scheduledTime:"09:10 AM",lat:13.0084,lng:80.2131},{name:"Teynampet",distance:5.2,scheduledTime:"09:25 AM",lat:13.034,lng:80.244},{name:"Gemini Flyover",distance:6.8,scheduledTime:"09:32 AM",lat:13.0425,lng:80.2514},{name:"LIC",distance:9.5,scheduledTime:"09:45 AM",lat:13.061,lng:80.264},{name:"Broadway",distance:13,scheduledTime:"10:00 AM",lat:13.088,lng:80.288}]},102:{id:"102",number:"TN-11-N-9022",name:"Kelambakkam Local",type:"Local",source:"Adyar Depot",destination:"Kelambakkam",platform:"P5",capacity:70,stops:[{name:"Adyar Depot",distance:0,scheduledTime:"09:20 AM",lat:13.0064,lng:80.2577},{name:"Taramani",distance:4.8,scheduledTime:"09:35 AM",lat:12.9782,lng:80.2418},{name:"Tidel Park",distance:6.1,scheduledTime:"09:40 AM",lat:12.9894,lng:80.2505},{name:"Sholinganallur",distance:14.5,scheduledTime:"10:05 AM",lat:12.901,lng:80.2269},{name:"Kelambakkam",distance:28,scheduledTime:"10:35 AM",lat:12.785,lng:80.223}]},570:{id:"570",number:"TN-11-N-7733",name:"OMR Express",type:"Express",source:"Koyambedu",destination:"Siruseri IT Park",platform:"P6",capacity:70,stops:[{name:"Koyambedu",distance:0,scheduledTime:"09:00 AM",lat:13.0694,lng:80.1914},{name:"Guindy",distance:8.5,scheduledTime:"09:20 AM",lat:13.0084,lng:80.2131},{name:"Taramani",distance:15.2,scheduledTime:"09:40 AM",lat:12.9782,lng:80.2418},{name:"Sholinganallur",distance:24.8,scheduledTime:"10:05 AM",lat:12.901,lng:80.2269},{name:"Siruseri IT Park",distance:34,scheduledTime:"10:30 AM",lat:12.834,lng:80.219}]}},H={getBusDetails(e){return Q[e]||null},getAllBuses(){return Object.values(Q)},getNearbyBuses(){return[Q["47A"],Q["19B"],Q["23C"],Q[102]]}},_={},$={};function Me(){H.getAllBuses().forEach(t=>{const a=Math.random()*80;_[t.id]={busId:t.id,progress:a,speed:40+Math.floor(Math.random()*15),lastUpdated:new Date,lat:0,lng:0},ke(t.id)})}function ke(e){const t=H.getBusDetails(e),a=_[e];if(!t||!a)return;const i=t.stops[t.stops.length-1].distance,s=a.progress/100*i;let n=0;for(let f=0;f<t.stops.length&&t.stops[f].distance<=s;f++)n=f;const r=Math.min(n+1,t.stops.length-1),o=t.stops[n],l=t.stops[r];let c=0;n===t.stops.length-1?c=0:c=l.distance-s;const b=Math.random()*6-3;a.speed=Math.max(15,Math.min(65,Math.round(a.speed+b)));let L=0;c>0&&a.speed>0&&(L=Math.ceil(c/a.speed*60)),a.currentStop=o.name,a.nextStop=l.name,a.distanceToNext=parseFloat(c.toFixed(1)),a.eta=n===t.stops.length-1?0:L,a.lastStopIndex=n,a.nextStopIndex=r;let E=o.lat,y=o.lng;if(n!==r){const f=l.distance-o.distance,C=f>0?(s-o.distance)/f:0;E=o.lat+(l.lat-o.lat)*C,y=o.lng+(l.lng-o.lng)*C}a.lat=parseFloat(E.toFixed(6)),a.lng=parseFloat(y.toFixed(6))}typeof window<"u"&&(Me(),setInterval(()=>{Object.keys(_).forEach(e=>{const t=_[e];t.progress+=.5+Math.random()*.5,t.progress>=100&&(t.progress=0),t.lastUpdated=new Date,ke(e),$[e]&&$[e].forEach(a=>a(t)),$.all&&$.all.forEach(a=>a(_))})},3e3));const O={getBusLocation(e){return _[e]||null},getAllBusStates(){return _},subscribe(e,t){$[e]||($[e]=[]),$[e].push(t),e==="all"?t(_):_[e]&&t(_[e])},unsubscribe(e,t){$[e]&&($[e]=$[e].filter(a=>a!==t))}},D={},N={};function Re(){H.getAllBuses().forEach(t=>{let a=20+Math.floor(Math.random()*(t.capacity-25));t.id==="47A"&&(a=42),t.id==="19B"&&(a=54),t.id==="23C"&&(a=28),D[t.id]={busId:t.id,passengers:a,capacity:t.capacity,percentage:Math.round(a/t.capacity*100)},Ce(t.id)})}function Ce(e){const t=D[e];t&&(t.percentage=Math.round(t.passengers/t.capacity*100),t.percentage<=40?(t.status="Low Crowd",t.class="status-chip-low",t.colorHex="#22c55e"):t.percentage<=75?(t.status="Medium Crowd",t.class="status-chip-medium",t.colorHex="#eab308"):(t.status="High Crowd",t.class="status-chip-high",t.colorHex="#ef4444"))}typeof window<"u"&&(Re(),setInterval(()=>{Object.keys(D).forEach(e=>{const t=D[e],a=Math.floor(Math.random()*7)-3;t.passengers=Math.max(5,Math.min(t.capacity,t.passengers+a)),Ce(e),N[e]&&N[e].forEach(i=>i(t)),N.all&&N.all.forEach(i=>i(D))})},1e4));const P={getOccupancy(e){return D[e]||null},getAllOccupancyStates(){return D},subscribe(e,t){N[e]||(N[e]=[]),N[e].push(t),e==="all"?t(D):D[e]&&t(D[e])},unsubscribe(e,t){N[e]&&(N[e]=N[e].filter(a=>a!==t))}},le={getBadgeDetails(e){let t="Low Crowd",a="status-chip-low",i="#22c55e";return e>40&&e<=75?(t="Medium Crowd",a="status-chip-medium",i="#eab308"):e>75&&(t="High Crowd",a="status-chip-high",i="#ef4444"),{label:t,chipClass:a,color:i}},render(e){const{label:t,chipClass:a}=this.getBadgeDetails(e);return`
      <span class="${a} px-3 py-1 rounded-full font-label-caps text-[10px] flex items-center gap-1.5 font-bold uppercase tracking-wide">
        <span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">groups</span>
        ${t}
      </span>
    `}},he={getBadgeColors(e){return e.type==="Express"?"bg-primary text-white":e.type==="Local"?"bg-outline/20 text-on-surface":e.type==="Fast"?"bg-primary/80 text-white":"bg-primary-container text-on-primary-container"},render(e,t,a){const i=this.getBadgeColors(e),s=t?t.eta:10,n=t?t.currentStop:e.stops[0].name,r=a?a.percentage:30;return`
      <div data-bus-id="${e.id}" class="bus-card-item glass-card p-3.5 md:p-4 rounded-xl flex items-center gap-3 md:gap-4 transition-all hover:bg-white/90 active:scale-[0.99] cursor-pointer group relative overflow-hidden">
        <!-- Route Badge -->
        <div class="w-12 h-12 md:w-14 md:h-14 rounded-lg ${i} flex flex-col items-center justify-center flex-shrink-0 font-sans">
          <span class="text-lg md:text-xl font-bold leading-tight">${e.id}</span>
          <span class="text-[8px] md:text-[9px] font-semibold uppercase tracking-tighter">${e.type}</span>
        </div>
        
        <!-- Details Content -->
        <div class="flex-1 min-w-0">
          <div class="flex justify-between items-start mb-1 gap-2">
            <h3 class="text-base md:text-title-lg truncate pr-1 font-semibold text-on-surface">${e.name}</h3>
            <div class="text-right flex flex-col items-end flex-shrink-0">
              <span class="font-bold text-primary text-base md:text-lg leading-none">${s} min</span>
              <span class="text-[9px] md:text-[10px] text-outline uppercase font-semibold mt-1">ETA</span>
            </div>
          </div>
          
          <div class="flex items-center gap-1.5 mb-2">
            <span class="material-symbols-outlined text-outline text-sm md:text-base">location_on</span>
            <p class="font-body-sm text-xs md:text-body-sm text-on-surface-variant truncate">Currently at ${n}</p>
          </div>
          
          <div class="flex items-center justify-between gap-2">
            <div class="flex flex-wrap items-center gap-1.5 md:gap-3">
              ${le.render(r)}
              <span class="font-body-sm text-xs md:text-body-sm text-on-surface-variant flex items-center gap-1">
                <span class="material-symbols-outlined text-sm md:text-base">meeting_room</span>
                ${e.platform||"P1"}
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
    `},bindClicks(e){const t=document.querySelector(e);t&&t.querySelectorAll("[data-bus-id]").forEach(a=>{a.addEventListener("click",i=>{const s=a.getAttribute("data-bus-id");s&&(a.style.backgroundColor="rgba(37, 99, 235, 0.05)",setTimeout(()=>{window.location.hash=`#/bus-details?id=${s}`},100))})})}},Te=new Set;H.getAllBuses().forEach(e=>{e.stops.forEach(t=>Te.add(t.name))});const je=Array.from(Te).sort(),me={getAllStops(){return je},searchRoutes(e,t){if(!e||!t)return[];const a=e.trim().toLowerCase(),i=t.trim().toLowerCase(),s=H.getAllBuses(),n=[];return s.forEach(r=>{let o=-1,l=-1;for(let c=0;c<r.stops.length;c++){const b=r.stops[c].name.toLowerCase();if(b.includes(a)&&o===-1&&(o=c),b.includes(i)&&o!==-1&&c>o){l=c;break}}if(o!==-1&&l!==-1){const c=r.stops[o],b=r.stops[l],L=b.distance-c.distance,E=l-o,y=Math.round(L*2.5+E);n.push({bus:r,boardStop:c.name,alightStop:b.name,sourceIndex:o,destIndex:l,distance:parseFloat(L.toFixed(1)),duration:y,stopsCount:E})}}),n}},I={SAVED_ROUTES:"crowdsense_saved_routes",RECENT_SEARCHES:"crowdsense_recent_searches",PROFILE:"crowdsense_user_profile"},ye=[{id:"route-1",label:"Work Route",desc:"Route 102 • 15 mins",busId:"102"},{id:"route-2",label:"Tidel Office",desc:"Route 47A • 22 mins",busId:"47A"}],we=[{source:"Anna Salai",destination:"Tidel Park"},{source:"Saidapet",destination:"Guindy Estate"}],Se={name:"Marcus Thorne",transitId:"TN-8829-X",role:"Regular Commuter",tripsCount:42,timeSaved:"12.5h",co2Offset:"14kg",avoidanceScore:"88%"},K={getSavedRoutes(){const e=localStorage.getItem(I.SAVED_ROUTES);return e?JSON.parse(e):(localStorage.setItem(I.SAVED_ROUTES,JSON.stringify(ye)),ye)},saveRoute(e){const t=this.getSavedRoutes();t.some(a=>a.busId===e.busId)||(t.push(e),localStorage.setItem(I.SAVED_ROUTES,JSON.stringify(t)))},removeRoute(e){let t=this.getSavedRoutes();t=t.filter(a=>a.busId!==e),localStorage.setItem(I.SAVED_ROUTES,JSON.stringify(t))},getRecentSearches(){const e=localStorage.getItem(I.RECENT_SEARCHES);return e?JSON.parse(e):(localStorage.setItem(I.RECENT_SEARCHES,JSON.stringify(we)),we)},addRecentSearch(e){const a=this.getRecentSearches().filter(s=>!(s.source.toLowerCase()===e.source.toLowerCase()&&s.destination.toLowerCase()===e.destination.toLowerCase()));a.unshift(e);const i=a.slice(0,5);localStorage.setItem(I.RECENT_SEARCHES,JSON.stringify(i))},clearRecentSearches(){localStorage.setItem(I.RECENT_SEARCHES,JSON.stringify([]))},getProfile(){const e=localStorage.getItem(I.PROFILE);return e?JSON.parse(e):(localStorage.setItem(I.PROFILE,JSON.stringify(Se)),Se)},updateProfile(e){const a={...this.getProfile(),...e};return localStorage.setItem(I.PROFILE,JSON.stringify(a)),a}},Le={renderHomeSearch(){return`
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
                ${me.getAllStops().map(e=>`<option value="${e}">${e}</option>`).join("")}
              </select>
            </div>

            <!-- Destination Input -->
            <div class="relative">
              <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">location_on</span>
              <select id="search-destination" class="w-full h-14 pl-12 pr-4 bg-surface-container-low border border-outline-variant/30 rounded-xl font-body-md text-body-md focus:ring-2 focus:ring-primary/20">
                <option value="" disabled selected>Select destination stop...</option>
                ${me.getAllStops().map(e=>`<option value="${e}">${e}</option>`).join("")}
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
    `},mountHomeSearch(){const e=document.getElementById("home-search-trigger"),t=document.getElementById("full-search-overlay"),a=document.getElementById("close-search"),i=document.getElementById("btn-do-search"),s=document.getElementById("search-source"),n=document.getElementById("search-destination"),r=document.getElementById("search-results-container"),o=document.getElementById("search-results-list"),l=document.getElementById("results-count"),c=document.getElementById("search-history-container"),b=document.getElementById("recent-searches-list");if(!e||!t||!a||!i)return;e.addEventListener("click",()=>{t.classList.remove("hidden"),document.body.classList.add("overflow-hidden"),L()}),a.addEventListener("click",()=>{t.classList.add("hidden"),document.body.classList.remove("overflow-hidden"),r.classList.add("hidden"),n.value=""});function L(){const y=K.getRecentSearches();if(y.length===0){c.classList.add("hidden");return}c.classList.remove("hidden"),b.innerHTML=y.map(f=>`
        <div class="recent-search-item flex items-center justify-between p-3 bg-surface-container-low hover:bg-surface-container rounded-xl cursor-pointer transition-colors gap-2" data-src="${f.source}" data-dest="${f.destination}">
          <div class="flex items-center gap-3 flex-1 min-w-0">
            <span class="material-symbols-outlined text-outline flex-shrink-0">history</span>
            <div class="min-w-0 flex-1">
              <p class="font-body-md text-sm md:text-body-md font-semibold text-on-surface truncate">${f.source} → ${f.destination}</p>
            </div>
          </div>
          <span class="material-symbols-outlined text-outline flex-shrink-0">arrow_forward</span>
        </div>
      `).join(""),b.querySelectorAll(".recent-search-item").forEach(f=>{f.addEventListener("click",()=>{const C=f.getAttribute("data-src"),g=f.getAttribute("data-dest");Array.from(s.options).some(k=>k.value===C)?s.value=C:s.value="Anna Salai, Chennai City Centre",n.value=g,E()})})}i.addEventListener("click",E);function E(){let y=s.value;const f=n.value;if(!f){alert("Please select a destination stop");return}y.includes("Anna Salai")&&(y="Adyar Depot");const C=me.searchRoutes(y,f);if(K.addRecentSearch({source:y,destination:f}),L(),r.classList.remove("hidden"),l.innerText=`${C.length} RESULTS`,C.length===0){o.innerHTML=`
          <div class="p-6 text-center text-on-surface-variant opacity-80 bg-surface-container-low rounded-xl">
            <span class="material-symbols-outlined text-4xl mb-2">info</span>
            <p class="font-body-md font-semibold">No direct buses found between these stops.</p>
            <p class="text-body-sm mt-1">Try another destination stop or check active service updates.</p>
          </div>
        `;return}o.innerHTML=C.map(g=>{const k=O.getBusLocation(g.bus.id),R=P.getOccupancy(g.bus.id),W=k?k.eta:10,F=k?k.currentStop:g.bus.stops[0].name,h=le.render(R?R.percentage:30);return`
          <div data-result-bus-id="${g.bus.id}" class="search-result-card bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-4 md:p-5 shadow-[0_4px_12px_-4px_rgba(37,99,235,0.08)] hover:shadow-md transition-shadow active:scale-[0.99] cursor-pointer">
            <div class="flex justify-between items-start mb-3 gap-2">
              <div class="flex items-center gap-2 flex-1 min-w-0">
                <div class="bg-primary text-on-primary px-2.5 py-0.5 rounded-lg font-bold text-base md:text-title-lg flex-shrink-0">${g.bus.id}</div>
                <div class="min-w-0 flex-1">
                  <h4 class="font-bold text-primary text-body-sm md:text-body-md truncate">${g.bus.name}</h4>
                  <p class="text-[11px] md:text-xs text-on-surface-variant truncate">Via ${g.stopsCount} stops • ${g.distance} km</p>
                </div>
              </div>
              <div class="text-right flex-shrink-0">
                <p class="text-primary font-bold text-base md:text-headline-md leading-none whitespace-nowrap">${W} min</p>
                <p class="text-[9px] md:text-label-caps font-label-caps text-outline uppercase mt-1">ETA</p>
              </div>
            </div>
            
            <div class="flex items-center gap-1.5 mb-3 text-on-surface-variant min-w-0">
              <span class="material-symbols-outlined text-primary text-[16px] pulse-live flex-shrink-0" style="font-variation-settings: 'FILL' 1;">sensors</span>
              <p class="text-xs truncate">Current Stop: <span class="text-on-background font-semibold">${F}</span></p>
            </div>

            <div class="flex items-center justify-between pt-3 border-t border-outline-variant/20 gap-2">
              <div class="flex items-center gap-1.5 min-w-0">
                <span class="text-[9px] md:text-label-caps font-label-caps text-on-surface-variant flex-shrink-0">CROWD</span>
                ${h}
              </div>
              <div class="text-right text-[11px] md:text-xs text-on-surface-variant font-medium flex-shrink-0">
                Duration: ${g.duration} mins
              </div>
            </div>
          </div>
        `}).join(""),o.querySelectorAll("[data-result-bus-id]").forEach(g=>{g.addEventListener("click",()=>{const k=g.getAttribute("data-result-bus-id");t.classList.add("hidden"),document.body.classList.remove("overflow-hidden"),window.location.hash=`#/bus-details?id=${k}`})})}}};let ae=null,se=null;const Be={render(){return`
      <!-- TopAppBar Header -->
      <header class="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-md border-b border-outline-variant/20 shadow-sm shadow-primary/10 flex justify-between items-center px-margin-mobile h-16 w-full">
        <div class="flex items-center gap-3">
          <img class="w-8 h-8 object-contain mix-blend-multiply" src="/src/assets/logo.png" alt="CrowdSense TN Logo" />
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
          ${Le.renderHomeSearch()}
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
    `},mount(){Le.mountHomeSearch(),document.querySelectorAll(".quick-action-btn").forEach(s=>{s.addEventListener("click",()=>{const n=s.getAttribute("data-dest"),r=document.getElementById("home-search-trigger");if(r&&n){r.click();const o=document.getElementById("search-destination");if(o){o.value=n;const l=document.getElementById("btn-do-search");l&&l.click()}}})}),document.querySelectorAll(".popular-dest-card").forEach(s=>{s.addEventListener("click",()=>{const n=s.getAttribute("data-dest"),r=document.getElementById("home-search-trigger");if(r&&n){r.click();const o=document.getElementById("search-destination");if(o){o.value=n;const l=document.getElementById("btn-do-search");l&&l.click()}}})});const e=document.getElementById("header-noti-btn");e&&e.addEventListener("click",()=>{window.location.hash="#/alerts"});const t=document.getElementById("available-buses-container"),a=H.getNearbyBuses();function i(){t&&(t.innerHTML=a.map(s=>{const n=O.getBusLocation(s.id),r=P.getOccupancy(s.id);return he.render(s,n,r)}).join(""),he.bindClicks("#available-buses-container"))}i(),ae=()=>i(),se=()=>i(),O.subscribe("all",ae),P.subscribe("all",se)},unmount(){ae&&(O.unsubscribe("all",ae),ae=null),se&&(P.unsubscribe("all",se),se=null)}};let ne=null,ie=null;const M={mapInstance:null,render(e){const t=e.tab||"map";return`
      <!-- TopAppBar Header -->
      <header class="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-md border-b border-outline-variant/30 shadow-md shadow-primary/10 flex justify-between items-center px-margin-mobile h-16 w-full">
        <div class="flex items-center gap-3">
          <img class="w-8 h-8 object-contain mix-blend-multiply" src="/src/assets/logo.png" alt="CrowdSense TN Logo" />
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
            <button class="flex-1 py-2 rounded-full font-label-caps text-label-caps font-bold transition-all duration-300 ${t==="map"?"bg-primary-container text-on-primary-container shadow-md":"text-on-surface-variant hover:bg-surface-variant/50"}" id="toggle-tab-map">
              Live Map
            </button>
            <button class="flex-1 py-2 rounded-full font-label-caps text-label-caps font-bold transition-all duration-300 ${t==="routes"?"bg-primary-container text-on-primary-container shadow-md":"text-on-surface-variant hover:bg-surface-variant/50"}" id="toggle-tab-routes">
              Routes
            </button>
          </div>
        </div>

        <!-- TAB 1: LIVE MAP CONTAINER -->
        <div id="live-map-view" class="absolute inset-0 z-0 pt-16 pb-20 ${t==="map"?"":"hidden"}">
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
        <div id="routes-list-view" class="w-full h-full overflow-y-auto px-4 md:px-margin-desktop pt-28 pb-28 ${t==="routes"?"":"hidden"}">
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
    `},mount(e){const t=document.getElementById("toggle-tab-map"),a=document.getElementById("toggle-tab-routes"),i=document.getElementById("live-map-view"),s=document.getElementById("routes-list-view"),n=document.getElementById("view-all-routes-btn");let r=e.tab||"map",o=null;function l(u){r=u,u==="map"?(i.classList.remove("hidden"),s.classList.add("hidden"),t.className="flex-1 py-2 rounded-full font-label-caps text-label-caps font-bold transition-all duration-300 bg-primary-container text-on-primary-container shadow-md",a.className="flex-1 py-2 rounded-full font-label-caps text-label-caps font-bold transition-all duration-300 text-on-surface-variant hover:bg-surface-variant/50",window.history.replaceState(null,"","#/map?tab=map"),M.mapInstance&&setTimeout(()=>{M.mapInstance.invalidateSize()},100),o&&o()):(i.classList.add("hidden"),s.classList.remove("hidden"),t.className="flex-1 py-2 rounded-full font-label-caps text-label-caps font-bold transition-all duration-300 text-on-surface-variant hover:bg-surface-variant/50",a.className="flex-1 py-2 rounded-full font-label-caps text-label-caps font-bold transition-all duration-300 bg-primary-container text-on-primary-container shadow-md",window.history.replaceState(null,"","#/map?tab=routes"),o&&o())}t.addEventListener("click",()=>l("map")),a.addEventListener("click",()=>l("routes")),n&&n.addEventListener("click",()=>l("routes"));const c=document.getElementById("bottom-sheet"),b=document.getElementById("drag-handle");let L=0,E=0,y=!1;if(b&&c){const u=w=>{L=w.type==="touchstart"?w.touches[0].clientY:w.clientY,y=!0,c.style.transition="none",c.style.willChange="transform"},v=w=>{if(!y)return;E=w.type==="touchmove"?w.touches[0].clientY:w.clientY;const V=E-L;V>0&&(c.style.transform=`translateY(${V}px)`)},T=()=>{if(!y)return;y=!1,c.style.transition="",c.style.willChange="",E-L>120?c.style.transform="translateY(240px)":c.style.transform="translateY(0)"};b.addEventListener("touchstart",u),window.addEventListener("touchmove",v,{passive:!1}),window.addEventListener("touchend",T),b.addEventListener("mousedown",u),window.addEventListener("mousemove",v),window.addEventListener("mouseup",T)}const f=document.getElementById("nearby-buses-list"),C=document.getElementById("nearby-status-text"),g=document.getElementById("full-routes-list"),k=document.getElementById("routes-counter-badge"),R=document.getElementById("routes-search-input"),W=H.getNearbyBuses();f&&(f.innerHTML=W.map(u=>{const v=u.id==="19B"?"bg-tertiary-fixed text-on-tertiary-fixed-variant":"bg-primary-fixed text-primary";return`
          <div data-nearby-bus-id="${u.id}" class="p-3.5 bg-surface-container-lowest hover:bg-surface-container-low transition-colors rounded-2xl border border-outline-variant/20 flex items-center justify-between gap-2 cursor-pointer shadow-sm group">
            <div class="flex items-center gap-3 flex-1 min-w-0">
              <div class="w-12 h-12 rounded-xl ${v} flex items-center justify-center font-bold flex-shrink-0">
                <span>${u.id}</span>
              </div>
              <div class="min-w-0 flex-1">
                <h3 class="font-title-lg text-[15px] md:text-[16px] leading-snug text-on-surface font-semibold truncate">${u.name}</h3>
                <p class="text-xs text-on-surface-variant truncate">To ${u.destination}</p>
              </div>
            </div>
            <div class="text-right flex flex-col items-end flex-shrink-0">
              <div class="occupancy-badge px-2.5 py-0.5 rounded-full font-label-caps text-[9px] font-bold uppercase mb-1 flex-shrink-0">
                -
              </div>
              <p class="eta-value font-bold text-base md:text-lg text-primary whitespace-nowrap">- min</p>
            </div>
          </div>
        `}).join(""),f.querySelectorAll("[data-nearby-bus-id]").forEach(u=>{u.addEventListener("click",()=>{const v=u.getAttribute("data-nearby-bus-id");v&&(window.location.hash=`#/bus-details?id=${v}`)})}),C.innerText=`${W.length} active vehicles in your zone`);const F=H.getAllBuses();if(g&&(g.innerHTML=F.map(u=>`
          <div data-route-bus-id="${u.id}" class="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-4 md:p-5 shadow-[0_4px_12px_-4px_rgba(37,99,235,0.08)] hover:shadow-md transition-shadow active:scale-[0.99] cursor-pointer">
            <div class="flex justify-between items-start mb-3 gap-2">
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 flex-wrap mb-1.5">
                  <div class="bg-primary-container text-on-primary-container px-2.5 py-0.5 rounded-lg font-bold text-base shadow-sm font-sans flex-shrink-0">${u.id}</div>
                  <span class="font-bold text-primary text-base truncate">${u.name}</span>
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
        `).join(""),g.querySelectorAll("[data-route-bus-id]").forEach(u=>{u.addEventListener("click",()=>{const v=u.getAttribute("data-route-bus-id");v&&(window.location.hash=`#/bus-details?id=${v}`)})}),k.innerText=`${F.length} RESULTS NEARBY`),document.getElementById("map-canvas")&&typeof window.L<"u"){let fe=function(m){const S=m==="19B"?"bg-tertiary":"bg-primary",p=m==="19B"?"text-tertiary":"text-primary";return u.divIcon({className:"custom-bus-marker-icon",html:`
            <div class="relative flex flex-col items-center select-none" style="transform: translate(-20px, -20px); width: 40px; height: 40px;">
              <div class="${S} p-2 rounded-full shadow-lg border-2 border-white flex items-center justify-center animate-pulse">
                <span class="material-symbols-outlined text-white text-[14px]" style="font-variation-settings: 'FILL' 1;">directions_bus</span>
              </div>
              <div class="mt-1 px-1.5 py-0.5 glass-panel rounded-full shadow-md border border-white/40 bg-white/95">
                <span class="font-label-caps text-[8px] font-bold ${p}">${m}</span>
              </div>
            </div>
          `,iconSize:[40,40],iconAnchor:[20,20]})},xe=function(){if(!g)return;const m=O.getAllBusStates(),S=P.getAllOccupancyStates();F.forEach(p=>{const d=g.querySelector(`[data-route-bus-id="${p.id}"]`);if(!d)return;const x=m[p.id]||{eta:15,currentStop:p.stops[0].name},B=S[p.id]||{percentage:25},A=d.querySelector(".current-stop-name");A&&A.innerText!==x.currentStop&&(A.innerText=x.currentStop);const j=d.querySelector(".eta-value");j&&j.innerText!==`${x.eta} min`&&(j.innerText=`${x.eta} min`);const G=d.querySelector(".occupancy-badge-container");if(G){let z=G.querySelector(".status-badge-el");const ve=le.render(B.percentage);if(z){const te=document.createElement("div");te.innerHTML=ve;const X=te.firstElementChild;X.classList.add("status-badge-el"),z.outerHTML!==X.outerHTML&&z.replaceWith(X)}else{const te=document.createElement("div");te.innerHTML=ve;const X=te.firstElementChild;X.classList.add("status-badge-el"),G.appendChild(X)}}})},ce=function(m=""){if(!g)return;const S=m.toLowerCase().trim();let p=0;F.forEach(x=>{const B=g.querySelector(`[data-route-bus-id="${x.id}"]`);if(!B)return;x.id.toLowerCase().includes(S)||x.name.toLowerCase().includes(S)||x.destination.toLowerCase().includes(S)?(B.classList.remove("hidden"),p++):B.classList.add("hidden")}),k&&(k.innerText=`${p} RESULTS NEARBY`);let d=document.getElementById("no-routes-found-message");p===0?d?(d.querySelector("p").innerText=`No routes found matching "${m}"`,d.classList.remove("hidden")):(d=document.createElement("div"),d.id="no-routes-found-message",d.className="p-8 text-center text-on-surface-variant opacity-80 w-full",d.innerHTML=`
              <span class="material-symbols-outlined text-4xl mb-2">search_off</span>
              <p class="font-body-md font-semibold">No routes found matching "${m}"</p>
            `,g.appendChild(d)):d&&d.classList.add("hidden")},ee=function(){const m=O.getAllBusStates(),S=P.getAllOccupancyStates();Object.keys(m).forEach(p=>{const d=m[p];if(d)if(w[p]){const x=V[p];x&&(x.startLat=x.currentLat,x.startLng=x.currentLng,x.targetLat=d.lat,x.targetLng=d.lng,x.startTime=performance.now())}else{const x=u.marker([d.lat,d.lng],{icon:fe(p)}).addTo(v);x.on("click",()=>{window.location.hash=`#/bus-details?id=${p}`}),w[p]=x,V[p]={startLat:d.lat,startLng:d.lng,currentLat:d.lat,currentLng:d.lng,targetLat:d.lat,targetLng:d.lng,startTime:performance.now(),duration:3e3}}}),r==="map"&&f&&W.forEach(p=>{const d=m[p.id]||{eta:10},x=S[p.id]||{percentage:30},B=le.getBadgeDetails(x.percentage),A=f.querySelector(`[data-nearby-bus-id="${p.id}"]`);if(A){const j=A.querySelector(".eta-value");if(j){const z=`${d.eta} min`;j.innerText!==z&&(j.innerText=z)}const G=A.querySelector(".occupancy-badge");if(G){const z=B.label.split(" ")[0];G.innerText!==z&&(G.innerText=z,G.className=`occupancy-badge px-2.5 py-0.5 rounded-full font-label-caps text-[9px] font-bold uppercase ${B.chipClass} mb-1 flex-shrink-0`)}}}),r==="routes"&&(xe(),ce(R?R.value:""))},ue=function(m){Object.keys(w).forEach(S=>{const p=w[S],d=V[S];if(!p||!d)return;const x=m-d.startTime,B=Math.min(x/d.duration,1);if(d.startLat!==void 0){const A=d.startLat+(d.targetLat-d.startLat)*B,j=d.startLng+(d.targetLng-d.startLng)*B;d.currentLat=A,d.currentLng=j,p.setLatLng([A,j])}else d.currentLat=d.targetLat,d.currentLng=d.targetLng,p.setLatLng([d.targetLat,d.targetLng])}),pe=requestAnimationFrame(ue)};var J=fe,q=xe,Z=ce,U=ee,Y=ue;const u=window.L,v=u.map("map-canvas",{zoomControl:!1,attributionControl:!1}).setView([12.985,80.245],11);u.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",{maxZoom:19}).addTo(v),M.mapInstance=v;const T={},w={},V={};F.forEach(m=>{const S=m.stops.map(x=>[x.lat,x.lng]);let p="#004ac6";m.id==="19B"?p="#943700":m.id==="23C"?p="#22c55e":m.id==="M70"?p="#ba1a1a":m.id==="102"?p="#008a4f":m.id==="570"&&(p="#5c647a");const d=u.polyline(S,{color:p,weight:4,opacity:.75,lineJoin:"round"}).addTo(v);T[m.id]=d}),o=ee,R&&R.addEventListener("input",m=>{ce(m.target.value)});const ge=document.getElementById("btn-map-myloc"),be=document.getElementById("btn-map-fit");ge&&ge.addEventListener("click",()=>{v.setView([13.0064,80.2577],13)}),be&&be.addEventListener("click",()=>{const m=[];if(Object.keys(w).forEach(S=>{const p=V[S];p?m.push([p.currentLat,p.currentLng]):m.push(w[S].getLatLng())}),m.length>0){const S=u.latLngBounds(m);v.fitBounds(S,{padding:[50,50]})}});let pe=null;pe=requestAnimationFrame(ue),M.animationFrameId=pe,ee(),setTimeout(()=>{v.invalidateSize()},200),ne=()=>ee(),ie=()=>ee(),O.subscribe("all",ne),P.subscribe("all",ie)}},unmount(){ne&&(O.unsubscribe("all",ne),ne=null),ie&&(P.unsubscribe("all",ie),ie=null),M.animationFrameId&&(cancelAnimationFrame(M.animationFrameId),M.animationFrameId=null),M.mapInstance&&(M.mapInstance.remove(),M.mapInstance=null)}};let re=null,oe=null;const $e={render(e){const t=e.id||"47A",a=H.getBusDetails(t);return a?`
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
                  <span class="bg-primary text-on-primary px-2.5 py-1 rounded-lg font-bold text-base md:text-title-lg shadow-sm">${a.id}</span>
                  <span class="text-on-surface-variant font-label-caps text-label-caps tracking-widest px-2 py-0.5 bg-surface-container rounded-md flex items-center gap-1 font-bold">
                    <span class="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                    LIVE
                  </span>
                  <span class="text-on-surface font-semibold text-base md:text-title-lg ml-1">${a.name}</span>
                </div>
                <h2 class="text-base md:text-title-lg text-on-surface font-semibold">${a.source} <span class="text-primary mx-1">→</span> ${a.destination}</h2>
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
                <span class="text-on-surface-variant text-body-sm">/ ${a.capacity}</span>
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
    `:`
        <div class="p-8 text-center text-on-surface-variant min-h-screen flex flex-col justify-center items-center">
          <span class="material-symbols-outlined text-5xl text-error mb-4">error</span>
          <h2 class="text-xl font-bold">Bus Route Not Found</h2>
          <p class="text-sm mt-2">The requested bus ID ${t} is invalid or has expired.</p>
          <a href="#/home" class="mt-6 px-4 py-2 bg-primary text-white rounded-lg">Return Home</a>
        </div>
      `},mount(e){const t=e.id||"47A",a=H.getBusDetails(t);if(!a)return;const i=document.getElementById("back-btn");i&&i.addEventListener("click",()=>{window.history.length>1?window.history.back():window.location.hash="#/map"});const s=document.getElementById("btn-save-route"),n=document.getElementById("save-icon");let r=K.getSavedRoutes().some(h=>h.busId===t);function o(){r?(n.style.fontVariationSettings="'FILL' 1",n.classList.add("text-primary"),n.innerText="star"):(n.style.fontVariationSettings="'FILL' 0",n.classList.remove("text-primary"),n.innerText="star")}o(),s&&s.addEventListener("click",()=>{r?(K.removeRoute(t),r=!1):(K.saveRoute({id:`route-${Date.now()}`,label:`${a.source.split(" ")[0]} Route`,desc:`${a.type} ${a.id} • ${a.destination}`,busId:a.id}),r=!0),o()});const l=document.getElementById("btn-notify-seats");let c=!1;l&&l.addEventListener("click",()=>{c=!c,c?(l.innerText="Subscribed",l.classList.remove("bg-primary","text-on-primary"),l.classList.add("bg-surface-container-highest","text-on-surface-variant"),alert(`We will notify you when a seat becomes vacant on Route ${a.id}!`)):(l.innerText="Notify Me",l.classList.add("bg-primary","text-on-primary"),l.classList.remove("bg-surface-container-highest","text-on-surface-variant"))});const b=document.getElementById("live-speed"),L=document.getElementById("last-stop-val"),E=document.getElementById("radial-progress-ring"),y=document.getElementById("occupancy-pct"),f=document.getElementById("passengers-count"),C=document.getElementById("occupancy-badge-container"),g=document.getElementById("approaching-banner"),k=document.getElementById("approaching-text"),R=document.getElementById("timeline-container"),W=document.getElementById("seats-vacant-text");re=h=>{b&&(b.textContent=h.speed),L&&(L.textContent=h.currentStop),h.lastStopIndex===a.stops.length-1?(g.className="bg-green-100 text-green-800 px-4 py-2 rounded-full shadow-lg flex items-center gap-2",k.textContent=`Bus has arrived at ${a.destination}`):(g.className="bg-primary-container text-on-primary-container px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-pulse",k.textContent=`Bus is approaching ${h.nextStop}`),F(h)},oe=h=>{if(f&&(f.textContent=h.passengers),y&&(y.textContent=`${h.percentage}%`),W){const q=a.capacity-h.passengers;W.textContent=`${q>0?q:0} seats vacant`}if(E){const q=226.2-h.percentage/100*226.2;E.style.strokeDashoffset=q}const J=document.getElementById("radial-progress-ring-mobile");if(J){const q=175.9-h.percentage/100*175.9;J.style.strokeDashoffset=q}C&&(C.innerHTML=le.render(h.percentage))};function F(h){if(!R)return;const J=h.lastStopIndex,q=h.nextStopIndex;R.innerHTML=a.stops.map((Z,U)=>{let Y="relative pl-10 pb-8 railway-line",u="",v="flex justify-between items-start",T="",w="";U===0?T="Source":U===a.stops.length-1&&(T="Destination",Y="relative pl-10 pb-8"),U<=J?(Y+=" railway-line-solid",u=`
            <div class="absolute left-0 top-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center z-10 border-4 border-background">
              <span class="material-symbols-outlined text-white text-[14px]">check</span>
            </div>
          `,v+=" opacity-70",w='<span class="text-body-sm text-on-surface-variant font-semibold">Passed</span>',U>0&&U<a.stops.length-1&&(T="Departed")):U===q?(u=`
            <div class="absolute left-0 top-1 w-6 h-6 bg-surface-container-highest border-2 border-primary rounded-full flex items-center justify-center z-10">
              <div class="w-2.5 h-2.5 bg-primary rounded-full animate-ping"></div>
            </div>
          `,Y+=" bg-primary/5 p-2.5 md:p-3 rounded-xl border border-primary/20 -mt-1 ml-6 md:ml-9 pl-3 md:pl-4 pb-3 md:pb-4",Y=Y.replace("pl-10",""),T=T?`${T} • Arriving`:`Arriving in ${h.eta} mins`,v+=" text-primary font-medium",w='<span class="text-body-sm text-primary font-bold">Arriving</span>'):(u=`
            <div class="absolute left-0 top-1 w-6 h-6 bg-surface-container-high border-2 border-outline-variant rounded-full z-10"></div>
          `,v+=" opacity-50",T=T||`Distance: ${Math.round((Z.distance-h.progress/100*a.stops[a.stops.length-1].distance)*10)/10} km`,w=`<span class="text-body-sm text-on-surface">${Z.scheduledTime}</span>`);const V=U<=J?"line-through":"";return`
          <!-- Stop Item -->
          <div class="${Y}">
            ${u}
            <div class="${v}">
              <div>
                <h3 class="text-base md:text-title-lg text-on-surface font-semibold">${Z.name}</h3>
                <p class="text-body-sm text-on-surface-variant">${T||"Upcoming Stop"}</p>
              </div>
              <div class="text-right">
                <span class="block font-label-caps text-label-caps text-on-secondary-container ${V}">${Z.scheduledTime}</span>
                ${w}
              </div>
            </div>
          </div>
          
          <!-- Vehicle Icon floating on timeline between last passed and next arriving stop -->
          ${U===J&&J!==a.stops.length-1?`
            <div class="relative pl-10 h-0 z-20">
              <div class="absolute -left-3 -top-3 flex items-center justify-center bg-white rounded-full p-1 shadow-md border-2 border-primary">
                <span class="material-symbols-outlined text-primary text-[20px] pulse-live" style="font-variation-settings: 'FILL' 1;">directions_bus</span>
              </div>
            </div>
          `:""}
        `}).join("")}O.subscribe(t,re),P.subscribe(t,oe)},unmount(){const e=window.location.hash.split("?")[1]||"",t=e.includes("id=")?e.split("id=")[1].split("&")[0]:"47A";re&&(O.unsubscribe(t,re),re=null),oe&&(P.unsubscribe(t,oe),oe=null)}},Ee=[{id:"alert-1",type:"critical",categoryLabel:"Heavy Crowd Alerts",timeAgo:"2 mins ago",title:"Central Station Congestion",description:"Platform 2 experiencing extreme density. Boarding delays expected for next 45 minutes for all passing services.",affectedRoutes:["Route 570","Route 102"],icon:"groups",colorClass:"border-error",bgClass:"bg-error-container",textClass:"text-error"},{id:"alert-2",type:"diversions",categoryLabel:"Route Diversions",timeAgo:"15 mins ago",title:"Anna Salai Road Maintenance",description:"Routes diverted via Greams Road due to emergency metro sewer works. Temporary stops established at Apollo Junction.",affectedRoutes:["Route 21G","Route 19B"],icon:"alt_route",colorClass:"border-tertiary",bgClass:"bg-tertiary-fixed",textClass:"text-tertiary"},{id:"alert-3",type:"updates",categoryLabel:"Service Resumed",timeAgo:"1 hour ago",title:"OMR Express Lane Clear",description:"Traffic bottleneck at Taramani resolved. Services returning to standard frequency and schedules.",affectedRoutes:["Route 570","Route 102"],icon:"check_circle",colorClass:"border-[#008a4f]",bgClass:"bg-green-100",textClass:"text-[#008a4f]"},{id:"alert-4",type:"critical",categoryLabel:"Heavy Crowd Alerts",timeAgo:"3 hours ago",title:"Marina Beach Event Density",description:"Public gathering causing overcrowding at Light House bus terminus. High demand expected until 9 PM tonight.",affectedRoutes:["Route 102","Route 23C"],icon:"groups",colorClass:"border-error",bgClass:"bg-error-container",textClass:"text-error"},{id:"alert-5",type:"updates",categoryLabel:"General Updates",timeAgo:"5 hours ago",title:"Mount Road Delayed Construction",description:"Gemini Flyover construction continues. Delays of 15-20 mins anticipated during peak evening hours.",affectedRoutes:["Route M70","Route 47A"],icon:"warning",colorClass:"border-primary",bgClass:"bg-primary-fixed",textClass:"text-primary"}],Ne={render(){return`
      <!-- TopAppBar Header -->
      <header class="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-md border-b border-outline-variant/20 shadow-sm shadow-primary/10 flex justify-between items-center px-margin-mobile h-16 w-full">
        <div class="flex items-center gap-3">
          <img class="w-8 h-8 object-contain mix-blend-multiply" src="/src/assets/logo.png" alt="CrowdSense TN Logo" />
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
    `},mount(){const e=document.getElementById("alerts-feed-list"),t=document.getElementById("alerts-filter-bar");function a(i="all"){if(!e)return;const s=i==="all"?Ee:Ee.filter(n=>n.type===i);if(s.length===0){e.innerHTML=`
          <div class="p-8 text-center text-on-surface-variant opacity-80 bg-surface-container-low rounded-xl">
            <span class="material-symbols-outlined text-4xl mb-2">done_all</span>
            <p class="font-body-md font-semibold">All clear!</p>
            <p class="text-body-sm mt-1">No alerts active in this category.</p>
          </div>
        `;return}e.innerHTML=s.map(n=>`
        <div class="glass-card p-4 md:p-5 rounded-xl border-l-4 ${n.colorClass} shadow-sm hover:shadow-md transition-all duration-300 group">
          <div class="flex items-start justify-between gap-3">
            <div class="flex gap-3 md:gap-4 flex-1 min-w-0">
              <!-- Icon Frame -->
              <div class="w-11 h-11 md:w-12 md:h-12 rounded-lg ${n.bgClass} flex items-center justify-center ${n.textClass} flex-shrink-0">
                <span class="material-symbols-outlined text-xl md:text-2xl" style="font-variation-settings: 'FILL' 1;">${n.icon}</span>
              </div>
              
              <!-- Content -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1">
                  <span class="font-label-caps text-[10px] md:text-label-caps ${n.textClass} font-bold">${n.categoryLabel}</span>
                  <span class="text-on-surface-variant/40 text-[10px]">•</span>
                  <span class="font-body-sm text-xs md:text-body-sm text-on-surface-variant">${n.timeAgo}</span>
                </div>
                <h3 class="text-base md:text-title-lg text-on-surface mb-2 font-semibold truncate-2-lines">${n.title}</h3>
                <p class="font-body-sm text-xs md:text-body-sm text-on-secondary-container mb-4 leading-normal">${n.description}</p>
                <div class="flex flex-wrap gap-2">
                  ${n.affectedRoutes.map(r=>`
                    <span class="px-2.5 py-0.5 rounded-full bg-surface-container-highest text-primary font-label-caps text-[9px] md:text-[10px] font-semibold">${r}</span>
                  `).join("")}
                </div>
              </div>
            </div>
            
            <button class="share-alert-btn material-symbols-outlined text-on-surface-variant opacity-50 group-hover:opacity-100 transition-opacity p-2 hover:bg-surface-container rounded-full flex-shrink-0">share</button>
          </div>
        </div>
      `).join(""),e.querySelectorAll(".share-alert-btn").forEach((n,r)=>{n.addEventListener("click",o=>{o.stopPropagation();const l=s[r];navigator.share?navigator.share({title:l.title,text:l.description,url:window.location.href}).catch(()=>{}):alert(`Sharing Alert: ${l.title}

${l.description}`)})})}if(t){const i=t.querySelectorAll("button");i.forEach(s=>{s.addEventListener("click",()=>{i.forEach(r=>{r.className="px-4 py-2 rounded-full bg-surface-container text-on-surface-variant font-label-caps text-label-caps hover:bg-surface-container-high transition-colors"}),s.className="px-4 py-2 rounded-full bg-primary text-on-primary font-label-caps text-label-caps shadow-lg shadow-primary/20 font-semibold";const n=s.getAttribute("data-filter");a(n)})})}a()}},_e={render(){const e=K.getProfile();return`
      <!-- TopAppBar Header -->
      <header class="fixed top-0 w-full z-50 bg-surface/70 dark:bg-surface/70 backdrop-blur-md border-b border-outline-variant/30 shadow-md shadow-primary/10 flex justify-between items-center px-margin-mobile h-16 w-full">
        <div class="flex items-center gap-3">
          <img class="w-8 h-8 object-contain mix-blend-multiply" src="/src/assets/logo.png" alt="CrowdSense TN Logo" />
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
              <h2 class="font-headline-md text-headline-md text-on-background font-semibold">${e.name}</h2>
              <p class="text-on-surface-variant font-body-md mb-2">Transit ID: ${e.transitId}</p>
              <div class="inline-flex items-center gap-2 bg-primary-container/10 text-primary px-3 py-1 rounded-full">
                <span class="material-symbols-outlined text-[18px]">workspace_premium</span>
                <span class="font-label-caps text-label-caps font-bold">${e.role}</span>
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
                <p class="text-xl md:text-headline-md text-primary font-bold">${e.tripsCount}</p>
                <p class="text-xs text-green-600 mt-1 flex items-center font-medium">
                  <span class="material-symbols-outlined text-[14px]">trending_up</span> +8%
                </p>
              </div>
              <div class="p-3 md:p-4 bg-surface-container-low rounded-xl">
                <p class="text-on-surface-variant font-label-caps text-[10px] md:text-label-caps mb-1 truncate">TIME SAVED</p>
                <p class="text-xl md:text-headline-md text-primary font-bold">${e.timeSaved}</p>
                <p class="text-xs text-on-surface-variant mt-1 font-medium truncate">vs driving</p>
              </div>
              <div class="p-3 md:p-4 bg-surface-container-low rounded-xl">
                <p class="text-on-surface-variant font-label-caps text-[10px] md:text-label-caps mb-1 truncate">CO2 OFFSET</p>
                <p class="text-xl md:text-headline-md text-primary font-bold">${e.co2Offset}</p>
                <p class="text-xs text-green-600 mt-1 font-medium truncate">Eco-Leader</p>
              </div>
              <div class="p-3 md:p-4 bg-surface-container-low rounded-xl">
                <p class="text-on-surface-variant font-label-caps text-[10px] md:text-label-caps mb-1 truncate">CROWD AVOIDANCE</p>
                <p class="text-xl md:text-headline-md text-primary font-bold">${e.avoidanceScore}</p>
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
    `},mount(){const e=document.getElementById("edit-profile-btn");e&&e.addEventListener("click",()=>{alert("Profile editing is disabled in demo mode.")}),document.querySelectorAll(".settings-item").forEach(o=>{o.addEventListener("click",()=>{alert("This setting option is fully configured with standard options.")})});const a=document.getElementById("trip-history-btn");a&&a.addEventListener("click",()=>{alert("Full trip logs are successfully synced with transit databases.")});const i=document.getElementById("btn-signout");i&&i.addEventListener("click",()=>{confirm("Resetting session will clear local storage and reload the starting sequence. Proceed?")&&(localStorage.clear(),sessionStorage.clear(),window.location.hash="#/loading")});const s=document.getElementById("saved-routes-list-box"),n=document.getElementById("add-route-shortcut-btn");function r(){if(!s)return;const o=K.getSavedRoutes();if(o.length===0){s.innerHTML=`
          <div class="p-6 text-center text-on-surface-variant opacity-80 border-2 border-dashed border-outline-variant/30 rounded-xl">
            <p class="text-sm font-semibold">No saved routes yet.</p>
            <p class="text-xs mt-1">Bookmark routes on tracking pages to view them here.</p>
          </div>
        `;return}s.innerHTML=o.map(l=>{const c=l.label.includes("WORK")?"bg-primary/10 text-primary":"bg-secondary/10 text-secondary";return`
          <div class="saved-route-card-item p-3 md:p-4 bg-surface-container-low rounded-xl border border-transparent hover:border-primary/20 transition-all cursor-pointer group flex items-center justify-between gap-2" data-saved-bus-id="${l.busId}">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-2">
                <span class="${c} px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">${l.label}</span>
              </div>
              <p class="font-title-lg text-on-background font-semibold truncate">${l.desc}</p>
              <p class="text-xs text-on-surface-variant">Tap to view live tracking</p>
            </div>
            <button class="remove-saved-route-btn p-2 rounded-full hover:bg-surface-container-high transition-colors" data-remove-bus-id="${l.busId}">
              <span class="material-symbols-outlined text-error font-bold hover:scale-110 transition-transform">delete</span>
            </button>
          </div>
        `}).join(""),s.querySelectorAll(".saved-route-card-item").forEach(l=>{l.addEventListener("click",c=>{if(c.target.closest(".remove-saved-route-btn"))return;const b=l.getAttribute("data-saved-bus-id");b&&(window.location.hash=`#/bus-details?id=${b}`)})}),s.querySelectorAll(".remove-saved-route-btn").forEach(l=>{l.addEventListener("click",c=>{c.stopPropagation();const b=l.getAttribute("data-remove-bus-id");b&&(K.removeRoute(b),r())})})}n&&n.addEventListener("click",()=>{window.location.hash="#/map?tab=routes"}),r()}},De={"/loading":Ie,"/home":Be,"/map":M,"/bus-details":$e,"/alerts":Ne,"/profile":_e};let de=null;function Oe(){const e=window.location.hash||"#/loading",[t,a]=e.split("?"),i=t.replace(/^#/,"")||"/loading",s={};return a&&a.split("&").forEach(n=>{const[r,o]=n.split("=");s[decodeURIComponent(r)]=decodeURIComponent(o)}),{route:i,params:s}}function Pe(e){const t=document.getElementById("app-navbar");if(!t)return;if(e==="/loading"){t.classList.add("hidden");return}t.classList.remove("hidden"),["nav-home","nav-map","nav-alerts","nav-profile"].forEach(n=>{const r=document.getElementById(n);if(r){r.className="flex flex-col items-center justify-center text-on-surface-variant dark:text-secondary-fixed-dim opacity-70 hover:opacity-100 active:scale-90 transition-all duration-150 rounded-xl px-4 py-1";const o=r.querySelector(".material-symbols-outlined");o&&(o.style.fontVariationSettings="'FILL' 0")}});let i="";e==="/home"?i="nav-home":e==="/map"||e==="/bus-details"?i="nav-map":e==="/alerts"?i="nav-alerts":e==="/profile"&&(i="nav-profile");const s=document.getElementById(i);if(s){s.className="flex flex-col items-center justify-center bg-primary-container/20 text-primary dark:text-primary-fixed rounded-xl px-4 py-1 active:scale-90 transition-transform duration-150 font-semibold";const n=s.querySelector(".material-symbols-outlined");n&&(n.style.fontVariationSettings="'FILL' 1")}}function Ae(){const{route:e,params:t}=Oe(),a=De[e]||Be;de&&typeof de.unmount=="function"&&de.unmount(),Pe(e);const i=document.getElementById("app-content");i&&(i.innerHTML=a.render(t),de=a,window.scrollTo({top:0,left:0,behavior:"instant"}),typeof a.mount=="function"&&a.mount(t))}window.addEventListener("hashchange",Ae);document.addEventListener("DOMContentLoaded",()=>{const e=window.location.hash;e&&e!=="#/loading"&&sessionStorage.setItem("redirect_target",e),window.location.hash="#/loading",Ae()});
