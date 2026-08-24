"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export function useSubscription() {
  const [isPro, setIsPro] = useState(false);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function check() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setIsPro(false);
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("is_pro")
        .eq("id", user.id)
        .single();

      setIsPro(data?.is_pro ?? false);
      setLoading(false);
    }

    check();
  }, [supabase]);

  return { isPro, loading };
}

/** Free tier limits */
export const FREE_LIMITS = {
  maxYarns: 25,
  maxProjects: 5,
} as const;
