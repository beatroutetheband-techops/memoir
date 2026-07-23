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

const STORAGE_KEY = 'beatroute_bookings';

const initialMockBookings: Booking[] = [
  {
    id: 'b1',
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    client_name: "Rajesh Kumar",
    whatsapp: "+91 98765 43210",
    location: "Chennai, Tamil Nadu",
    package_name: 'basic',
    language: "Tamil",
    occasion: "Anniversary",
    occasion_date: "2026-08-15",
    relationship_history: "We met in college 8 years ago. Married for 5 years now.",
    favorite_memories: "Our first trip together to Ooty where it rained all day. She loves acoustic violin notes.",
    selected_addons: [],
    total_price: 7000,
    status: 'pending',
    admin_notes: "Assigning acoustic guitar track to Karthik."
  },
  {
    id: 'b2',
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    client_name: "Priya Sharma",
    whatsapp: "+91 81234 56789",
    location: "Mumbai, Maharashtra",
    package_name: 'pro',
    language: "Hindi",
    occasion: "Spouses",
    occasion_date: "2026-07-28",
    relationship_history: "Met at our workplace during a training program. Love at first sight.",
    favorite_memories: "He loves black coffee and reading. Want a warm soulful track with guitar and keys.",
    selected_addons: ["Rush 48-Hour Delivery"],
    total_price: 12000, // 10000 + 2000
    status: 'in_production',
    admin_notes: "Vocals tracking scheduled for tonight. Rush order."
  },
  {
    id: 'b3',
    created_at: new Date().toISOString(),
    client_name: "Sneha Nair",
    whatsapp: "+91 94460 12345",
    location: "Kochi, Kerala",
    package_name: 'ultimate',
    language: "Malayalam",
    occasion: "Birthday",
    occasion_date: "2026-08-02",
    relationship_history: "My brother's 30th birthday. He is a huge fan of classic bands.",
    favorite_memories: "He is always playing guitar and singing. We want a rich cinematic track with duet vocals.",
    selected_addons: ["Extra Live Instruments"],
    total_price: 18000, // 15000 + 3000
    status: 'completed',
    admin_notes: "Finished mix and master. Delivered package via email."
  }
];

export const bookingService = {
  // Initialize storage with mock data if empty
  initialize: (): Booking[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialMockBookings));
      return initialMockBookings;
    }
    return JSON.parse(stored);
  },

  // Get all bookings
  getBookings: async (): Promise<Booking[]> => {
    if (typeof window === 'undefined') return initialMockBookings;
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : bookingService.initialize();
  },

  // Get a single booking
  getBooking: async (id: string): Promise<Booking | null> => {
    const bookings = await bookingService.getBookings();
    return bookings.find(b => b.id === id) || null;
  },

  // Create a new booking
  createBooking: async (bookingData: Omit<Booking, 'id' | 'created_at' | 'status'>): Promise<Booking> => {
    const bookings = await bookingService.getBookings();
    const newBooking: Booking = {
      ...bookingData,
      id: 'b_' + Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString(),
      status: 'pending'
    };
    
    bookings.unshift(newBooking);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    return newBooking;
  },

  // Update status or notes
  updateBooking: async (id: string, updates: Partial<Pick<Booking, 'status' | 'admin_notes'>>): Promise<Booking> => {
    const bookings = await bookingService.getBookings();
    const index = bookings.findIndex(b => b.id === id);
    if (index === -1) {
      throw new Error('Booking not found');
    }
    
    bookings[index] = {
      ...bookings[index],
      ...updates
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    return bookings[index];
  }
};
