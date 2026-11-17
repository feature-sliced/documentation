# Contributing

First of all, thank you for taking the time to contribute to the project! 👍

## How can I help?

[issues]: https://github.com/feature-sliced/documentation/issues
[issues-new]: https://github.com/feature-sliced/documentation/issues/new
[pr]: https://github.com/feature-sliced/documentation/pulls
[pr-new]: https://github.com/feature-sliced/documentation/compare
[disc]: https://github.com/feature-sliced/documentation/discussions
[fork]: https://github.com/feature-sliced/documentation/fork
[actions]: https://github.com/feature-sliced/documentation/actions

<!-- Other emojis: 👁️ , ✍️ , 🔍 -->

- 📢 [Share feedback, ask and **discuss** anything][disc]
   > We will be glad to receive any feedback from you!
- 💡 [Notify about bugs, suggest improvements][issues-new]
   > If something specific doesn't work quite well for you or could be better - let us know!
- 💬 Rate & discuss [**issues**][issues]
   > Share your opinion, evaluate the problem identified by the author
- 🔩 Reproduce complex [**issues**][issues]
   > Some issues are difficult to reproduce
- 🛡️ Provide a review for [**pull requests**][pr]
   > Share your opinion and help us with the processing of other people's proposals
- ⚒️ Suggest your [own **pull-requests**!][pr-new]
   > Enhance the project with your own solutions

## Workflow

[self-review-article]: https://blog.beanbaginc.com/2014/12/01/practicing-effective-self-review/

1. [Fork][fork] the repository
2. Make your changes
   - If your change touches documentation content, keep the translations in sync — see [Synchronized documentation](#synchronized-documentation)
   - Make sure that **commits follow** the [Conventional Commits specification](https://www.conventionalcommits.org)
      > All this helps with the changelog formation and keeps the history of the project clean
      >
      > *It would also be useful to indicate in each commit (preferably in the body) the ID of the task in the format `#{ID}' (so that there is linking)*
   - Make sure that **all checks pass**

      ```sh
      $ npm run test
      # > Linting is not broken
      # > The build does not crash
      ```

   - To modify/add markdown tables, it is recommended to use ready-made services (for example [this](https://www.tablesgenerator.com/markdown_tables))
3. [Open your pull-request][pr-new] from *your forked branch* and specify related [issues][issues] (if any)
   - Before creating a PR do at least one [`self-review`][self-review-article] of your changes, to save the reviewers' time
   - Also make sure that you describe the problem being solved as clearly as possible (take care of the reviewer) in your PR
      > The more details you provide in the description, the better
      >
      > *You can get acquainted with [what pull-requests were made before you][pr]*
   - If everything is fine, you can ping someone from the core maintainers to speed things up
      > If you have any problems, you can temporarily convert your PR into a draft (see the panel on the right)
      >
      > Or mark the PR title with the prefix 'WIP:`

   - Make sure that the verification via **[CI][actions]** has passed for your PR
      > Our common goal is to reduce review costs and achieve consistency in the code base 🤙

## Synchronized documentation

The documentation is published in several languages. The English content in `src/content/docs/docs/` is the source of truth, and every translation mirrors its structure in a locale folder next to it (`ja/`, `kr/`, `ru/`, `tr/`, `uz/`, `vi/`, `zh/`).

When you add or edit a documentation page, please keep the locales in sync:

1. Apply your change to the English version first
2. Mirror it in the locales you are comfortable writing in
   > For example, if you speak Russian, update the same page under `src/content/docs/ru/docs/` in the same PR
3. For the locales you cannot update yourself, [open an issue][issues-new] that links to your PR and lists the affected pages, so translators can pick it up
   > This way no translation silently falls behind the original

Fixes that only concern a single translation (typos, wording) can touch just that locale folder — no synchronization needed.
