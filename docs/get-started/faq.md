# FAQ

info

You can ask your question in our [Telegram chat](https://t.me/feature_sliced), [Discord community](https://discord.gg/S8MzWTUsmp), and [GitHub Discussions](https://github.com/feature-sliced/documentation/discussions).

### Is there a toolkit or a linter?[​](#is-there-a-toolkit-or-a-linter "Direct link to heading")

Yes! We have a linter called [Steiger](https://github.com/feature-sliced/steiger) to check your project's architecture and [folder generators](https://github.com/feature-sliced/awesome?tab=readme-ov-file#tools) through a CLI or IDEs.

### Where to store the layout/template of pages?[​](#where-to-store-the-layouttemplate-of-pages "Direct link to heading")

If you need plain markup layouts, you can keep them in `shared/ui`. If you need to use higher layers inside, there are a few options:

* Perhaps you don't need layouts at all? If the layout is only a few lines, it might be reasonable to duplicate the code in each page rather than try to abstract it.
* If you do need layouts, you can have them as separate widgets or pages, and compose them in your router configuration in App. Nested routing is another option.

### What is the difference between a feature and an entity?[​](#what-is-the-difference-between-a-feature-and-an-entity "Direct link to heading")

An *entity* is a real-life concept that your app is working with. A *feature* is an interaction that provides real-life value to your app’s users, the thing people want to do with your entities.

For more information, along with examples, see the Reference page on [slices](/docs/reference/layers.md#entities).

### Can I embed pages/features/entities into each other?[​](#can-i-embed-pagesfeaturesentities-into-each-other "Direct link to heading")

Yes, but this embedding should happen in higher layers. For example, inside a widget, you can import both features and then insert one feature into another as props/children.

You cannot import one feature from another feature, this is prohibited by the [**import rule on layers**](/docs/reference/layers.md#import-rule-on-layers).

### What about Atomic Design?[​](#what-about-atomic-design "Direct link to heading")

The current version of the methodology does not require nor prohibit the use of Atomic Design together with Feature-Sliced Design.

For example, Atomic Design [can be applied well](https://t.me/feature_sliced/1653) for the `ui` segment of modules.

### Are there any useful resources/articles/etc. about FSD?[​](#are-there-any-useful-resourcesarticlesetc-about-fsd "Direct link to heading")

Yes! <https://github.com/feature-sliced/awesome>

### Why do I need Feature-Sliced Design?[​](#why-do-i-need-feature-sliced-design "Direct link to heading")

It helps you and your team to quickly overview the project in terms of its main value-bringing components. A standardized architecture helps to speed up onboarding and resolves debates about code structure. See the [motivation](/docs/about/motivation.md) page to learn more about why FSD was created.

### Does a novice developer need an architecture/methodology?[​](#does-a-novice-developer-need-an-architecturemethodology "Direct link to heading")

Rather yes than no

*Usually, when you design and develop a project in one person, everything goes smoothly. But if there are pauses in development, new developers are added to the team - then problems come*

### How do I work with the authorization context?[​](#how-do-i-work-with-the-authorization-context "Direct link to heading")

Answered [here](/docs/guides/examples/auth.md)
