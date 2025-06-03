import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://TU-PROYECTO.supabase.co'
const supabaseAnonKey = 'TU-CLAVE-PUBLICA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
