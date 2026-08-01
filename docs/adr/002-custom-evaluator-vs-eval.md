### 002-ADR : Custom Evaluator over eval()

#### Context: 
When a user builds a form, they define conditions on the branches ("if the answer is X, go to question Y"). Because the user authors these conditions, the program receives each one as a string and must evaluate it to true or false at runtime to decide which question comes next.

#### Decision: 
Build a custom expression evaluator (tokenizer → parser → evaluator) instead of using eval() or a third-party expression library.

#### Reasoning: 
eval() executes a string as live JavaScript, which appears to solve the problem in one line. But it runs any JavaScript with the full privileges of the app and the string comes from the user. A malicious user could submit code instead of a condition (for example, code that reads other users' session cookies and sends them to an external server), and eval() would execute it. This is a code-injection vulnerability and an immediate security red flag.

A custom evaluator avoids this by parsing the condition rather than running it, in three stages: a tokenizer splits the string into tokens (age > 18 → age, >, 18); a parser builds an Abstract Syntax Tree (AST) capturing the structure (a "greater-than" node with two children); and an evaluator walks that tree and computes the result using only a whitelist of operations the code explicitly supports. The safety comes from construction, not filtering: the evaluator has no machinery to execute anything outside its defined node types, so arbitrary code cannot run not because it's blocked, but because the means to run it was never built. This is a stronger guarantee than filtering dangerous input, which attackers can often bypass.

A safe expression library would also prevent injection, but building the evaluator by hand is a deliberate choice: parser/interpreter construction is a core skill this project exists to demonstrate, and using a library would remove the main learning value.

#### Consequences: 
The custom evaluator is more code and carries a testing burden that eval() (one line) and a library do not. Its safety must be proven, not assumed — hostile inputs (constructor, __proto__, process.exit, alert(1)) must be tested and shown to be rejected or inert. The project accepts this extra work in exchange for safety-by-construction and the demonstration of parser/interpreter skill.