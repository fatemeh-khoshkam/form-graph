### 001-ADR : DAG over Linked List

#### Context:

A form's questions must be navigated based on previous answers. Branching is required a single question can lead to different next questions depending on the answer given.

#### Decision:

Model the form as a Directed Acyclic Graph (DAG) rather than a linked list.

#### Reasoning:

A linked-list node holds exactly one next pointer, so it can only represent a single linear sequence. This form requires a question to have multiple possible successors, chosen at runtime by evaluating the answer ("if Yes → Q5, if No → Q6" is two successors from one node), which a linked list cannot express. A graph allows the three things this project needs: branching (one node, multiple outgoing edges), merging (several paths rejoining at the same later question), and skipping (jumping over questions that don't apply). The "acyclic" constraint guarantees the form always terminates — no path of answers can loop back forever.

#### Consequences:

The graph is more powerful but not free. Because a graph can contain cycles (a linked list cannot), the app must actively detect and reject them so a form can't loop endlessly. Determining the next question requires a traversal algorithm rather than simply following a .next pointer, and producing a processing order requires a topological sort. This algorithmic machinery is the core work of the project.
