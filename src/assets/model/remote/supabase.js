import { createClient } from "@supabase/supabase-js"
const supabaseAPIUrl = "https://naeydbqunatldbdyzylj.supabase.co"
const supabaseAPIKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hZXlkYnF1bmF0bGRiZHl6eWxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjkxODk2NDQsImV4cCI6MTk4NDc2NTY0NH0.8AWPPUvLeN_fH9qDL8rQXEgjJCSt2WMtJJ1ZweSVnBw"
export const supa = createClient(supabaseAPIUrl, supabaseAPIKey)
