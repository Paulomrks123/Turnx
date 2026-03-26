import { supabase } from '../lib/supabase';
import { Database } from '../types/database';

type Profile = Database['public']['Tables']['profiles']['Row'];
type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

export const profileService = {
  async getProfile(id: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Profile;
  },

  async updateProfile(id: string, updates: ProfileUpdate) {
    const { data, error } = await supabase
      .from('profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Profile;
  },

  async getRanking() {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, avatar_url, points, company')
      .order('points', { ascending: false })
      .limit(10);
    
    if (error) throw error;
    return data;
  },

  async getSuggestedMembers(limit: number = 5) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .neq('id', user.id)
      .limit(limit);

    if (error) throw error;
    return data as Profile[];
  },

  async getProfiles() {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('full_name');
    
    if (error) throw error;
    return data as Profile[];
  }
};
