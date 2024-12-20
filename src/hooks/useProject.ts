import { useState, useEffect } from 'react';
import { supabase, Project } from '../lib/supabase';

export function useProject(userId: string | undefined) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    async function fetchProject() {
      try {
        const { data: existingProject, error: projectError } = await supabase
          .from('projects')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (projectError && projectError.code !== 'PGRST116') throw projectError;
        setProject(existingProject || null);
      } catch (err: any) {
        console.error('Error fetching project:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [userId]);

  const createProject = async (companyName: string) => {
    if (!userId) return null;

    try {
      // First ensure user exists in users table
      const { error: userError } = await supabase
        .from('users')
        .upsert([
          {
            id: userId,
            email: (await supabase.auth.getUser()).data.user?.email || '',
          },
        ]);

      if (userError) throw userError;

      // Then create the project
      const { data: newProject, error: projectError } = await supabase
        .from('projects')
        .insert([
          {
            user_id: userId,
            company_name: companyName,
            current_status: 'onboarding',
          },
        ])
        .select()
        .single();

      if (projectError) throw projectError;
      setProject(newProject);
      return newProject;
    } catch (err: any) {
      console.error('Error creating project:', err);
      setError(err.message);
      throw err;
    }
  };

  return { project, loading, error, createProject };
}