---
sidebar_position: 1
---

# À propos de l'architecture

## Problèmes

En général, la conversation sur l'architecture est soulevée lorsque le développement s'arrête en raison de certains problèmes dans le projet.

### Bus-factor et Onboarding

Seule un nombre limité de personnes comprennent le projet et son architecture.

**Exemples :**

- *"C'est difficile d'ajouter une personne au développement"*
- *"Pour chaque problème, tout le monde a son propre avis sur la manière de contourner cela" (envions Angular)*
- *"Je ne comprends pas ce qui se passe dans ce gros morceau de monolithe"*

### Conséquences implicites et incontrôlées

De nombreux effets secondaires implicites pendant le développement/refactoring *("tout dépend de tout")*

**Exemples :**

- *"La fonctionnalité importe la fonctionnalité"*
- *"J'ai mis à jour le store d'une page, et la fonctionnalité a cessé de fonctionner sur l'autre"*
- *"La logique est dispersée dans toute l'application, et il est impossible de suivre où commence et où finit chaque chose"*

### Réutilisation incontrôlée de la logique

Il est difficile de réutiliser/modifier la logique existante

En même temps, il y a généralement [deux extrêmes](https://github.com/feature-sliced/documentation/discussions/14) :

- Soit la logique est écrite entièrement à partir de zéro pour chaque module *(avec des répétitions possibles dans le code existant)*
- Soit il y a une tendance à transférer tous les modules implémentés vers les dossiers `shared`, créant ainsi un grand dumping de modules *d'où beaucoup ne sont utilisés que dans un seul endroit*

**Exemples :**

- *"J'ai **N** implémentations de la même logique métier dans mon projet, pour lesquelles je paye toujours"*
- *"Il y a 6 composants différents de bouton/pop-up/... dans le projet"*
- *"Un dumping de helpers"*

## Exigences

Il semble donc logique de présenter les *exigences pour une architecture idéale :*

:::note

Chaque fois qu'il est dit "facile", cela signifie "relativement facile pour un large éventail de développeurs", car il est évident que [il ne sera pas possible de créer une solution idéale pour absolument tout le monde](/docs/about/mission#limitations)

:::

### Clarté

- Il devrait être **facile de maîtriser et d'expliquer** le projet et son architecture à l'équipe
- La structure devrait refléter les **valeurs réelles du projet**
- Il doit y avoir des **effets secondaires et des connexions explicites** entre les abstractions
- Il devrait être **facile de détecter la logique dupliquée** sans interférer avec les implémentations uniques
- Il ne devrait pas y avoir de **dispersion de la logique** dans tout le projet
- Il ne devrait pas y avoir **trop d'abstractions et de règles hétérogènes** pour une bonne architecture

### Contrôle

- Une bonne architecture devrait **accélérer la résolution des tâches, l'introduction de nouvelles fonctionnalités**
- Il devrait être possible de contrôler le développement du projet
- Il devrait être facile de **développer, modifier ou supprimer le code**
- La **décomposition et l'isolation** des fonctionnalités doivent être respectées
- Chaque composant du système doit être **facilement remplaçable et supprimable**
  - *[Pas besoin d'optimiser pour les changements][ext-kof-not-modification] - nous ne pouvons pas prédire l'avenir*
  - *[Mieux vaut optimiser pour la suppression][ext-kof-but-removing] - en fonction du contexte déjà existant*

### Adaptabilité

- Une bonne architecture doit être applicable **à la plupart des projets**
  - *Avec les solutions d'infrastructure existantes*
  - *À n'importe quelle étape du développement*
- Il ne doit pas y avoir de dépendance au framework ou à la plateforme
- Il doit être possible de **faire évoluer facilement le projet et l'équipe**, avec la possibilité de paralléliser le développement
- Il devrait être facile **de s'adapter aux exigences et circonstances changeantes**

## Voir aussi

- [(Conférence React Berlin) Oleg Isonen - Feature Driven Architecture][ext-kof]
- [(React SPB Meetup #1) Sergey Sova - Feature Slices][ext-slices-spb]
- [(Article) À propos de la modularisation des projets][ext-medium]
- [(Article) À propos de la séparation des préoccupations et de la structuration par fonctionnalités][ext-ryanlanciaux]

[ext-kof-not-modification]: https://youtu.be/BWAeYuWFHhs?t=1631
[ext-kof-but-removing]: https://youtu.be/BWAeYuWFHhs?t=1666

[ext-slices-spb]: https://t.me/feature_slices
[ext-kof]: https://youtu.be/BWAeYuWFHhs
[ext-medium]: https://alexmngn.medium.com/why-react-developers-should-modularize-their-applications-d26d381854c1
[ext-ryanlanciaux]: https://ryanlanciaux
