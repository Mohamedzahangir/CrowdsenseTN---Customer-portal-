import { supabase } from './supabaseClient';

export const TripService = {
  async getTripHistory(commuterId) {
    const { data, error } = await supabase
      .from('trip_history')
      .select('*')
      .eq('commuter_id', commuterId)
      .order('timestamp', { ascending: false });
    if (error) {
      console.error("Error fetching trip history:", error);
      return [];
    }
    return data;
  },

  async logCommuterTrip(trip) {
    const { data, error } = await supabase
      .from('trip_history')
      .insert([trip])
      .select();
    if (error) console.error("Error logging commuter trip:", error);
    return data;
  }
};
