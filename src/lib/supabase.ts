import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface Project {
  id: number;
  user_id: string;
  company_name: string;
  current_status: string;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  created_at: string;
}