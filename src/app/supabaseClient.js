import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ||  'https://oxdxgjifolmkbnjbsgrq.supabase.co/rest/v1/comments'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94ZHhnamlmb2xta2JuamJzZ3JxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ4NzEwMjIsImV4cCI6MjA0MDQ0NzAyMn0.myfSYbNOInlPwPbHZLIZ605P_ji3YbyeBXGwVXecUc0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)