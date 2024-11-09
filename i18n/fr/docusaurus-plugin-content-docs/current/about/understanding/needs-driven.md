---
sidebar_position: 2
---

# Besoins motivés

:::note TL;DR

— _Ne pouvez-vous pas formuler l'objectif que la nouvelle fonctionnalité résoudra ? Ou peut-être que le problème vient du fait que la tâche elle-même n'est pas formulée ? **L'idée est aussi que la méthodologie aide à extraire la définition problématique des tâches et des objectifs**_

— _Le projet ne vit pas dans un état statique – les exigences et les fonctionnalités changent constamment. Avec le temps, le code devient un "pâté", car au début, le projet a été conçu uniquement pour répondre aux premières impressions des souhaits. **Et la tâche d'une bonne architecture est également de s'affiner pour les conditions de développement changeantes.**_

:::

<!--TODO: Rendre chaque section plus indépendante plus tard -->
<!--TODO: Ajouter plus d'informations sur les exigences changeantes du projet -->

## Pourquoi ?

Pour choisir un nom clair pour une entité et comprendre ses composants, **il faut bien comprendre quelle tâche sera résolue avec tout ce code.**

> _@sergeysova : Pendant le développement, nous essayons de donner à chaque entité ou fonction un nom qui reflète clairement les intentions et la signification du code exécuté._

Après tout, sans comprendre la tâche, il est impossible d'écrire les bons tests qui couvrent les cas les plus importants, de mettre des erreurs qui aident l'utilisateur aux bons endroits, voire de ne pas interrompre le flux de l'utilisateur à cause d'erreurs non critiques mais réparables.

## De quelles tâches parlons-nous ?

Le frontend développe des applications et des interfaces pour les utilisateurs finaux, nous résolvons donc les tâches de ces consommateurs.

Lorsqu'une personne vient vers nous, **elle veut résoudre une de ses douleurs ou satisfaire un besoin.**

_Le rôle des gestionnaires et des analystes est de formuler ce besoin, et celui des développeurs de le mettre en œuvre en tenant compte des spécificités du développement web (perte de communication, erreur backend, faute de frappe, curseur ou doigt manqué)._

**Cet objectif, avec lequel l'utilisateur est venu, est la tâche des développeurs.**

> _Une petite problématique résolue est une fonctionnalité dans la méthodologie Feature-Sliced Design – vous devez découper l'ensemble des tâches du projet en petits objectifs._

## Comment cela affecte-t-il le développement ?

### Décomposition des tâches

Lorsqu'un développeur commence à implémenter une tâche, pour simplifier la compréhension et le support du code, il **la découpe mentalement en étapes** :

* d'abord, _séparer en entités de haut niveau_ et _les implémenter_,
* puis ces entités _les diviser en plus petites_ 
* et ainsi de suite

_Dans le processus de découpage en entités, le développeur est obligé de leur donner un nom qui reflète clairement son idée et aide à comprendre quelle tâche le code résout lorsqu'on lit la liste_
_En même temps, on n'oublie pas que nous essayons d'aider l'utilisateur à réduire la douleur ou réaliser des besoins_

### Comprendre l'essence de la tâche

Mais pour donner un nom clair à une entité, **le développeur doit en savoir suffisamment sur son objectif**

* comment va-t-il utiliser cette entité,
* quelle partie de la tâche de l'utilisateur implémente-t-elle, où cette entité peut-elle être appliquée ailleurs,
* dans quelles autres tâches peut-elle participer,
* et ainsi de suite

Il n'est pas difficile de tirer une conclusion : **tandis que le développeur réfléchira au nom des entités dans le cadre de la méthodologie, il pourra trouver des tâches mal formulées même avant d'écrire le code.**

> Comment donner un nom à une entité si vous ne comprenez pas bien quelles tâches elle peut résoudre, comment pouvez-vous même diviser une tâche en entités si vous ne la comprenez pas bien ?

## Comment la formuler ?

**Pour formuler une tâche résolue par des fonctionnalités, il faut comprendre la tâche elle-même**, et cela relève déjà de la responsabilité du chef de projet et des analystes.

_La méthodologie peut seulement indiquer au développeur quelles tâches le chef de produit doit examiner attentivement._

> _@sergeysova : Le frontend tout entier est avant tout un affichage d'informations, tout composant, au départ, affiche, et ensuite la tâche "montrer quelque chose à l'utilisateur" n'a pas de valeur pratique._
>
> _Même sans prendre en compte les spécificités du frontend, on peut demander "pourquoi dois-je te montrer ça ?", et on peut continuer à poser des questions jusqu'à ce qu'on sorte de la douleur ou du besoin du consommateur._

Dès que nous avons pu arriver aux besoins ou douleurs de base, nous pouvons revenir et réfléchir **à la manière exacte dont votre produit ou service peut aider l'utilisateur à atteindre ses objectifs**

Toute nouvelle tâche dans votre gestionnaire est destinée à résoudre des problèmes commerciaux, et l'entreprise essaie de résoudre les tâches de l'utilisateur tout en gagnant de l'argent avec. Cela signifie que chaque tâche a certains objectifs, même s'ils ne sont pas explicitement formulés dans le texte de description.

