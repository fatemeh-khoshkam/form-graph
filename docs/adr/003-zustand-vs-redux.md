### 003-ADR : Zustand over Redux

#### Context: 
The form schema is shared across four views (Workflow, Content, Preview, Responses). All four read from and write to the same state, which updates frequently as the user edits and navigates.

#### Decision: 
Use Zustand for global state management, rather than Redux or React Context.

#### Reasoning: 
Sharing state between distant components without a store forces prop-drilling, passing data down through intermediate components that don't use it, only forward it. 
This couples those components to data they don't care about and breaks easily when the tree changes. A store removes the chain: any component reads directly. Redux solves this too, but its actions/reducers/dispatch/provider structure is more ceremony than an MVP of this scope needs. React Context also shares state, but every consuming component re-renders whenever any part of the context value changes, there is no way to subscribe to a single slice. Zustand's selectors let a component subscribe to only the piece of state it uses, so it re-renders only when that piece changes which matters for builder state that updates on every keystroke and drag.

#### Consequences: 
Zustand's minimalism is also its trade-off. Redux's stricter structure and time-travel DevTools provide stronger conventions and debugging on large teams, which this project forgoes. For a solo MVP this is the right trade, but on a larger team with many contributors, Redux's rigidity could be the better choice.