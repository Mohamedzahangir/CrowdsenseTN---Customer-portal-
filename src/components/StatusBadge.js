// StatusBadge.js - Reusable Crowd Density status badge component

export const StatusBadge = {
  getBadgeDetails(percentage) {
    let label = "Low Crowd";
    let chipClass = "status-chip-low";
    let color = "#22c55e"; // green
    
    if (percentage > 40 && percentage <= 75) {
      label = "Medium Crowd";
      chipClass = "status-chip-medium";
      color = "#eab308"; // yellow
    } else if (percentage > 75) {
      label = "High Crowd";
      chipClass = "status-chip-high";
      color = "#ef4444"; // red
    }

    return { label, chipClass, color };
  },

  render(percentage) {
    const { label, chipClass } = this.getBadgeDetails(percentage);
    return `
      <span class="${chipClass} px-3 py-1 rounded-full font-label-caps text-[10px] flex items-center gap-1.5 font-bold uppercase tracking-wide">
        <span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">groups</span>
        ${label}
      </span>
    `;
  }
};
