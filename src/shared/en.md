# Namespace: Shared

## Description

**Set of shared libraries** of pure low-level abstraction elements, such as **external APIs access methods**, **utility functions**, and **reusable UI components**.
Those elements can be used on any of higher abstraction layers, as a matter of fact being implementation details of more complex entities.
Accordingly, they **must not contain business logic, must not store a state, and must not use any of higher-level constructs**.
**Changing the public API** of shared modules is most **critical** for its consumers, and hence **for the whole application**, leading to malfunctions in a difficultly predictable count of its individual parts. For this reason, shared libraries code should have a maximum test coverage.
In addition, the application also indirectly depends on their internal implementation, because it relies on strictly defined expected behavior.
