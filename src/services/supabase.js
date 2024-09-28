import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://wewueldiqrctbshrwnce.supabase.co';
export const supabaseQueryKeys = {
  bookings: 'bookings',
  booking: 'booking',
  cabins: 'cabins',
  guests: 'guests',
  settings: 'settings',
};

export const supabaseBuckets = {
  avatars: 'avatars',
};

const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indld3VlbGRpcXJjdGJzaHJ3bmNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYzNDY5NjMsImV4cCI6MjA0MTkyMjk2M30.LRDL8RiSAF6YGlLNS2W3InBuZcRAczAFkq1lIfdchrM';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
