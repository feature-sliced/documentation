# Migration from feature-slices v1

## Motivation

The original concept of feature-slices was announced in 2018.

Since then, many transformations of the methodology have taken place, but at the same time the basic principles were preserved:
- Using a standardized frontend project structure
- Splitting the application in the first place-according to business logic
- Use of isolated features to prevent implicit side effects and cyclic dependencies
- Using the Public API with a ban on climbing "into the insides" of the module

At the same time, in the previous version of the methodology, there were still weak points that
- Sometimes it leads to boilerplate code
- Sometimes it leads to excessive complication of the code base and non-obvious rules between abstractions
- Sometimes it leads to implicit architectural solutions, which prevented the project from being pulled up and new people from onboarding

## Migration reasons

### Transparency

The methodology (v2) offers more intuitive and more common abstractions and ways of separating logic among developers.
All this has an extremely positive effect on attracting new people, as well as studying the current state of the project, and distributing the business logic of the application.

### Flexibility

The methodology (v2) allows to distribute logic in a more flexible way:
- With the ability to refactor isolated parts from scratch
- With the ability to rely on the same abstractions, but without unnecessary interweaving of dependencies
- With simpler requirements for the location of the new module (layer => slice => segment)

### Ecosystem

At the moment, the core-team is actively working on the latest (v2) version of the methodology

So it is for her:
- there will be more described cases / problems
- there will be more guides on the application
- there will be more real examples
- in general, there will be more documentation for onboarding new people and studying the concepts of the methodology
- the toolkit will be developed in the future to comply with the concepts and conventions on architecture

```ts
const sendMessageFx = createEffect(async (params: {text: string}) => {
    // ...
    return 'ok'
})
// sendMessageFx has type Effect<{text: string}, string>

const sendWarningFx = createEffect<{warn: string}, string>(async ({warn}) => {
    // ...
    return 'ok'
})
// sendWarningFx has type Effect<{warn: string}, string>
```

Of course, there will be user support for the first version as well - but the latest version is still a priority for us
In the future, with the next major updates, you will still have access to the current version (v2) of the methodology, without risks for your teams and projects

## Changelog

### Layers hierarchy

### Shared layer

### Entities and processes

### Naming

### Low coupling rules

## See also

- [Notes from the report "React SPB Meetup #1"][ext-tg-spb]
- [React Berlin Talk - Oleg Isonen "Feature Driven Architecture"][ext-kof-fdd]
- [Comparison with v1 (community-chat)](https://t.me/feature_sliced/493)
- [New ideas v2 with explanations (atomicdesign-chat)][ext-tg-v2-draft]
- [Discussion of abstractions and naming for the new version of the methodology (v2)](https://github.com/feature-sliced/documentation/discussions/31)

[refs-low-coupling]: /docs/reference/isolation/coupling-cohesion
[refs-adaptability]: /docs/about/understanding/naming

[ext-v1]: https://featureslices.dev/v1.0.html
[ext-tg-spb]: https://t.me/feature_slices
[ext-fdd]: https://github.com/feature-sliced/documentation/tree/rc/feature-driven
[ext-fdd-issues]: https://github.com/kof/feature-driven-architecture/issues
[ext-v2]: https://github.com/feature-sliced/documentation
[ext-kof]: https://github.com/kof
[ext-kof-fdd]: https://www.youtube.com/watch?v=BWAeYuWFHhs
[ext-tg-v2-draft]: https://t.me/atomicdesign/18708
