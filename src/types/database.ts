export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          company: string | null
          role: string | null
          email: string | null
          avatar_url: string | null
          bio: string | null
          points: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          company?: string | null
          role?: string | null
          email?: string | null
          avatar_url?: string | null
          bio?: string | null
          points?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          company?: string | null
          role?: string | null
          email?: string | null
          avatar_url?: string | null
          bio?: string | null
          points?: number
          created_at?: string
          updated_at?: string
        }
      }
      opportunities: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string
          type: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description: string
          type?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string
          type?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: string
          user_id: string
          title: string
          category: string
          sector: string | null
          description: string
          indicative_value: string | null
          model: string | null
          support_links: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          category: string
          sector?: string | null
          description: string
          indicative_value?: string | null
          model?: string | null
          support_links?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          category?: string
          sector?: string | null
          description?: string
          indicative_value?: string | null
          model?: string | null
          support_links?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string | null
          date: string
          time: string
          location: string | null
          image_url: string | null
          is_premium: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          date: string
          time: string
          location?: string | null
          image_url?: string | null
          is_premium?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          date?: string
          time?: string
          location?: string | null
          image_url?: string | null
          is_premium?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      event_registrations: {
        Row: {
          id: string
          user_id: string
          event_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          event_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          event_id?: string
          created_at?: string
        }
      }
      connections: {
        Row: {
          id: string
          requester_id: string
          receiver_id: string
          status: string
          type: string | null
          message: string | null
          meeting_date: string | null
          meeting_place: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          requester_id: string
          receiver_id: string
          status?: string
          type?: string | null
          message?: string | null
          meeting_date?: string | null
          meeting_place?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          requester_id?: string
          receiver_id?: string
          status?: string
          type?: string | null
          message?: string | null
          meeting_date?: string | null
          meeting_place?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
