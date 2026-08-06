import { supabase } from '@/lib/supabaseClient';

export interface Booking {
  id: string;
  created_at: string;
  client_name: string;
  whatsapp: string;
  location: string;
  package_name: 'basic' | 'pro' | 'ultimate' | 'custom';
  language: string;
  occasion: string;
  occasion_date: string;
  relationship_history: string;
  favorite_memories: string;
  selected_addons: string[];
  total_price: number;
  status: 'pending' | 'in_production' | 'completed';
  admin_notes?: string;
}

export const bookingService = {
  // Get all bookings from Supabase
  getBookings: async (): Promise<Booking[]> => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching bookings from Supabase:', error);
        return [];
      }

      return (data || []).map((item) => ({
        ...item,
        selected_addons: Array.isArray(item.selected_addons) ? item.selected_addons : []
      })) as Booking[];
    } catch (err) {
      console.error('Unexpected error fetching bookings:', err);
      return [];
    }
  },

  // Get a single booking by ID
  getBooking: async (id: string): Promise<Booking | null> => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        console.error('Error fetching single booking:', error);
        return null;
      }

      return {
        ...data,
        selected_addons: Array.isArray(data.selected_addons) ? data.selected_addons : []
      } as Booking;
    } catch (err) {
      console.error('Unexpected error fetching booking:', err);
      return null;
    }
  },

  // Create a new booking in Supabase
  createBooking: async (bookingData: Omit<Booking, 'id' | 'created_at' | 'status'>): Promise<Booking> => {
    const payload = {
      ...bookingData,
      status: 'pending'
    };

    const { data, error } = await supabase
      .from('bookings')
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error('Error creating booking in Supabase:', error);
      throw new Error(error.message || 'Failed to submit booking');
    }

    return {
      ...data,
      selected_addons: Array.isArray(data.selected_addons) ? data.selected_addons : []
    } as Booking;
  },

  // Update status or notes in Supabase
  updateBooking: async (id: string, updates: Partial<Pick<Booking, 'status' | 'admin_notes'>>): Promise<Booking> => {
    const { data, error } = await supabase
      .from('bookings')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating booking in Supabase:', error);
      throw new Error(error.message || 'Failed to update booking');
    }

    return {
      ...data,
      selected_addons: Array.isArray(data.selected_addons) ? data.selected_addons : []
    } as Booking;
  }
};
