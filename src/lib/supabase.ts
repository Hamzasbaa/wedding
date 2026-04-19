// Single Supabase client instance, shared across the app.
// Uses the publishable key — safe in the browser when RLS is enabled on every table.
import { createClient } from '@supabase/supabase-js'
import { env } from './env'

export const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_PUBLISHABLE_KEY)
