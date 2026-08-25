import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const SUPABASE_URL = "https://scqyfnmbgtkviagxfxlo.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjcXlmbm1iZ3RrdmlhZ3hmeGxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc2Njc4NzQsImV4cCI6MjEwMzI0Mzg3NH0.vyyRQ1_p9LT1kMQi1A-i9LmldY5V0Q8sr6tmZN7Jjng";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // ignore when called from Server Component
        }
      },
    },
  });
}
