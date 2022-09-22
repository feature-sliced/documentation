---
sidebar_position: 2
---

# About architecture

## Problems

Usually, the conversation about architecture is raised when the development stops due to certain problems in the project.

### Bus-factor & Onboarding

Only a limited number of people understand the project and its architecture

**Examples:**

- *"It's difficult to add a person to the development"*
- *"For every problem, everyone has their own opinion on how to get around" (let's envy the angular)*
- *"I don't understand what is happening in this big piece of monolith"*

### Implicit and uncontrolled consequences

A lot of implicit side effects during development/refactoring *("everything depends on everything")*

**Examples:**

- *"The feature imports the feature"*
- *"I updated the store of one page, and the functionality fell off on the other"*
- *"The logic is smeared all over the application, and it is impossible to track where the beginning is, where the end is"*

### Uncontrolled reuse of logic

It is difficult to reuse/modify existing logic

At the same time, there are usually [two extremes](https://github.com/feature-sliced/documentation/discussions/14):

- Either the logic is written completely from scratch for each module *(with possible repetitions in the existing codebase)*
- Either there is a tendency to transfer all-all implemented modules to `shared` folders, thereby creating a large dump of modules *from it (where most are used only in one place)*

**Examples:**

- *"I have **N** implementations of the same business logic in my project, for which I still pay"*
- *"There are 6 different components of the button/pop-up/... In the project"*
- *"Dump of helpers"*

## Requirements

Therefore, it seems logical to present the desired *requirements for an ideal architecture:*

:::note

Wherever it says "easy", it means "relatively easy for a wide range of developers", because it is clear that [it will not be possible to make an ideal solution for absolutely everyone](/docs/about/mission#restrictions)

:::

### Explicitness

- It should be **easy to master and explain** the project and its architecture to the team
- The structure should reflect the real **business values of the project**
- There must be explicit **side effects and connections** between abstractions
- It should be **easy to detect duplicate logic** without interfering with unique implementations
- There should be no **dispersion of logic** throughout the project
- There should not be **too many heterogeneous abstractions and rules** for a good architecture

### Control

- A good architecture should **speed up the solution of tasks, the introduction of features**
- It should be possible to control the development of the project
- It should be easy to **expand, modify, delete the code**
- The * decomposition and isolation of** functionality must be observed
- Each component of the system must be **easily replaceable and removable**
  - *[No need to optimize for changes][ext-kof-not-modification] - we can't predict the future*
  - *[Better-optimize for deletion][ext-kof-but-removing] - based on the context that already exists*

### Adaptability

- A good architecture should be applicable **to most projects**
  - *With existing infrastructure solutions*
  - *At any stage of development*
- There should be no dependence on the framework and platform
- It should be possible to **easily scale the project and the team**, with the possibility of parallelization of development
- It should be easy **to adapt to changing requirements and circumstances**

## See also

- [(React Berlin Talk) Oleg Isonen - Feature Driven Architecture][ext-kof]
- [(React SPB Meetup #1) Sergey Sova - Feature Slices][ext-slices-spb]
- [(Article) About project modularization][ext-medium]
- [(Article) About Separation of Concerns and structuring by features][ext-ryanlanciaux]

[ext-kof-not-modification]: https://youtu.be/BWAeYuWFHhs?t=1631
[ext-kof-but-removing]: https://youtu.be/BWAeYuWFHhs?t=1666

[ext-slices-spb]: https://t.me/feature_slices
[ext-kof]: https://youtu.be/BWAeYuWFHhs
[ext-medium]: https://alexmngn.medium.com/why-react-developers-should-modularize-their-applications-d26d381854c1
[ext-ryanlanciaux]: https://ryanlanciaux.com/blog/2017/08/20/a-feature-based-approach-to-react-development/