_**Le développeur doit comprendre clairement quel objectif cette ou cette tâche poursuit**, mais toutes les entreprises ne peuvent pas se permettre de construire des processus parfaitement, bien que cela soit un autre sujet, néanmoins, le développeur peut tout à fait "alerter" les bons gestionnaires pour découvrir cela et accomplir sa partie du travail de manière efficace._

## Et quel est l'avantage ?

Voyons maintenant le processus dans son ensemble.

### 1. Comprendre les tâches des utilisateurs

Lorsque le développeur comprend sa douleur et comment l'entreprise la résout, il peut proposer des solutions qui ne sont pas disponibles pour l'entreprise à cause des spécificités du développement web.

> Mais bien sûr, tout cela ne fonctionne que si le développeur n'est pas indifférent à ce qu'il fait et pourquoi, sinon _pourquoi alors la méthodologie et certaines approches ?_

### 2. Structuration et organisation

Avec la compréhension des tâches vient **une structure claire, à la fois dans la tête et dans les tâches ainsi que le code**

### 3. Compréhension de la fonctionnalité et de ses composants

**Une fonctionnalité est une utilité pour l'utilisateur**

* Lorsque plusieurs fonctionnalités sont implémentées dans une seule fonctionnalité, cela constitue **une violation des frontières**
* La fonctionnalité peut être indivisible et croissante - **et ce n'est pas mauvais**
* **Mauvais** - lorsqu'une fonctionnalité ne répond pas à la question _"Quelle est la valeur commerciale pour l'utilisateur ?"_
* Il ne peut y avoir de fonctionnalité "carte-bureau"
  * Mais `réservation-réunion-sur-carte`, `recherche-employé`, `changement-de-lieu-de-travail` - **oui**

> _@sergeysova : L'idée est que la fonctionnalité contient uniquement le code qui implémente la fonctionnalité elle-même_, sans détails inutiles et solutions internes (idéalement)*
>
> *Ouvrez le code de la fonctionnalité **et voyez uniquement ce qui se rapporte à la tâche** - rien de plus*

### 4. Profit

Les entreprises changent rarement de direction radicalement, ce qui signifie que **la réflexion des tâches commerciales dans le code de l'application frontend est un profit très significatif.**

_Ainsi, vous n'aurez pas à expliquer à chaque nouveau membre de l'équipe ce que fait tel ou tel code, et pourquoi il a été ajouté - **tout sera expliqué par les tâches commerciales déjà reflétées dans le code.**_

> Ce que l'on appelle ["Langage des Affaires" en Domain Driven Design][ext-ubiq-lang]

---

## Retour à la réalité

Si les processus commerciaux sont compris et de bons noms sont donnés dès la phase de conception - _alors il n'est pas particulièrement problématique de transférer cette compréhension et cette logique dans le code._

**Cependant, en pratique**, les tâches et les fonctionnalités sont généralement développées de manière "trop" itérative et (ou) il n'y a pas de temps pour réfléchir à la conception.

**Résultat**, la fonctionnalité a du sens aujourd'hui, et si vous étendez cette fonctionnalité dans un mois, vous pouvez réécrire le genre du projet.

> *[[De la discussion][disc-src]] : Le développeur essaie de penser 2-3 étapes à l'avance, en tenant compte des souhaits futurs, mais ici il se heurte à sa propre expérience*
>
> _L'ingénieur expérimenté essaie généralement de voir 10 étapes à l'avance, et comprend où une fonctionnalité peut être divisée et combinée avec une autre_
>
> _Mais parfois, il arrive qu'une tâche doive être confrontée à l'expérience, et il n'y a nulle part où prendre la compréhension de comment décomposer de manière judicieuse, avec les conséquences les moins malheureuses dans le futur._

## Le rôle de la méthodologie

**La méthodologie aide à résoudre les problèmes des développeurs, afin qu'ils puissent plus facilement résoudre les problèmes des utilisateurs.**

Il n'existe pas de solution aux problèmes des développeurs uniquement pour les développeurs.

Mais pour que le développeur résolve ses tâches, **il faut comprendre les tâches des utilisateurs** - sinon cela ne fonctionnera pas.

### Exigences méthodologiques

Il devient clair qu'il faut identifier au moins deux exigences pour **Feature-Sliced Design** :

1. La méthodologie doit indiquer **comment créer des fonctionnalités, des processus et des entités**

    * Ce qui signifie qu'elle doit expliquer clairement _comment diviser le code entre eux_, ce qui implique également que le nommage de ces entités doit être défini dans la spécification.

2. La méthodologie doit aider l'architecture à **[s'adapter facilement aux exigences changeantes du projet][refs-arch--adaptability]**

## Voir aussi

* [(Post) Stimulation pour une formulation claire des tâches (+ discussion)][disc-src]
    > _**L'article actuel** est une adaptation de cette discussion, vous pouvez lire la version complète sans coupures en suivant le lien_
* [(Discussion) Comment découper la fonctionnalité et ce que c'est][tg-src]
* [(Article) "Comment mieux organiser vos applications"][ext-medium]

[refs-arch--adaptability]: architecture#adaptability

[ext-medium]: https://alexmngn.medium.com/how-to-better-organize-your-react-applications-2fd3ea1920f1
[disc-src]: https://t.me/sergeysova/318
[tg-src]: https://t.me/atomicdesign/18972
[ext-ubiq-lang]: https://thedomaindrivendesign.io/developing-the-ubiquitous-language
