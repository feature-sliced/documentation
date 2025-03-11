---
sidebar_position: 4
---

# Nommage

Les différents développeurs ont des expériences et des contextes variés, ce qui peut entraîner des malentendus au sein de l'équipe lorsque les mêmes entités sont appelées différemment. Par exemple :

- Les composants pour l'affichage peuvent être appelés "ui", "composants", "ui-kit", "vues", …
- Le code qui est réutilisé dans toute l'application peut être appelé "core", "shared", "app", …
- Le code de logique métier peut être appelé "store", "model", "state", …

## Nommage dans le Feature-Sliced Design {#naming-in-fsd}

La méthodologie utilise des termes spécifiques tels que :

- "app", "process", "page", "feature", "entity", "shared" en tant que noms de couches,
- "ui", "model", "lib", "api", "config" en tant que noms de segments.

Il est très important de s'en tenir à ces termes pour éviter toute confusion parmi les membres de l'équipe et les nouveaux développeurs rejoignant le projet. L'utilisation de noms standard aide également lorsqu'on demande de l'aide à la communauté.

## Conflits de Nommage {#when-can-naming-interfere}

Des conflits de nommage peuvent survenir lorsque les termes utilisés dans la méthodologie FSD se chevauchent avec les termes utilisés dans le domaine métier :

- `FSD#process` vs processus simulé dans une application,
- `FSD#page` vs page de journal,
- `FSD#model` vs modèle de voiture.

Par exemple, un développeur qui voit le mot "process" dans le code passera du temps supplémentaire à essayer de comprendre quel processus est désigné. De telles **collisions peuvent perturber le processus de développement**.

Lorsque le glossaire du projet contient des terminologies spécifiques à FSD, il est crucial de faire attention lorsque l'on discute de ces termes avec l'équipe et les parties prenantes non techniques.

Pour communiquer efficacement avec l'équipe, il est recommandé d'utiliser l'abréviation "FSD" pour préfixer les termes de la méthodologie. Par exemple, lorsqu'on parle d'un processus, on pourrait dire : "Nous pouvons mettre ce processus dans la couche FSD des fonctionnalités."

Inversement, lorsqu'on communique avec des parties prenantes non techniques, il est préférable de limiter l'utilisation de la terminologie FSD et de s'abstenir de mentionner la structure interne de la base de code.

## Voir aussi {#see-also}

- [(Discussion) Adaptabilité du nommage][disc-src]
- [(Discussion) Sondage sur le nommage des entités][disc-naming]
- [(Discussion) "processus" vs "flux" vs ...][disc-processes]
- [(Discussion) "modèle" vs "store" vs ...][disc-model]

[disc-model]: https://github.com/feature-sliced/documentation/discussions/68
[disc-naming]: https://github.com/feature-sliced/documentation/discussions/31#discussioncomment-464894
[disc-processes]: https://github.com/feature-sliced/documentation/discussions/20
[disc-src]: https://github.com/feature-sliced/documentation/discussions/16
