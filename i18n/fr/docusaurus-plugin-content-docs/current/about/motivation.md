---
sidebar_position: 2
---

# Motivation

L'idée principale de **Feature-Sliced Design** est de faciliter et de réduire le coût du développement de projets complexes et en évolution, basée sur [la combinaison des résultats de recherches, la discussion de l'expérience de divers développeurs][ext-discussions].

Évidemment, cela ne sera pas une solution miracle, et bien sûr, la méthodologie aura ses propres [limites d'applicabilité][refs-mission].

Néanmoins, il existe des questions légitimes concernant *la faisabilité d'une telle méthodologie dans son ensemble*.

:::note

Plus de détails [discutés dans la discussion][disc-src]

:::

## Pourquoi les solutions existantes ne suffisent-elles pas ?
<!--TODO: #existing-solutions -->
> Il s'agit généralement des arguments suivants :
>
> - *"Pourquoi avez-vous besoin d'une nouvelle méthodologie si vous avez déjà des approches et des principes de conception bien établis comme `SOLID`, `KISS`, `YAGNI`, `DDD`, `GRASP`, `DRY`, etc."*
> - *"Tous les problèmes sont résolus par une bonne documentation de projet, des tests et des processus structurés"*
> - *"Les problèmes ne surviendraient pas si tous les développeurs suivaient tous les principes mentionnés ci-dessus"*
> - *"Tout a été inventé avant vous, vous ne savez juste pas l'utiliser"*
> - *"Prenez \{FRAMEWORK_NAME\} - tout a déjà été résolu pour vous là-bas"*

### Les principes à eux seuls ne suffisent pas

**L'existence de principes à elle seule n'est pas suffisante pour concevoir une bonne architecture**

Tout le monde ne les connaît pas entièrement, encore moins les comprend et les applique correctement.

*Les principes de conception sont trop généraux et ne donnent pas de réponse spécifique à la question : "Comment concevoir la structure et l'architecture d'une application évolutive et flexible ?"*

### Les processus ne fonctionnent pas toujours

*Documentation / Tests / Processus* sont, bien sûr, bons, mais hélas, même avec un coût élevé pour ceux-ci - **ils ne résolvent pas toujours les problèmes posés par l'architecture et l'introduction de nouvelles personnes dans le projet**.

- Le temps d'entrée de chaque développeur dans le projet n'est pas considérablement réduit, car la documentation est souvent volumineuse / obsolète.
- Il faut constamment s'assurer que tout le monde comprend l'architecture de la même manière - cela nécessite également une énorme quantité de ressources.
- N'oublions pas le facteur de risque (bus-factor).

### Les frameworks existants ne peuvent pas être appliqués partout

- Les solutions existantes ont généralement un seuil d'entrée élevé, ce qui rend difficile la recherche de nouveaux développeurs.
- De plus, le choix de la technologie est souvent déjà déterminé avant que des problèmes sérieux ne surviennent dans le projet, il faut donc savoir "travailler avec ce qui est disponible" - **sans être lié à la technologie**.

> Q : *"Dans mon projet `React/Vue/Redux/Effector/Mobx/{YOUR_TECH}` - comment puis-je mieux construire la structure des entités et les relations entre elles ?"*

### En résumé

Nous obtenons des projets *"uniques comme des flocons de neige"*, chacun nécessitant une longue immersion de l'employé, et des connaissances qui seront probablement inutilisables sur un autre projet.

> @sergeysova : *"C'est exactement la situation qui existe actuellement dans notre domaine du développement frontend : chaque lead va inventer différentes architectures et structures de projet, alors qu'il n'est même pas garanti que ces structures passeront l'épreuve du temps. Résultat, un maximum de deux personnes peuvent développer le projet à part lui, et chaque nouveau développeur doit encore être immergé dans le projet."*

## Pourquoi les développeurs ont-ils besoin de la méthodologie ?

### Se concentrer sur les fonctionnalités métiers, pas sur les problèmes d'architecture

La méthodologie permet d'économiser des ressources sur la conception d'une architecture évolutive et flexible, tout en dirigeant l'attention des développeurs sur le développement de la fonctionnalité principale. En même temps, les solutions architecturales elles-mêmes sont standardisées d'un projet à l'autre.

*Une question séparée est que la méthodologie doit gagner la confiance de la communauté, afin qu'un autre développeur puisse s'y familiariser et s'en remettre pour résoudre les problèmes de son projet dans le temps qui lui est imparti.*

### Une solution éprouvée par l'expérience

La méthodologie est conçue pour les développeurs qui cherchent *une solution éprouvée pour concevoir une logique métier complexe*.

*Cependant, il est clair que la méthodologie repose généralement sur un ensemble de bonnes pratiques, d'articles abordant certains problèmes et cas durant le développement. Par conséquent, la méthodologie sera également utile pour les autres développeurs - ceux qui rencontrent des problèmes de développement et de conception.*

### Santé du projet

La méthodologie permettra de *résoudre et suivre les problèmes du projet à l'avance, sans nécessiter une énorme quantité de ressources.*

**La plupart du temps, la dette technique s'accumule au fil du temps, et la responsabilité de sa résolution incombe à la fois au lead et à l'équipe.**

La méthodologie permettra de *prévenir* les problèmes potentiels liés à l'évolutivité et au développement du projet à l'avance.

## Pourquoi une entreprise a-t-elle besoin d'une méthodologie ?

### Onboarding rapide

Avec la méthodologie, il est possible d'embaucher une personne pour le projet qui **est déjà familière avec cette approche, sans avoir à la former à nouveau.**

*Les gens commencent à comprendre et à contribuer au projet plus rapidement, avec des garanties supplémentaires pour trouver des personnes pour les prochaines itérations du projet.*

### Une solution éprouvée par l'expérience

Avec la méthodologie, l'entreprise obtient *une solution pour la plupart des problèmes qui surviennent lors du développement de systèmes.*

Puisque le plus souvent, une entreprise souhaite obtenir un cadre/solution qui résout la majorité des problèmes rencontrés pendant le développement du projet.

### Applicabilité pour les différentes étapes du projet

La méthodologie peut bénéficier au projet *tant au stade de la maintenance et du développement que pendant la phase de MVP.*

Oui, la chose la plus importante pour un MVP est *"les fonctionnalités, pas l'architecture posée pour l'avenir"*. Mais même dans des conditions de délais limités, connaître les bonnes pratiques de la méthodologie permet de *"faire avec moins de sang versé"*, lors de la conception de la version MVP du système, en trouvant un compromis raisonnable
(plutôt que de modéliser les fonctionnalités "au hasard").

*On peut dire la même chose à propos des tests.*

## Quand notre méthodologie n'est-elle pas nécessaire ?

- Si le projet aura une durée de vie courte.
- Si le projet n'a pas besoin d'une architecture maintenable.
- Si l'entreprise ne perçoit pas le lien entre la base de code et la vitesse de livraison des fonctionnalités.
- Si l'entreprise privilégie la fermeture rapide des commandes, sans maintenance future.

### Taille de l'entreprise

- **Petite entreprise** - a souvent besoin d'une solution prête à l'emploi et rapide. Ce n'est que lorsque l'entreprise grandit (au moins à une taille moyenne) qu'elle comprend qu'il faut consacrer du temps à la qualité et à la stabilité des solutions développées.
- **Entreprise de taille moyenne** - comprend généralement tous les problèmes liés au développement, et même si elle doit *"accélérer la course aux fonctionnalités"*, elle prend tout de même du temps pour améliorer la qualité, refactoriser et effectuer des tests (et bien sûr, pour avoir une architecture extensible).
- **Grande entreprise** - dispose généralement déjà d'un large public, d'un personnel et d'un ensemble de pratiques plus étendues, et probablement même de sa propre approche de l'architecture. Ainsi, l'idée de prendre celle de quelqu'un d'autre ne leur vient pas aussi souvent.

## Plans

La majeure partie des objectifs [est définie ici][refs-mission--goals], mais il vaut la peine de parler aussi de nos attentes concernant la méthodologie dans le futur.

### Combinaison d'expériences

Nous essayons maintenant de combiner toute notre expérience diversifiée de l'`équipe principale`, pour obtenir une méthodologie consolidée par la pratique.

Bien sûr, nous pourrions obtenir Angular 3.0 en résultat, mais il est bien plus important ici d'**examiner le problème même de la conception de l'architecture des systèmes complexes**.

*Et oui, nous avons des plaintes concernant la version actuelle de la méthodologie, mais nous voulons travailler ensemble pour parvenir à une solution unique et optimale (en tenant compte, entre autres, de l'expérience de la communauté).*

### Vie au-delà de la spécification

Si tout se passe bien, la méthodologie ne sera pas limitée uniquement à la spécification et à l'outil.

- Peut-être qu'il y aura des rapports, des articles.
- Il pourrait y avoir des `CODE_MODEs` pour les migrations vers d'autres technologies des projets écrits selon la méthodologie.
- Il est possible qu'au final nous puissions atteindre les mainteneurs de grandes solutions technologiques.
  - *Surtout pour React, comparé à d'autres frameworks - c'est le principal problème, car cela ne dit pas comment résoudre certains problèmes.*

## Voir aussi

- [(Discussion) Vous n'avez pas besoin d'une méthodologie ?][disc-src]
- [À propos de la mission de la méthodologie : objectifs et limitations][refs-mission]
- [Types de connaissances dans le projet][refs-knowledge]

[refs-mission]: /docs/about/mission
[refs-mission--goals]: /docs/about/mission#goals
[refs-knowledge]: /docs/about/understanding/knowledge-types

[disc-src]: https://github.com/feature-sliced/documentation/discussions/27
[ext-discussions]: https://github.com/feature-sliced/documentation/discussions
