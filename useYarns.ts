"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Yarn, YarnInsert } from "@/types/database";

export function useYarns() {
  const [yarns, setYarns] = useState<Yarn[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const fetchYarns = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data, error: fetchError } = await supabase
      .from("yarns")
      .select("*")
      .order("created_at", { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
      setYarns([]);
    } else {
      setYarns(data || []);
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchYarns();
  }, [fetchYarns]);

  const addYarn = async (yarn: Omit<YarnInsert, "user_id">) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("You must be signed in to add yarn");
      return null;
    }

    const { data, error: insertError } = await supabase
      .from("yarns")
      .insert({ ...yarn, user_id: user.id })
      .select()
      .single();

    if (insertError) {
      setError(insertError.message);
      return null;
    }

    setYarns((prev) => [data, ...prev]);
    return data;
  };

  const deleteYarn = async (id: string) => {
    const { error: deleteError } = await supabase
      .from("yarns")
      .delete()
      .eq("id", id);

    if (deleteError) {
      setError(deleteError.message);
      return false;
    }

    setYarns((prev) => prev.filter((y) => y.id !== id));
    return true;
  };

  return {
    yarns,
    loading,
    error,
    addYarn,
    deleteYarn,
    refresh: fetchYarns,
  };
}
