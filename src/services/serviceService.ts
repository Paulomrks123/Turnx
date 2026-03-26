import { supabase } from '../lib/supabase';
import { Database } from '../types/database';

type Service = Database['public']['Tables']['services']['Row'];
type ServiceInsert = Database['public']['Tables']['services']['Insert'];

export const serviceService = {
  async getServices() {
    const { data, error } = await supabase
      .from('services')
      .select('*, profiles(full_name, avatar_url, company)')
      .eq('status', 'approved')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createService(service: ServiceInsert) {
    const { data, error } = await supabase
      .from('services')
      .insert([service])
      .select()
      .single();
    
    if (error) throw error;
    return data as Service;
  },

  async getMyServices(userId: string) {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Service[];
  },

  async deleteService(id: string) {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};
