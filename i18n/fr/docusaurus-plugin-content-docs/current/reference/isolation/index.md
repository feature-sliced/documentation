# Isolation of modules

Within the framework of the methodology, all modules are distributed by scopes of responsibility (layer, slice, segment)

The layers, in turn, are organized vertically:

- "At the bottom" are the reused modules (ui-kit, internal libraries of the project), as the most abstract
- And as you move "up", more specific modules are located.

Regardless of whether it belongs to any slice, each module [**is required to provide a public access interface**][refs-public-api].

## Requirements

The interaction of each module with the rest of the application is designed taking into account a number of requirements:

1. **Low coupling** with other modules
    - *A change in one module should have a weak and predictable effect on others*

1. **High cohesion** - the responsibilities of each module are "focused" on one task

    - *If the module has too many responsibilities (starts "doing too much") - this should be noticed as soon as possible*
1. **Absence of cyclic dependencies** on the scale of the entire application

    - *Often lead to unexpected, undesirable behavior, it is better to avoid them altogether*

## Rule

To meet these requirements, within the framework of the methodology, it is necessary to observe the basic rule:

:::info Important

A module can depend only on "underlying" modules, but not on modules from the same or higher layer

:::

- `features/auth` **cannot** depend on `features/filters` **and vice versa**
- `features/auth` **may** depend on `shared/ui/button`, **but not vice versa**

Following this rule allows you to keep dependencies **"unidirectional"** - which automatically **eliminates cyclic imports** and significantly **simplifies tracking dependencies** between modules in the application.

## Identifying problems

<!-- 
TODO After gaining experience with the methodology, make this block more detailed
-->
Violation of this rule is a signal of problems:

1. The module has **import from another module** from its own layer

    - Perhaps the module was **unnecessarily fragmented** or has **unnecessary responsibility.**
    - You should **combine** it with the imported module or **move it (partially or completely) to the layer below** or transfer the logic of relationships to modules on higher layers.

1. The module **is imported by many modules** from its own layer

    - Perhaps the module has **extra responsibility.**
    - You should **move it (partially or entirely) to the layer below**, or transfer the logic of connections to modules on higher layers.

1. The module **has imports from many modules** from its own layer

    - Perhaps the module belongs to **another scope of responsibility.**
    - You should **move it (partially or completely) to the layer above**.

## See also

- [(Guide) About achieving low coupling][refs-low-coupling]
- [(Discussion) Coupled entities](https://github.com/feature-sliced/documentation/discussions/49)
- [(Discussion) About cross-imports and analysis зависимостей](https://github.com/feature-sliced/documentation/discussions/65#discussioncomment-480822)
- [**GRASP** Patterns](https://en.wikipedia.org/wiki/GRASP_(object-oriented_design))

[refs-public-api]: /docs/reference/public-api
[refs-low-coupling]: /docs/reference/isolation/coupling-cohesion
