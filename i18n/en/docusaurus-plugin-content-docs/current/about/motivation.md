---
sidebar_position: 2
---

# Motivation

The main idea of **Feature-Sliced Design** is to facilitate and reduce the cost of developing complex and developing projects, based on [combining research results, discussing the experience of various kinds of a wide range of developers][ext-discussions].

Obviously, this will not be a silver bullet, and of course, the methodology will have its own [limits of applicability][refs-mission].

Nevertheless, there are reasonable questions regarding *the feasibility of such a methodology as a whole*

:::note

More details [discussed in the discussion][disc-src]

:::

## Why are there not enough existing solutions?
<!--TODO: #existing-solutions -->
> It usually, these arguments:
>
> - *"Why you need some new methodology, if you already have long-established approaches and principles of design such as `SOLID`, `KISS`, `YAGNI`, `DDD`, `GRASP`, `DRY`, etc."*
> - *"All the problems are solved by good project documentation, tests, and structured processes"*
> - *"Problems would not have happened if all developers are following all the above"*
> - *"Everything was invented before you, you just can't use it"*
> - *"Take {FRAMEWORK_NAME} - everything has already been decided for you there"*

### Principles alone are not enough

**The existence of principles alone is not enough to design a good architecture**

Not everyone knows them completely, even fewer understand and apply them correctly

*The design principles are too general, and do not give a specific answer to the question: "How to design the structure and architecture of a scalable and flexible application?"*

### Processes don't always work

*Documentation/Tests/Processes* are, of course, good, but alas, even at high costs for them - **they do not always solve the problems posed by the architecture and the introduction of new people into the project**

- The time of entry of each developer into the project is not greatly reduced, because the documentation will most often come out huge / outdated
- Constantly make sure that everyone understands architecture in the same way-it also requires a huge amount of resources
- Do not forget about the bus-factor

### Existing frameworks cannot be applied everywhere

- Existing solutions usually have a high entry threshold, which makes it difficult to find new developers
- Also, most often, the choice of technology has already been determined before the onset of serious problems in the project, and therefore you need to be able to "work with what is" - **without being tied to the technology**

> Q: *"In my project `React/Vue/Redux/Effector/Mobx/{YOUR_TECH}` - how can I better build the structure of entities and the relationships between them?"*

### As a result

We get *"unique as snowflakes"* projects, each of which requires a long immersion of the employee, and knowledge that is unlikely to be applicable on another project

> @sergeysova: *"This is exactly the situation that currently exists in our field of frontend development: each lead will invent different architectures and project structures, while it is not a fact that these structures will pass the test of time, as a result, a maximum of two people can develop the project besides him, and each new developer needs to be immersed again."*

## Why do developers need the methodology?

### Focus on business features, not on architecture problems

The methodology allows you to save resources on designing a scalable and flexible architecture, instead directing the attention of developers to the development of the main functionality. At the same time, the architectural solutions themselves are standardized from project to project.

*A separate question is that the methodology should earn the trust of the community, so that another developer can get acquainted with it and rely on it in solving the problems of his project within the time available to him*

### An experience-proven solution

The methodology is designed for developers who are aimed at *a proven solution for designing complex business logic*

*However, it is clear that the methodology is generally about a set of best-practices, articles that address certain problems and cases during development. Therefore, the methodology will also be useful for the rest of the developers-who somehow face problems during development and design*

### Project Health

The methodology will allow *to solve and track the problems of the project in advance, without requiring a huge amount of resources*

**Most often, technical debt accumulates and accumulates over time, and the responsibility for its resolution lies on both the lead and the team**

The methodology will allow you to *warn* possible problems in the scaling and development of the project in advance

## Why does a business need a methodology?

### Fast onboarding

With the methodology, you can hire a person to the project who **is already previously familiar with this approach, and not train again**

*People start to understand and benefit the project faster, and there are additional guarantees to find people for the next iterations of the project*

### An experience-proven solution

With the methodology, the business will get *a solution for most of the issues that arise during the development of systems*

Since most often a business wants to get a framework / solution that would solve the lion's share of problems during the development of the project

### Applicability for different stages of the project

The methodology can benefit the project *both at the stage of project support and development, and at the MVP stage*

Yes, the most important thing for MVP is *"features, not the architecture laid down for the future"*. But even in conditions of limited deadlines, knowing the best-practices from the methodology, you can *"do with little blood"*, when designing the MVP version of the system, finding a reasonable compromise
(rather than modeling features "at random")

*The same can be said about testing*

## When is our methodology not needed?

- If the project will live for a short time
- If the project does not need a supported architecture
- If the business does not perceive the connection between the code base and the speed of feature delivery
- If it is more important for the business to close orders as soon as possible, without further support

### Business Size

- **Small business** - most often needs a ready-made and very fast solution. Only when the business grows (at least to almost average), he understands that in order for customers to continue using, it is necessary, among other things, to devote time to the quality and stability of the solutions being developed
- **Medium-sized business** - usually understands all the problems of development, and even if it is necessary to *"arrange a race for features"*, he still spends time on quality improvements, refactoring and tests (and of course-on an extensible architecture)
- **Big business** - usually already has an extensive audience, staff, and a much more extensive set of its practices, and probably even its own approach to architecture, so the idea of taking someone else's comes to them not so often

## Plans

The main part of the goals [is set out here][refs-mission--goals], but in addition, it is worth talking about our expectations from the methodology in the future

### Combining experience

Now we are trying to combine all our diverse experience of the `core-team`, and get a methodology hardened by practice as a result

Of course, we can get Angular 3.0 as a result, but it is much more important here to **investigate the very problem of designing the architecture of complex systems**

*And yes - we have complaints about the current version of the methodology, but we want to work together to come to a single and optimal solution (taking into account, among other things, the experience of the community)*

### Life outside the specification

If everything goes well, then the methodology will not be limited only to the specification and the toolkit

- Perhaps there will be reports, articles
- There may be `CODE_MODEs` for migrations to other technologies of projects written according to the methodology
- It is possible that as a result we will be able to reach the maintainers of large technological solutions
  - *Especially for React, compared to other frameworks - this is the main problem, because it does not say how to solve certain problems*

## See also

- [(Discussion) Don't need a methodology?][disc-src]
- [About the methodology's mission: goals and limitations][refs-mission]
- [Types of knowledge in the project][refs-knowledge]

[refs-mission]: /docs/about/mission
[refs-mission--goals]: /docs/about/mission#goals
[refs-knowledge]: /docs/about/knowledge-types

[disc-src]: https://github.com/feature-sliced/documentation/discussions/27
[ext-discussions]: https://github.com/feature-sliced/documentation/discussions
