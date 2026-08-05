// Opeator => Condition => Edge

export type Operator = "equals" | "notEquals" | "greaterThan" | "lessThan" | "contains";

export interface Condition {
  fieldId: string;
  operator: Operator;
  value: string | number | boolean | string[];
}

export interface Edge {
  id: string;
  condition?: Condition;
  source: string;
  target: string;
}
