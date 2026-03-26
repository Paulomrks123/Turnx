import { supabase } from '../lib/supabase';
import { Database } from '../types/database';

type Event = Database['public']['Tables']['events']['Row'];

export const eventService = {
  async getEvents() {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });
    
    if (error) throw error;
    return data as Event[];
  },

  async registerToEvent(userId: string, eventId: string) {
    const { error } = await supabase
      .from('event_registrations')
      .insert([{ user_id: userId, event_id: eventId }]);
    
    if (error) throw error;
  },

  async getMyRegistrations(userId: string) {
    const { data, error } = await supabase
      .from('event_registrations')
      .select('*, events(*)')
      .eq('user_id', userId);
    
    if (error) throw error;
    return data;
  }
};
