# The `shared` domain

## Description

**A set of shared libraries** of pure low-level abstraction elements, such as **external APIs access methods**, **utility functions**, and **reusable UI components**.

These elements can be used on any of higher abstraction layers, as a matter of fact being implementation details of more complex entities.
Accordingly, they **must not: contain business logic, store a state, and use any of higher-level constructs**.

**Changing the public API** of shared modules is most **critical** for its consumers, and hence **for the whole application**, leading to malfunctions in a difficultly predictable count of its individual parts. For this reason, shared libraries code should have maximum test coverage.

In addition, the application also depends indirectly on their internal implementation, because it relies on strictly defined expected behavior of this modules.
