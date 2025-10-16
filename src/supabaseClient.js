import { createClient } from '@supabase/supabase-js';

// 🚨 Replace these with the actual values you copied from the Supabase API settings
const supabaseUrl = 'https://pkxbtsebiithvalhmyxr.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBreGJ0c2ViaWl0aHZhbGhteXhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1NTA4NzYsImV4cCI6MjA3NjEyNjg3Nn0.rxVlmvOr2QN3keXw8CNb52Vh-JD8E9B99AZb2uOQ-O4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);