export interface ProjectCategoryView {
  id: number;
  title: string;
  slug: string;
  image: string | null;
  icon: string | null;
  category_name: string | null;
  description: string | null;
  meta_keywords: string | null;
  meta_description: string | null;
  parent_id: number | null;
  lft: number;
  rgt: number;
  depth: number;
  related_id: number | null;
  language_id: number | null;
  state: number;
  created_by: number;
  updated_by: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;

  imageLink: string | null;
  iconLink: string | null;
  categoryTitle: string;
  link: string;
  categorySlug: string;
  excerpt: string;
}

export interface ProjectItemView {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  thumbnail_link: string;
  category: ProjectCategoryView | null;
  featured: boolean;
  link: string;
  created_at: string;
  location: ProjectLocationView;
  developer: DeveloperView | null;
  architect: ArchitectView | null;
  place_address: string | null;
}

export interface ProjectLocationView {
  id: number;
  title_fa: string;
  title_en: string;
  title_ar: string;
  slug: string;
  latitude: string | null;
  longitude: string | null;
}
export interface ProjectTagPivot {
  project_id: number;
  tag_id: number;
}

export interface ProjectTagView {
  id: number;
  title: string;
  slug: string;
  created_at: string;
  updated_at: string;
  pivot: ProjectTagPivot;
}

export interface ProjectProductView {
  id: number;
  title: string;
  thumbnail_link: string;
}
export interface ProjectDetailView {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  thumbnail_link: string;
  content: string;
  image_link: string;
  responsive_thumbnail_link: string;
  video_link: string | null;
  video_cover_link: string | null;
  featured: boolean;
  link: string;
  created_at: string;
  place_address: string | null;
  location: ProjectLocationView | null;
  date: string | null;
  meta_keywords: string | null;
  meta_description: string | null;
  page_title: string | null;
  developer: DeveloperView | null;
  architect: ArchitectView | null;
  tags: ProjectTagView[];
  products: ProjectProductView[];
  media: MediaView[];
  comments_count: number;
  hits: number;
  updated_at: string;
}

export interface DeveloperView {
  link: string;
  name: string;
}

export interface ArchitectView {
  link: string;
  name: string;
}


export interface MediaView {
  id: number;
  name: string;
  path: string;
  disk: string;
  url: string;
  mime_type: string;
  mediable_type: string;
  mediable_id: string;
  title: null | string;
  description: null | string;
  user_id: string;
  state: string;
  created_by: string;
  updated_by: string;
  approved_at: string;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
}
