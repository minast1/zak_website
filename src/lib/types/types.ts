export type APIResponse<T = object> =
  | { success: true; data: T }
  | { success: false; error: string };

export interface PreviewFile extends File {
  preview: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  tags: string[];
  label: string;
  image: string;
}
