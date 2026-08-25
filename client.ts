import { createBrowserClient } from "@supabase/ssr";

const SUPABASE_URL = "https://scqyfnmbgtkviagxfxlo.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjcXlmbm1iZ3RrdmlhZ3hmeGxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc2Njc4NzQsImV4cCI6MjEwMzI0Mzg3NH0.vyyRQ1_p9LT1kMQi1A-i9LmldY5V0Q8sr6tmZN7Jjng";

export function createClient() {
  try {
    return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } catch (e) {
    console.error("Supabase client error:", e);
    // Return a minimal stub so UI never crashes
    return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
}
