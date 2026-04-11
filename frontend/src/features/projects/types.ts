export interface Project {
  id: string; // uuid
  name: string;
  description?: string; // optional
  owner_id: string; // uuid -> User
  created_at: string; // timestamp
}
