export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      keyword: {
        Row: {
          id: number;
          keyword: string;
          name: string | null;
          parents: string | null;
        };
        Insert: {
          id: number;
          keyword: string;
          name?: string | null;
          parents?: string | null;
        };
        Update: {
          id?: number;
          keyword?: string;
          name?: string | null;
          parents?: string | null;
        };
      };
      method: {
        Row: {
          created_at: string | null;
          description: string | null;
          id: number;
          keyword: string | null;
          link: string | null;
          method: string | null;
          parents: string | null;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          id?: number;
          keyword?: string | null;
          link?: string | null;
          method?: string | null;
          parents?: string | null;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          id?: number;
          keyword?: string | null;
          link?: string | null;
          method?: string | null;
          parents?: string | null;
        };
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          created_at: string | null;
          id: number;
          username: string | null;
          website: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string | null;
          id?: number;
          username?: string | null;
          website?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string | null;
          id?: number;
          username?: string | null;
          website?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
