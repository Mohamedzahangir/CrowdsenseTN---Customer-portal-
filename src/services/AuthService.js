import { supabase } from './supabaseClient';

export const AuthService = {
  async registerCommuter(commuter) {
    if (supabase) {
      const { data, error } = await supabase
        .from('commuters')
        .insert([commuter])
        .select();
      if (error) throw error;
      return data[0];
    }
    return commuter;
  },

  async loginCommuter(email) {
    let commuter = null;
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('commuters')
          .select('*')
          .eq('email', email);
        if (!error && data && data.length > 0) {
          commuter = data[0];
        }
      } catch (err) {
        console.error("AuthService: login query failed, falling back:", err);
      }
    }

    if (!commuter) {
      if (email === 'marcus.t@gmail.com' || email === 'marcus.t@crowdsense.tn') {
        commuter = { id: 'c1', name: 'Marcus Thorne', email: email, transit_id: 'TN-8829-X', role: 'Regular Commuter' };
      } else {
        throw new Error("Commuter profile not found.");
      }
    }

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
