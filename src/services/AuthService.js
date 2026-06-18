import { supabase } from './supabaseClient';

export const AuthService = {
  async registerCommuter(commuter) {
    const { data, error } = await supabase
      .from('commuters')
      .insert([commuter])
      .select();
    if (error) throw error;
    return data[0];
  },

  async loginCommuter(email) {
    const { data, error } = await supabase
      .from('commuters')
      .select('*')
      .eq('email', email);
    if (error || !data || data.length === 0) {
      throw new Error("Commuter profile not found.");
    }
    const commuter = data[0];
    localStorage.setItem('commuter_session', JSON.stringify(commuter));
    return commuter;
  },

  getCurrentCommuter() {
    const session = localStorage.getItem('commuter_session');
    return session ? JSON.parse(session) : { id: 'c1', name: 'Marcus Thorne', email: 'marcus.t@gmail.com' };
  },

  logout() {
    localStorage.removeItem('commuter_session');
  }
};
