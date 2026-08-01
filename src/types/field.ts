export enum FieldType {
  TEXT = "text",
  TEXTAREA = "textarea",
  NUMBER = "number",
  DATE = "date",
  BOOLEAN = "boolean",
  MULTI_SELECT = "multi-select",
  SINGLE_SELECT = "single-select",
}

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