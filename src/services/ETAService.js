import { supabase } from './supabaseClient';

export const ETAService = {
  async getPredictionsForTrip(tripId) {
    const { data, error } = await supabase
      .from('eta_predictions')
      .select('*')
      .eq('trip_id', tripId)
      .order('predicted_arrival', { ascending: true });
    if (error) {
      console.error("Error fetching predictions:", error);
      return [];
    }
    return data;
  }
};
