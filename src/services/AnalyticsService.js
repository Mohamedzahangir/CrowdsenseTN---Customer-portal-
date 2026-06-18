import { supabase } from './supabaseClient';

export const AnalyticsService = {
  async getCommuterAnalytics(commuterId) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('commuter_analytics')
      .select('*')
      .eq('commuter_id', commuterId)
      .single();
    if (error) {
      console.error("Error fetching commuter analytics:", error);
      return null;
    }
    return data;
  }
};
