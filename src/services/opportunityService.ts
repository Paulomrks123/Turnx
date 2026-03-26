import { supabase } from '../lib/supabase';
import { Database } from '../types/database';

type Opportunity = Database['public']['Tables']['opportunities']['Row'];
type OpportunityInsert = Database['public']['Tables']['opportunities']['Insert'];

export const opportunityService = {
  async getOpportunities() {
    const { data, error } = await supabase
      .from('opportunities')
      .select('*, profiles(full_name, avatar_url, company)')
      .eq('status', 'approved')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createOpportunity(opportunity: OpportunityInsert) {
    const { data, error } = await supabase
      .from('opportunities')
      .insert([opportunity])
      .select()
      .single();
    
    if (error) throw error;
    return data as Opportunity;
  },

  async getMyOpportunities(userId: string) {
    const { data, error } = await supabase
      .from('opportunities')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Opportunity[];
  },

  async deleteOpportunity(id: string) {
    const { error } = await supabase
      .from('opportunities')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};
