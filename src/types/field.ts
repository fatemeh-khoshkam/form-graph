export type FieldType =
  "text" | "textarea" | "number" | "date" | "boolean" | "multi-select" | "single-select";

export interface FieldOption {
  id: string;
  label: string;
}

export interface Field {
  id: string;
  type: FieldType;
  label: string;
  options?: FieldOption[]; // only for single-select and multi-select
  required: boolean;
}
