import { supabase } from '@/lib/supabaseClient';

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  role: string;
  created_at: string;
}

export const userService = {
  // Get user profile from public.users table
  getUserProfile: async (userId: string): Promise<UserProfile | null> => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error || !data) {
        return null;
      }
      return data as UserProfile;
    } catch (err) {
      console.error('Error fetching user profile:', err);
      return null;
    }
  },

  // Get all registered admin users
  getAllUsers: async (): Promise<UserProfile[]> => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching users:', error);
        return [];
      }
      return (data || []) as UserProfile[];
    } catch (err) {
      console.error('Error fetching users list:', err);
      return [];
    }
  },

  // Update user profile details
  updateUserProfile: async (userId: string, updates: Partial<UserProfile>): Promise<UserProfile | null> => {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

      if (error || !data) {
        return null;
      }
      return data as UserProfile;
    } catch (err) {
      console.error('Error updating user profile:', err);
      return null;
    }
  }
};
