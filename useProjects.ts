"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Project, ProjectInsert } from "@/types/database";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data, error: fetchError } = await supabase
        .from("projects")
        .select("*")
        .order("updated_at", { ascending: false });

      if (fetchError) {
        setError(fetchError.message);
        setProjects([]);
      } else {
        setProjects(data || []);
      }
    } catch (err) {
      console.error(err);
      setError("Could not connect to database. Tables may not be set up yet.");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const addProject = async (project: Omit<ProjectInsert, "user_id">) => {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError("Please sign in first (go to Sign in)");
        return null;
      }
      const { data, error: insertError } = await supabase
        .from("projects")
        .insert({ ...project, user_id: user.id })
        .select()
        .single();
      if (insertError) {
        setError(insertError.message);
        return null;
      }
      setProjects((prev) => [data, ...prev]);
      return data;
    } catch (err) {
      console.error(err);
      setError("Failed to create project");
      return null;
    }
  };

  const updateProgress = async (id: string, progress: number) => {
    try {
      const supabase = createClient();
      const { data, error: updateError } = await supabase
        .from("projects")
        .update({ progress, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();
      if (updateError) {
        setError(updateError.message);
        return null;
      }
      setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
      return data;
    } catch {
      return null;
    }
  };

  return { projects, loading, error, addProject, updateProgress, refresh: fetchProjects };
}
