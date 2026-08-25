export type YarnWeight =
  | "Lace"
  | "Fingering"
  | "Sport"
  | "DK"
  | "Worsted"
  | "Aran"
  | "Bulky"
  | "Super Bulky"
  | "Other";

export type ProjectStatus = "planned" | "wip" | "fo" | "frogged";

export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  is_pro: boolean;
  created_at: string;
  updated_at: string;
}

export interface Yarn {
  id: string;
  user_id: string;
  name: string;
  brand: string | null;
  colorway: string | null;
  weight: YarnWeight | null;
  fiber: string | null;
  quantity: number;
  quantity_unit: string;
  location: string | null;
  notes: string | null;
  image_url: string | null;
  color_hex: string | null;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  title: string;
  status: ProjectStatus;
  progress: number;
  pattern_name: string | null;
  pattern_url: string | null;
  notes: string | null;
  image_url: string | null;
  started_at: string | null;
  finished_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProjectYarn {
  id: string;
  project_id: string;
  yarn_id: string;
  amount_used: number | null;
  notes: string | null;
}

export type YarnInsert = Omit<Yarn, "id" | "created_at" | "updated_at">;
export type ProjectInsert = Omit<Project, "id" | "created_at" | "updated_at">;
