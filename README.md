# [Feature Driven Architecture](https://www.notion.so/Feature-Driven-Architecture-dfe306d664ae4780bcf999ccdd15e532)

<img src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F8e5f7905-b3c0-4720-a9a4-37820e337acd%2Ffeatures_(1).jpg?table=block&id=dfe306d6-64ae-4780-bcf9-99ccdd15e532&width=3720&userId=1cb8fbb1-ebee-4a7d-9598-16e80bdc4be1&cache=v2" />

> Approach which help to define boundaries for a large application
According it we can flexibly adapt and maintain mutable functionality of app.

*There are multiple mentions and interpretations of `feature-driven` approach (see below)*

*This article contains common rules and principles.*

<details>
<summary>
  <a href="https://www.notion.so/Summary-Feature-Driven-Architecture-talk-b8609fd4452b41f499703c841e56b8e9">💥<b>By Oleg Isonen (kof) - from React Berlin Talk</b></a>
</summary>

- [YouTube Talk](https://www.youtube.com/watch?v=BWAeYuWFHhs)
- [github](https://github.com/kof/feature-driven-architecture)
- [github org](https://github.com/feature-driven)
- [Summary - "Feature Driven Architecture" talk](https://www.notion.so/Summary-Feature-Driven-Architecture-talk-b8609fd4452b41f499703c841e56b8e9)
</details>

<details>
<summary>MISC</summary>
  
- [FDD vs DDD](https://www.notion.so/Frontend-Architecture-2aee8b123a2540958526419267cf7b32)
- [**How to Organize Your React + Redux Codebase**](https://www.pluralsight.com/guides/how-to-organize-your-react-+-redux-codebase)
- [How to better organize your React applications?](https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1)
- [Why React developers should modularize their applications?](https://medium.com/@alexmngn/why-react-developers-should-modularize-their-applications-d26d381854c1)
- [A feature based approach to React development](https://ryanlanciaux.com/blog/2017/08/20/a-feature-based-approach-to-react-development/)
- [Feature Based Development](https://feature-u.js.org/cur/concepts.html#feature-based-development)
</details>
    

**UPD (Jan 2021)** Also, should be mentioned:

<details>
<summary>
  <a href="https://featureslices.dev/v0.1">Feature Slices</a>
</summary>

- [github](https://github.com/featureslices/featureslices.dev)
- [github org](https://github.com/featureslices)
- [telegram](https://t.me/feature_slices)
- [Atomic Design](https://atomicdesign.bradfrost.com/table-of-contents/)
  - [https://bradfrost.com/blog/post/extending-atomic-design/](https://bradfrost.com/blog/post/extending-atomic-design/)

- jsunderhood (twitter)
    - [https://twitter.com/jsunderhood/status/1277515984501460992](https://twitter.com/jsunderhood/status/1277515984501460992)
    - [https://twitter.com/jsunderhood/status/1277938445353091074](https://twitter.com/jsunderhood/status/1277938445353091074)
    - [https://twitter.com/jsunderhood/status/1278660547513327616](https://twitter.com/jsunderhood/status/1278660547513327616)
    - [https://twitter.com/jsunderhood/status/1278730782731894786](https://twitter.com/jsunderhood/status/1278730782731894786)
    - [https://twitter.com/jsunderhood/status/1279384660523601920](https://twitter.com/jsunderhood/status/1279384660523601920)
    - [https://twitter.com/jsunderhood/status/1279409800015642627](https://twitter.com/jsunderhood/status/1279409800015642627)
</details>
    
---

## [Benefits](https://www.notion.so/Summary-Feature-Driven-Architecture-talk-b8609fd4452b41f499703c841e56b8e9)

- **Discoverability -** discover how your software works
- **Work parallesisation** - to dev software by teams, not alone
- **Controlling shared abstractions -** controlling abstractions, for preventing bugs and controlling software
- **Refactoring -** we can be sure what user-facing functionality we will affect
- **AB Tests** - more controllable experiments, with quikly manipulating (many-ifs hell)
- **Integration tests** - other tests can't cover all app logic, but integration tests is difficult to create and maintain (more meaningful an easy way)

## Concepts
<!--TODO: add link anchors -->
<!--TODO: add sections (by <details/>)

- <span id="decentralization">[Decentralization](https://www.notion.so/Summary-Feature-Driven-Architecture-talk-b8609fd4452b41f499703c841e56b8e9)</span> - organize app by explicit abstractions, no interconnected monolith (app ⇒ pages ⇒ features ⇒ shared)

- **[Explicit sharing](https://www.notion.so/Summary-Feature-Driven-Architecture-talk-b8609fd4452b41f499703c841e56b8e9)** - explicit rules for managing shared (common used) modules
- **[Co-location](https://www.notion.so/Summary-Feature-Driven-Architecture-talk-b8609fd4452b41f499703c841e56b8e9)** - normalized structure for better project navigation (app, pages, features, shared)
- **[Decoupling & Isolation](https://www.notion.so/Summary-Feature-Driven-Architecture-talk-b8609fd4452b41f499703c841e56b8e9)** - every abstraction should be isolated at most
- **[Disposability](https://www.notion.so/Summary-Feature-Driven-Architecture-talk-b8609fd4452b41f499703c841e56b8e9)** - every abstraction should be optimized for remove, not modify

## App structure
```bash
└── src/
    ├── app/
    ├── features/
    ├── pages/
    └── shared/
```

## P.S. **FDA - not "silver bullet"**

There aren't lot projects examples that totally follow defined above rules.

Its caused by **very idealistic** but **hard for impl** principles

There is not one approved opinion how to do it (the same problem with DDD approach)
