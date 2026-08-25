"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Yarn, YarnInsert } from "@/types/database";

export function useYarns() {
  const [yarns, setYarns] = useState<Yarn[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchYarns = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
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
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not load yarns. Check Supabase connection."
      );
      setYarns([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchYarns();
  }, [fetchYarns]);

  const addYarn = async (yarn: Omit<YarnInsert, "user_id">) => {
    try {
      const supabase = createClient();
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
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add yarn");
      return null;
    }
  };

  const deleteYarn = async (id: string) => {
    try {
      const supabase = createClient();
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
    } catch {
      return false;
    }
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
