# Slices and segments

## Slices[​](#slices "Direct link to heading")

Slices are the second level in the organizational hierarchy of Feature-Sliced Design. Their main purpose is to group code by its meaning for the product, business, or just the application.

The names of slices are not standardized because they are directly determined by the business domain of your application. For example, a photo gallery might have slices `photo`, `effects`, `gallery-page`. A social network would require different slices, for example, `post`, `comments`, `news-feed`.

The layers Shared and App don't contain slices. That is because Shared should contain no business logic at all, hence has no meaning for the product, and App should contain only code that concerns the entire application, so no splitting is necessary.

### Zero coupling and high cohesion[​](#zero-coupling-high-cohesion "Direct link to heading")

Slices are meant to be independent and highly cohesive groups of code files. The graphic below might help to visualize the tricky concepts of *cohesion* and *coupling*:

![](/img/coupling-cohesion-light.svg#light-mode-only)![](/img/coupling-cohesion-dark.svg#dark-mode-only)

Image inspired by <https://enterprisecraftsmanship.com/posts/cohesion-coupling-difference/>

An ideal slice is independent from other slices on its layer (zero coupling) and contains most of the code related to its primary goal (high cohesion).

The independence of slices is enforced by the [import rule on layers](/docs/reference/layers.md#import-rule-on-layers):

> *A module (file) in a slice can only import other slices when they are located on layers strictly below.*

### Public API rule on slices[​](#public-api-rule-on-slices "Direct link to heading")

Inside a slice, the code could be organized in any way that you want. That doesn't pose any issues as long as the slice provides a good public API for other slices to use it. This is enforced with the **public API rule on slices**:

> *Every slice (and segment on layers that don't have slices) must contain a public API definition.*
>
> *Modules outside of this slice/segment can only reference the public API, not the internal file structure of the slice/segment.*

Read more about the rationale of public APIs and the best practices on creating one in the [Public API reference](/docs/reference/public-api.md).

### Slice groups[​](#slice-groups "Direct link to heading")

Closely related slices can be structurally grouped in a folder, but they should exercise the same isolation rules as other slices — there should be **no code sharing** in that folder.

![Features \&quot;compose\&quot;, \&quot;like\&quot; and \&quot;delete\&quot; grouped in a folder \&quot;post\&quot;. In that folder there is also a file \&quot;some-shared-code.ts\&quot; that is crossed out to imply that it\&#39;s not allowed.](/assets/images/graphic-nested-slices-b9c44e6cc55ecdbf3e50bf40a61e5a27.svg)

## Segments[​](#segments "Direct link to heading")

Segments are the third and final level in the organizational hierarchy, and their purpose is to group code by its technical nature.

There a few standardized segment names:

* `ui` — everything related to UI display: UI components, date formatters, styles, etc.
* `api` — backend interactions: request functions, data types, mappers, etc.
* `model` — the data model: schemas, interfaces, stores, and business logic.
* `lib` — library code that other modules on this slice need.
* `config` — configuration files and feature flags.

See the [Layers page](/docs/reference/layers.md#layer-definitions) for examples of what each of these segments might be used for on different layers.

You can also create custom segments. The most common places for custom segments are the App layer and the Shared layer, where slices don't make sense.

Make sure that the name of these segments describes the purpose of the content, not its essence. For example, `components`, `hooks`, and `types` are bad segment names because they aren't that helpful when you're looking for code.
