---
sidebar_position: 20
pagination_next: guides/index
---

# FAQ

:::info

Vous pouvez poser vos questions dans notre [chat Telegram][telegram], [communauté Discord][discord], et [Discussions GitHub][github-discussions].

:::

### Existe-t-il un kit d'outils ou un linter ?

Il existe une configuration officielle ESLint — [@feature-sliced/eslint-config][eslint-config-official], et un plugin ESLint — [@conarti/eslint-plugin-feature-sliced][eslint-plugin-conarti], créé par Aleksandr Belous, un membre de la communauté. Vous êtes invités à contribuer à ces projets ou à créer les vôtres !

### Où stocker la mise en page/le modèle des pages ?

Si vous avez besoin de modèles HTML simples, vous pouvez les conserver dans `shared/ui`. Si vous devez utiliser des couches supérieures à l'intérieur, plusieurs options s'offrent à vous :

- Peut-être n'avez-vous pas besoin de mises en page du tout ? Si la mise en page est courte, il peut être plus raisonnable de dupliquer le code dans chaque page plutôt que d'essayer de l'abstraire.
- Si vous avez besoin de mises en page, vous pouvez les traiter comme des widgets ou des pages séparées, et les composer dans la configuration de votre routeur dans l'application. Le routage imbriqué est également une option.

### Quelle est la différence entre une fonctionnalité et une entité ?

Une _entité_ est un concept réel avec lequel votre application interagit. Une _fonctionnalité_ est une interaction qui apporte de la valeur à vos utilisateurs, la chose que les gens veulent faire avec vos entités.

Pour plus d'informations, avec des exemples, consultez la page de référence sur les [slices][reference-entities].

### Puis-je intégrer des pages/fonctionnalités/entités les unes dans les autres ?

Oui, mais cette intégration doit se faire dans des couches supérieures. Par exemple, à l'intérieur d'un widget, vous pouvez importer les deux fonctionnalités et insérer l'une dans l'autre en tant que props/enfants.

Vous ne pouvez pas importer une fonctionnalité d'une autre fonctionnalité, cela est interdit par la [**règle d'importation sur les couches**][import-rule-layers].

### Qu'en est-il de l'Atomic Design ?

La version actuelle de la méthodologie ne nécessite ni n'interdit l'utilisation de l'Atomic Design avec le Feature-Sliced Design.

Par exemple, l'Atomic Design [peut être appliqué efficacement](https://t.me/feature_sliced/1653) pour le segment `ui` des modules.

### Existe-t-il des ressources/articles/etc. utiles sur FSD ?

Oui ! https://github.com/feature-sliced/awesome

### Pourquoi ai-je besoin de Feature-Sliced Design ?

Cela aide vous et votre équipe à avoir une vue d'ensemble rapide du projet en termes de ses composants principaux à valeur ajoutée. Une architecture standardisée permet de faciliter l'intégration des nouveaux membres et de résoudre les débats sur la structure du code. Consultez la page [motivation][motivation] pour en savoir plus sur la création de FSD.

### Un développeur novice a-t-il besoin d'une architecture/méthodologie ?

Plutôt oui que non

*Habituellement, lorsqu'un projet est conçu et développé par une seule personne, tout se passe bien. Mais si des pauses dans le développement se produisent, ou si de nouveaux développeurs rejoignent l'équipe, des problèmes surgissent.*

### Comment travailler avec le contexte d'autorisation ?

Réponse [ici](/docs/guides/examples/auth)

[import-rule-layers]: /docs/reference/layers#import-rule-on-layers
[reference-entities]: /docs/reference/layers#entities
[eslint-config-official]: https://github.com/feature-sliced/eslint-config
[eslint-plugin-conarti]: https://github.com/conarti/eslint-plugin-feature-sliced
[motivation]: /docs/about/motivation
[telegram]: https://t.me/feature_sliced
[discord]: https://discord.gg/S8MzWTUsmp
[github-discussions]: https://github.com/feature-sliced/documentation/discussions
