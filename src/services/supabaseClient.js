import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

console.log("Customer Supabase URL:", supabaseUrl);
console.log("Customer Supabase Key exists:", !!supabaseAnonKey);

let client = null;
try {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("CRITICAL: Supabase URL or Anon Key is missing inside environment variables!");
  } else {
    client = createClient(supabaseUrl, supabaseAnonKey);
  }
} catch (err) {
  console.error("CRITICAL: Failed to initialize Supabase client:", err);
}

export const supabase = client;
