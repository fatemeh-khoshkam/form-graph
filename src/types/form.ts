import { Field } from "./field";

export interface Form {
    id: string;
    title: string;
    fields: Field[];
    startFieldId: string; // the id of the field that will be shown first
}