### 004-ADR : Edge Model

Status: Accepted

#### Context:

The form branches, a question can lead to different next questions depending on the answer so I need to store the arrows (edges) between questions. There were two places to put them.

Option 1 — edges in their own list on the form:

```javascript
form = {
  fields: [
    { id: "q1", label: "Do you drink coffee?" },
    { id: "q2", label: "Favorite roast?" },
    { id: "q3", label: "Thanks for answering!" },
  ],
  edges: [
    { id: "e1", source: "q1", target: "q2", condition: "answer == yes" },
    { id: "e2", source: "q1", target: "q3", condition: "answer == no"  },
    { id: "e3", source: "q2", target: "q3" },
  ]
}
```

Option 2 — each question owns its exits:

```javascript
form = {
  fields: [
    { id: "q1", label: "Do you drink coffee?", next: [
        { target: "q2", condition: "answer == yes" },
        { target: "q3", condition: "answer == no"  },
    ]},
    { id: "q2", label: "Favorite roast?", next: [ { target: "q3" } ]},
    { id: "q3", label: "Thanks for answering!", next: [] },
  ]
}
```



#### Decision:

Edges live in their own list on the form (Option 1).

#### Reasoning:

Deletion is the deciding factor. When a user deletes a question (say q3):

- Option 1: delete q3 from `fields`, then remove every edge touching it in one pass:
`edges = edges.filter(e => e.source !== "q3" && e.target !== "q3")` 
All arrows live in one list, so a single filter finds and removes both the ones pointing in and the ones pointing out.
- Option 2: after deleting q3 from `fields`, other questions' `next` arrays still contain `{ target: "q3" }` — dangling references pointing at a question that no longer exists. Cleaning them means scanning every other question's `next`, and missing one silently breaks navigation later.

Cycle detection does not decide this: both shapes support the graph algorithms about equally, so deletion is the stronger reason.

#### Consequences:

Easier: deleting a question is a single filter, and all edges live in one place (a single source of truth) each edge already carries `source`/`target`, so it drops straight into React Flow's `edges` prop with no field mapping.

Cost: to get one question's outgoing arrows I now filter the whole edge list, instead of just reading `field.next`. Every decision has a cost and this is Option 1's.

Note: React Flow expects each edge to have `source` and `target`, so this model maps to React Flow's `edges` prop.