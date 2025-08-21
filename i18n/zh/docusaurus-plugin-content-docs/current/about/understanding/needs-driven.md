---
sidebar_position: 2
---

# Needs driven

:::note TL;DR

— _Can't you formulate the goal that the new feature will solve? Or maybe the problem is that the task itself is not formulated? **The point is also that the methodology helps to pull out the problematic definition of tasks and goals**_

— _project does not live in static - requirements and functionality are constantly changing. Over time, the code turns into mush, because at the start the project was designed only for the initial impression of wishes. **And the task of a good architecture is also to be sharpened for changing development conditions.**_

:::

<!--TODO: Make each section later more independent by itself -->
<!--TODO: Add more information on the changing requirements of the project -->

## Why?

To choose a clear name for an entity and understand its components, **you need to clearly understand what task will be solved with the help of all this code.**

> _@sergeysova: During development, we try to give each entity or function a name that clearly reflects the intentions and meaning of the code being executed._

_After all, without understanding the task, it is impossible to write the right tests that cover the most important cases, put down errors that help the user in the right places, even it is banal not to interrupt the user's flow because of fixable non-critical errors._

## What tasks are we talking about?

Frontend develops applications and interfaces for end users, so we solve the tasks of these consumers.

When a person comes to us, **he wants to solve some of his pain or close a need.**

_The task of managers and analysts is to formulate this need, and implement developers taking into account the features of web development (loss of communication, backend error, typo, missed the cursor or finger)._

**This very goal, with which the user came, is the task of the developers.**

> _One small solved problem is a feature in the Feature-Sliced Design methodology — you need to cut the entire scope of project tasks into small goals._

## How does this affect development?

### Task decomposition

When a developer begins to implement a task, in order to simplify the understanding and support of the code, he mentally **cuts it into stages**:

* first _split into top-level entities_ and _implement them_,
* then these entities _split into smaller ones_
* and so on

_In the process of splitting into entities, the developer is forced to give them a name that would clearly reflect his idea and help to understand what task the code solves when reading the listing_
_At the same time, we do not forget that we are trying to help the user reduce pain or realize needs_

### Understanding the essence of the task

But to give a clear name to an entity, **the developer must know enough about its purpose**

* how is he going to use this entity,
* what part of the user's task does it implement, where else can this entity be applied,
* in what other tasks can it participate,
* and so on

It is not difficult to draw a conclusion: **while the developer will reflect on the name of entities within the framework of the methodology, he will be able to find poorly formulated tasks even before writing the code.**

> How to give a name to an entity if you do not understand well what tasks it can solve, how can you even divide a task into entities if you do not understand it well?

## How to formulate it?

**To formulate a task that is solved by features, you need to understand the task itself**, and this is already the responsibility of the project manager and analysts.

_The methodology can only tell the developer what tasks the product manager should pay close attention to._

> _@sergeysova: the Whole frontend is primarily a display of information, any component in the first turn, displays, and then the task "to show the user something" has no practical value._
>
> _Even without taking into account the specifics of the frontend can ask, "why do I have to show you", so you can continue to ask until't get out of pain or the need of the consumer._

As soon as we were able to get to the basic needs or pains, we can go back and figure out **how exactly your product or service can help the user with his goals**

Any new task in your tracker is aimed at solving business problems, and the business tries to solve the user's tasks at the same time earning money on it. This means that each task has certain goals, even if they are not spelled out in the description text.

_**The developer must clearly understand what goal this or that task is pursuing**, but not every company can afford to build processes perfectly, although this is a separate conversation, nevertheless, the developer may well "ping" the right managers himself to find out this and do his part of the work effectively._

## And what is the benefit?

Now let's look at the whole process from beginning to end.

### 1. Understanding user tasks

When a developer understands his pain and how the business closes them, he can offer solutions that are not available to the business due to the specifics of web development.

> But of course, all this can work only if the developer is not indifferent to what he is doing and for what, otherwise _why then the methodology and some approaches?_

### 2. Structuring and ordering

With the understanding of tasks comes **a clear structure both in the head and in the tasks along with the code**

### 3. Understanding the feature and its components

**One feature is one useful functionality for the user**

* When several features are implemented in one feature, this is **a violation of borders**
* The feature can be indivisible and growing - **and this is not bad**
* **Bad** - when the feature does not answer the question _"What is the business value for the user?"_
* There can be no "map-office" feature
  * But `booking-meeting-on-the-map`, `search-for-an-employee`, `change-of-workplace` - **yes**

> _@sergeysova: The point is that the feature contains only code that implements the functionality itself_, without unnecessary details and internal solutions (ideally)*
>
> *Open the feature code **and see only what relates to the task** - no more*

### 4. Profit

Business very rarely turns its course radically in the other direction, which means **the reflection of business tasks in the frontend application code is a very significant profit.**

_Then you don't have to explain to each new team member what this or that code does, and in general why it was added - **everything will be explained through the business tasks that are already reflected in the code.**_

> What is called ["Business Language" in Domain Driven Development][ext-ubiq-lang]

---

## Back to reality

If business processes are understood and good names are given at the design stage - _then it is not particularly problematic to transfer this understanding and logic to the code._

**However, in practice**, tasks and functionality are usually developed "too" iteratively and (or) there is no time to think through the design.

**As a result, the feature makes sense today, and if you expand this feature in a month, you can rewrite the gender of the project.**

> *[[From the discussion][disc-src]]: The developer tries to think 2-3 steps ahead, taking into account future wishes, but here he rests on his own experience*
>
> _Burns experience engineer usually immediately looking 10 steps ahead, and understand where one feature to divide and combine with the other_
>
> _But sometimes that comes the task which had to face the experience, and nowhere to take the understanding of how literacy to decompose, with the least unfortunate consequences in the future_

## The role of methodology

**The methodology helps to solve the problems of developers, so that it is easier to solve the problems of users.**

There is no solution to the problems of developers only for the sake of developers

But in order for the developer to solve his tasks, **you need to understand the user's tasks** - on the contrary, it will not work

### Methodology requirements

It becomes clear that you need to identify at least two requirements for **Feature-Sliced Design**:

1. The methodology should tell **how to create features, processes and entities**

    * Which means it should clearly explain _how to divide the code between them_, which means that the naming of these entities should also be laid down in the specification.

2. The methodology should help the architecture **[easily adapt to the changing requirements of the project][refs-arch--adaptability]**

## See also

* [(Post) Stimulation for a clear formulation of tasks (+ discussion)][disc-src]
    > _**The current article** is an adaptation of this discussion, you can read the full uncut version at the link_
* [(Discussion) How to break the functionality and what it is][tg-src]
* [(Article) "How to better organize your applications"][ext-medium]

[refs-arch--adaptability]: architecture#adaptability

[ext-medium]: https://alexmngn.medium.com/how-to-better-organize-your-react-applications-2fd3ea1920f1
[disc-src]: https://t.me/sergeysova/318
[tg-src]: https://t.me/atomicdesign/18972
[ext-ubiq-lang]: https://thedomaindrivendesign.io/developing-the-ubiquitous-language
