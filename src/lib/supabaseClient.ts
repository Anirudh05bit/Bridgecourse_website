import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ""
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ""

export const isSupabaseConfigured = 
    Boolean(supabaseUrl) && 
    supabaseUrl !== "your_supabase_project_url" &&
    Boolean(supabaseAnonKey) &&
    supabaseAnonKey !== "your_supabase_anon_key"

export const supabase = createClient(
    isSupabaseConfigured ? supabaseUrl : "https://placeholder.supabase.co", 
    isSupabaseConfigured ? supabaseAnonKey : "placeholder"
)
