/*
  # Fix RLS Infinite Recursion Issue

  ## Problem
  The current RLS policies create a circular dependency between `projects` and `project_collaborators` tables:
  - projects SELECT policy checks project_collaborators (to see if user is a collaborator)
  - project_collaborators policies check projects (to see if user is the owner)
  - This creates infinite recursion: projects → project_collaborators → projects → ...

  ## Solution
  1. Create a SECURITY DEFINER function to check project ownership (bypasses RLS)
  2. Split the projects SELECT policy into multiple independent policies
  3. Use the SECURITY DEFINER function in project_collaborators policies

  ## Changes Made
  - Drop existing problematic policies
  - Create helper function: is_project_owner()
  - Create separate, non-recursive policies for projects table
  - Update project_collaborators policies to use helper function
*/

-- Drop existing policies that cause recursion
DROP POLICY IF EXISTS "Users can view own projects" ON projects;
DROP POLICY IF EXISTS "Users can view collaborators of their projects" ON project_collaborators;
DROP POLICY IF EXISTS "Project owners can manage collaborators" ON project_collaborators;

-- Create a SECURITY DEFINER function to check project ownership
-- This function bypasses RLS and prevents infinite recursion
CREATE OR REPLACE FUNCTION is_project_owner(project_id uuid, user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM projects
    WHERE id = project_id AND projects.user_id = user_id
  );
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION is_project_owner(uuid, uuid) TO authenticated;

-- Projects table: Split SELECT policy into multiple independent policies
-- Policy 1: Users can view their own projects
CREATE POLICY "Users can view own projects"
  ON projects
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy 2: Anyone can view public projects
CREATE POLICY "Anyone can view public projects"
  ON projects
  FOR SELECT
  TO authenticated
  USING (visibility = 'public');

-- Policy 3: Collaborators can view shared projects
-- This policy checks project_collaborators but doesn't create recursion
-- because project_collaborators policies now use the SECURITY DEFINER function
CREATE POLICY "Collaborators can view shared projects"
  ON projects
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM project_collaborators
      WHERE project_collaborators.project_id = projects.id
      AND project_collaborators.user_id = auth.uid()
    )
  );

-- Project collaborators table: Updated policies using SECURITY DEFINER function
-- Policy 1: Users can view collaborators of projects they own or are part of
CREATE POLICY "Users can view project collaborators"
  ON project_collaborators
  FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    is_project_owner(project_id, auth.uid())
  );

-- Policy 2: Project owners can insert collaborators
CREATE POLICY "Project owners can add collaborators"
  ON project_collaborators
  FOR INSERT
  TO authenticated
  WITH CHECK (is_project_owner(project_id, auth.uid()));

-- Policy 3: Project owners can update collaborators
CREATE POLICY "Project owners can update collaborators"
  ON project_collaborators
  FOR UPDATE
  TO authenticated
  USING (is_project_owner(project_id, auth.uid()))
  WITH CHECK (is_project_owner(project_id, auth.uid()));

-- Policy 4: Project owners can delete collaborators
CREATE POLICY "Project owners can delete collaborators"
  ON project_collaborators
  FOR DELETE
  TO authenticated
  USING (is_project_owner(project_id, auth.uid()));