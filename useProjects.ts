"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Project, ProjectInsert } from "@/types/database";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);

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
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const addProject = async (project: Omit<ProjectInsert, "user_id">) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("You must be signed in to add a project");
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
  };

  const updateProgress = async (id: string, progress: number) => {
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

    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data } : p))
    );
    return data;
  };

  return {
    projects,
    loading,
    error,
    addProject,
    updateProgress,
    refresh: fetchProjects,
  };
}
