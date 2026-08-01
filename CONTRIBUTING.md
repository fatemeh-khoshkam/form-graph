# Contributing to Form Graph

Thanks for your interest in the project. This is currently a solo project under
active development, but the conventions below are followed consistently and are
worth knowing before making a change.

> **Note:** This project is a work in progress. Sections on testing and the full
> pull-request process will expand as the project matures.


## Commit Messages

This project follows the [Conventional Commits](https://www.conventionalcommits.org/)
format:

```
<type>(<optional scope>): <short description>
```

**Types used:**

- `feat` — a new feature
- `fix` — a bug fix
- `docs` — documentation only (README, ADRs)
- `test` — adding or fixing tests
- `refactor` — restructuring code without changing behavior
- `chore` — tooling, config, or dependency maintenance
- `perf` — a performance-focused change
- `ci` — CI/CD pipeline changes


**Rules:**

- Use the imperative mood: "add cycle detection", not "added cycle detection".
- Lowercase description, no trailing period.
- One logical change per commit.

Examples:

```
feat(dag): add Kahn's topological sort with caching
fix(evaluator): reject expressions containing prototype access
docs: add ADR-001 for DAG vs linked list
chore: configure husky and lint-staged
```

## Code Style

- TypeScript in strict mode.
- Formatting and linting are enforced by Prettier and ESLint (run automatically
  on commit via Husky + lint-staged).