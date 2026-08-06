import { Edge, Field, Form } from "@/types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface FormStore {
  form: Form;

  addField: (field: Field) => void;
  updateField: (id: string, patch: Partial<Field>) => void;
  deleteField: (id: string) => void;
  addEdge: (edge: Edge) => void;
  deleteEdge: (id: string) => void;
}

const seedForm: Form = {
  id: "form-1",
  title: "Car & Transport Survey",
  startFieldId: "q1",
  fields: [
    {
      id: "q1",
      type: "boolean",
      label: "Do you own a car?",
      required: true,
    },
    {
      id: "q2",
      type: "text",
      label: "What insurance do you have?",
      required: true,
    },
    {
      id: "q3",
      type: "boolean",
      label: "Do you use public transport?",
      required: true,
    },
  ],

  edges: [
    {
      id: "e1",
      source: "q1",
      target: "q2",
      condition: { fieldId: "q1", operator: "equals", value: true },
    },
    {
      id: "e2",
      source: "q1",
      target: "q3",
    },
  ],
};

const useFormStore = create<FormStore>()(
  immer((set, get) => ({
    form: seedForm,

    addField: (field) =>
      set((state) => {
        state.form.fields.push(field);
      }),

    updateField: (id, patch) =>
      set((state) => {
        const field = state.form.fields.find((f) => f.id === id);
        if (field) Object.assign(field, patch);
      }),

    deleteField: (id) =>
      set((state) => {
        state.form.fields = state.form.fields.filter((f) => f.id !== id);
        state.form.edges = state.form.edges.filter((e) => e.source !== id && e.target !== id);

        // If we deleted the start field, its id now dangles — repoint it to the
        // first remaining field (or "" if none are left). Otherwise leave it alone.
        if (state.form.startFieldId === id) {
          state.form.startFieldId = state.form.fields[0]?.id ?? "";
        }
      }),

    addEdge: (edge) =>
      set((state) => {
        state.form.edges.push(edge);
      }),

    deleteEdge: (id) =>
      set((state) => {
        state.form.edges = state.form.edges.filter((e) => e.id !== id);
      }),
  })),
);

export const useFields = () => useFormStore((s) => s.form.fields);
export const useEdges = () => useFormStore((s) => s.form.edges);
