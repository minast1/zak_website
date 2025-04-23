export type APIResponse<T = object> =
  | { success: true; data: T }
  | { success: false; error: string };

export interface PreviewFile extends File {
  preview: string;
}
