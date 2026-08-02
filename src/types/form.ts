import { Field } from "./field";
import { Edge } from "./edge";

export interface Form {
    id: string;
    title: string;
    fields: Field[];
    edges: Edge[];
    startFieldId: string; // the id of the field that will be shown first
}