import { supabase } from '../lib/supabase';
import { Database } from '../types/database';

export type Connection = Database['public']['Tables']['connections']['Row'];
export type ConnectionInsert = Database['public']['Tables']['connections']['Insert'];

export const connectionService = {
  async getConnections(userId: string) {
    const { data, error } = await supabase
      .from('connections')
      .select('*, profiles:requester_id(*)')
      .or(`requester_id.eq.${userId},receiver_id.eq.${userId}`)
      .eq('status', 'accepted');
    
    if (error) throw error;
    return data;
  },

  async getPendingRequests(userId: string) {
    const { data, error } = await supabase
      .from('connections')
      .select('*, profiles:requester_id(*)')
      .eq('receiver_id', userId)
      .eq('status', 'pending');
    
    if (error) throw error;
    return data;
  },

  async sendRequest(request: ConnectionInsert) {
    const { data, error } = await supabase
      .from('connections')
      .insert(request)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateRequestStatus(requestId: string, status: 'accepted' | 'rejected') {
    const { data, error } = await supabase
      .from('connections')
      .update({ status })
      .eq('id', requestId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};
