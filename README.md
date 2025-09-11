<a href="https://discord.gg/S8MzWTUsmp" title="Discord"><img align="right" alt="Discord" src="./.github/assets/README-discord.svg" height="80" /></a><a href="https://t.me/feature_sliced" title="Telegram"><img align="right" alt="Telegram" src="./.github/assets/README-telegram.svg" height="80" /></a><a href="https://feature-sliced.github.io/documentation/"><img align="right" alt="Website" src="./.github/assets/README-website.svg" height="80" /></a><img alt="Feature-Sliced Design, an architectural methodology for frontend projects" src="./.github/assets/README-banner-light.svg#gh-light-mode-only" height="80" /><img alt="Feature-Sliced Design, an architectural methodology for frontend projects" src="./.github/assets/README-banner-dark.svg#gh-dark-mode-only" height="80" />

**Feature-Sliced Design** (FSD) is an architectural methodology for scaffolding front-end applications. Simply put, it's a compilation of rules and conventions on organizing code. The main purpose of this methodology is to make the project more understandable and structured in the face of ever-changing business requirements.

This methodology is not tied to a particular stack — it can be used for web or native applications.

## Advantages

- **Uniformity**  
  The code is organized by scope of influence (layers), by domain (slices), and by technical purpose (segments).  
  This creates a standardized architecture that is easy to comprehend for newcomers.

- **Controlled reuse of logic**  
  Each architectural component has its purpose and predictable dependencies.  
  This keeps a balance between following the **DRY** principle and adaptation possibilities. 

- **Stability in face of changes and refactoring**  
  A module on a particular layer cannot use other modules on the same layer, or the layers above.  
  This enables isolated modifications without unforeseen consequences.

- **Orientation to business and users needs**  
  When the app is split into business domains, you can navigate the code to discover and deeper understand all the project features.

## Show off

To show off that your project uses FSD, you can use the GitHub topic `feature-sliced` and one of the following badges:

