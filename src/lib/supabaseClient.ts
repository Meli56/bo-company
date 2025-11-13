import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hadkaxjamiencndrmcrf.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhZGtheGphbWllbmNuZHJtY3JmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5NDg4NTQsImV4cCI6MjA3ODUyNDg1NH0.CF1lCIYI4fB472egoKMMC5Z6QhQNLu1HikAHzkqYCMw";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

