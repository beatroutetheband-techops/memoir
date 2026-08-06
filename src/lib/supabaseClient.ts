import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ilawgxhinyeyvnwksdqb.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsYXdneGhpbnlleXZud2tzZHFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5OTgyOTIsImV4cCI6MjEwMTU3NDI5Mn0.N6915yBVt_MV_OqpKrMVzf_zQbmoad-7opXW9r-d9yM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