[![Feature-Sliced Design][shields-fsd-white]](https://feature-sliced.github.io/documentation/) [![Feature-Sliced Design][shields-fsd-pain]](https://feature-sliced.github.io/documentation/) [![Feature-Sliced Design][shields-fsd-domain]](https://feature-sliced.github.io/documentation/) [![Feature-Sliced Design][shields-fsd-feature]](https://feature-sliced.github.io/documentation/)

[shields-fsd-white]: https://img.shields.io/badge/Feature--Sliced-Design?style=for-the-badge&labelColor=262224&color=F2F2F2&logoWidth=10&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAaCAYAAAC3g3x9AAAACXBIWXMAAALFAAACxQGJ1n/vAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA/SURBVHgB7dKxCgAgCIThs/d/51JoNQIdDrxvqMXlR4FmFs92KDIX/wI7JSdDN+eHtkxIycnQvMNW8hN/crsDc5QgGX9NvT0AAAAASUVORK5CYII=

[shields-fsd-pain]: https://img.shields.io/badge/Feature--Sliced-Design?style=for-the-badge&labelColor=262224&color=F2F2F2&logoWidth=10&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAaCAYAAAC3g3x9AAAACXBIWXMAAALFAAACxQGJ1n/vAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABHSURBVHgB7dKxCQAgDETR08ZNHNBBHNBNrBQFuyCCKQK5V6QMfBJAWVij5zLwKbW6d0VYx2TZyXnBKxvEZJnDx2bylf1kdRM6tiAZsruQ/QAAAABJRU5ErkJggg==

[shields-fsd-domain]: https://img.shields.io/badge/Feature--Sliced-Design?style=for-the-badge&color=F2F2F2&labelColor=262224&logoWidth=10&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAaCAYAAAC3g3x9AAAACXBIWXMAAALFAAACxQGJ1n/vAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABISURBVHgB7dKxCQAgDETR0w2cws0cys2cwhEUBbsggikCuVekDHwSQFlYo7Q+8KnmtHdFWMdk2cl5wSsbxGSZw8dm8pX9ZHUTMBUgGU2F718AAAAASUVORK5CYII=

[shields-fsd-feature]: https://img.shields.io/badge/Feature--Sliced-Design?style=for-the-badge&labelColor=262224&color=F2F2F2&logoWidth=10&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAaCAYAAAC3g3x9AAAACXBIWXMAAALFAAACxQGJ1n/vAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABISURBVHgB7dKxCQAgDETR00EcwYEc0IEcwUUUBbsggikCuVekDHwSQFlYo/Y88KmktndFWMdk2cl5wSsbxGSZw8dm8pX9ZHUTdIYgGbPdU2QAAAAASUVORK5CYII=

<details><summary>Code snippet</summary>

```markdown
White: 
[![Feature-Sliced Design][shields-fsd-white]](https://feature-sliced.github.io/documentation/)

[shields-fsd-white]: https://img.shields.io/badge/Feature--Sliced-Design?style=for-the-badge&labelColor=262224&color=F2F2F2&logoWidth=10&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAaCAYAAAC3g3x9AAAACXBIWXMAAALFAAACxQGJ1n/vAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA/SURBVHgB7dKxCgAgCIThs/d/51JoNQIdDrxvqMXlR4FmFs92KDIX/wI7JSdDN+eHtkxIycnQvMNW8hN/crsDc5QgGX9NvT0AAAAASUVORK5CYII=

----

Pain (red):
[![Feature-Sliced Design][shields-fsd-pain]](https://feature-sliced.github.io/documentation/)

[shields-fsd-pain]: https://img.shields.io/badge/Feature--Sliced-Design?style=for-the-badge&labelColor=262224&color=F2F2F2&logoWidth=10&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAaCAYAAAC3g3x9AAAACXBIWXMAAALFAAACxQGJ1n/vAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABHSURBVHgB7dKxCQAgDETR08ZNHNBBHNBNrBQFuyCCKQK5V6QMfBJAWVij5zLwKbW6d0VYx2TZyXnBKxvEZJnDx2bylf1kdRM6tiAZsruQ/QAAAABJRU5ErkJggg==

----

Domain (blue):
[![Feature-Sliced Design][shields-fsd-domain]](https://feature-sliced.github.io/documentation/)

[shields-fsd-domain]: https://img.shields.io/badge/Feature--Sliced-Design?style=for-the-badge&color=F2F2F2&labelColor=262224&logoWidth=10&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAaCAYAAAC3g3x9AAAACXBIWXMAAALFAAACxQGJ1n/vAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABISURBVHgB7dKxCQAgDETR0w2cws0cys2cwhEUBbsggikCuVekDHwSQFlYo7Q+8KnmtHdFWMdk2cl5wSsbxGSZw8dm8pX9ZHUTMBUgGU2F718AAAAASUVORK5CYII=

----

Feature (green):
[![Feature-Sliced Design][shields-fsd-feature]](https://feature-sliced.github.io/documentation/)

[shields-fsd-feature]: https://img.shields.io/badge/Feature--Sliced-Design?style=for-the-badge&labelColor=262224&color=F2F2F2&logoWidth=10&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAaCAYAAAC3g3x9AAAACXBIWXMAAALFAAACxQGJ1n/vAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABISURBVHgB7dKxCQAgDETR00EcwYEc0IEcwUUUBbsggikCuVekDHwSQFlYo/Y88KmktndFWMdk2cl5wSsbxGSZw8dm8pX9ZHUTdIYgGbPdU2QAAAAASUVORK5CYII=
```

</details>

## How can I help?

- 🍰 Use the methodology in your projects and spread the word
- ⭐ Star us on GitHub
- 💬 Join our [Discord](https://discord.gg/S8MzWTUsmp) or [Telegram](https://t.me/feature_sliced) and share your experience or ask questions
- 📝 Suggest improvements to the documentation through PRs

<div align="center">

[![discord](static/img/social/discord.png)](https://discord.gg/S8MzWTUsmp "Discord")
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
[![tg](static/img/social/tg.png)](https://t.me/feature_sliced "Telegram chat")
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
[![twitter](static/img/social/twitter.png)](https://twitter.com/feature_sliced "Twitter")
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<!-- [![open-collective](static/img/social/opencollective.png)](https://opencollective.com/feature-sliced "Open Collective")
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
-->[![youtube](static/img/social/youtube.png)](https://www.youtube.com/c/FeatureSlicedDesign "YouTube")
</div>
