---
sidebar_position: 2
---

# ニーズの理解と課題の定義について

:::note TL;DR

— _新しい機能が解決する目標を明確にできませんか？それとも、問題はタスク自体が明確にされていないことにありますか？**FSDは、問題の定義や目標を引き出す手助けをすることも目的にしています。**_

— _プロジェクトは静的に存在するわけではなく、要件や機能は常に変化しています。プロジェクトは最初の要望のスナップショットのみに基づいて設計されているため、時間が経つにつれて、コードは混沌としてしまいます。**良いアーキテクチャの課題の一つは、変化する開発条件に対応できるようにすることです。**_

:::

<!--TODO: 各セクションを後でより独立させる -->
<!--TODO: プロジェクトの変化する要件に関する情報を追加 -->

## なぜ？ {#why}

エンティティの明確な名前を選び、その構成要素を理解するためには、**コードが解決する課題を明確に理解する必要があります。**

> _@sergeysova: 開発中、私たちは各エンティティや機能に、その意図や意味を明確に反映する名前を付けようとしている。_

_課題を理解しなければ、重要なケースをカバーする正しいテストを書くことも、ユーザーに適切な場所でエラーを表示することもできず、単純にユーザーのフローを中断することにもなってしまいます。_

## どのような課題についての話？ {#what-tasks-are-we-talking-about}

フロントエンドは、エンドユーザーのためのアプリケーションやインターフェースを開発しているため、私たち開発者はその消費者の課題を解決しています。

私たちのもとに誰かが来るとき、**その人は自分の悩みを解決したり、ニーズを満たしたりしてほしいのです。**

_マネージャーとアナリストの仕事はこのニーズを定義することです。開発者の仕事はウェブ開発の特性（接続の喪失、バックエンドのエラー、タイプミス、カーソルや指の操作ミス）を考慮して、そのニーズを実現することです。_

**ユーザーが持ってきた目的こそが、開発者の課題です。**

> _小さな解決された課題が、Feature-Sliced Designの設計方法論におけるfeatureではあります。プロジェクト課題のスコープを小さな目標に分割する必要があります。_

## これが開発にどのように影響するのか？ {#how-does-this-affect-development}

### 課題（タスク）の分解 {#task-decomposition}

開発者がタスクを実装し始めるとき、理解の簡素化とコードメンテナンスのために、**タスクを段階に分けます**。

- まずは、上位レベルのエンティティに分けて、それを実装する
- 次に、これらのエンティティをより小さく分ける
- そしてさらに続ける

_エンティティを分解する過程で、開発者はそれに明確に意図を反映した名前を付ける必要があり、エンティティの一覧表を読む際にそのコードが解決する課題を理解するのに役立ちます。_

この際、ユーザーの悩みを軽減したり、ニーズを実現したりするユーザーへの手助けをすることを忘れないように心がけましょう。

### 課題の本質を理解する {#understanding-the-essence-of-the-task}

エンティティに明確な名前を付けるためには、**開発者はその目的について十分に理解する必要があります。**

- エンティティをどのように使用するつもりなのか
- エンティティがユーザーの課題のどの部分を実現するのか、他にどこでこのエンティティを使用できるのか
- などなど

結論を出すのは難しくありません。**開発者がFSD枠内でのエンティティの名前を考えているとき、コードを書く前に不十分に定義された課題を見つけることができます。**

> どのようにエンティティに名前を付けるのか、もしそのエンティティが解決できる課題をよく理解していない場合、そもそもどうやって課題をエンティティに分解できるのか？

## どのように定義するのか？ {#how-to-formulate-it}

機能によって解決される課題を定義するためには、その課題自体を理解する必要があります。これはプロジェクトマネージャーやアナリストの責任範囲です。

_FSD設計方法論は、開発者に対して、プロダクトマネージャーが注目すべき課題を示唆することしかできません。_

> _@sergeysova: フロントエンドは、まず情報を表示するものである。どのコンポーネントも、まず何かを表示する。したがって、「ユーザーに何かを見せる」というタスクには実用的な価値がない。_

基本的なニーズや悩みを見つけたら、**あなたのプロダクトやサービスがどのようにユーザーの目標をサポートすることができるのかを考えます。**

タスクトラッカーの新しいタスクは、ビジネスの課題を解決することを目的としており、ビジネスは同時にユーザーの課題を解決し、利益を上げようとしています。したがって、説明文に明記されていなくても、各タスクには特定の目標が含まれています。

<b><i>開発者は、特定のタスクが追求する目的をはっきりと把握しておくべきです。</i></b>しかし、すべての会社がプロセスを完璧に構築できるわけではありません。

## その利益は何か？ {#and-what-is-the-benefit}

では、プロセス全体を最初から最後まで見てみましょう。

### 1. ユーザーの課題を理解する {#1-understanding-user-tasks}

開発者は、ユーザーの悩みとビジネスがその悩みをどのように解決するかを理解すると、ウェブ開発の特性によりビジネスには提供できない解決策を提案することができます。

> しかしもちろん、これは開発者が自分の行動や目的に無関心でない限り機能します。さもなければ、そもそもなぜFSDやアプローチが必要なのか？という疑問になってしまいます。

### 2. 構造化と整理 {#2-structuring-and-ordering}

課題を理解することで、**頭とコードの中で明確な構造が得られます。**

### 3. 機能とその構成要素を理解する {#3-understanding-the-feature-and-its-components}

**1つの機能は、ユーザーにとって1つの有用な機能性です。**

- 1つの機能に複数の機能性が実装されている場合、それは**境界の侵害**である。
- 機能は分割不可能で成長可能になる場合があるが、**それは悪くない。**
- **悪い**のは、機能が「ユーザーにとってのビジネス価値は何か？」という質問に答えられないことである。
  - 「オフィスの地図」という機能は存在できない。
  - しかし、「地図上の会議室の予約」、「従業員の検索」、「作業場所の変更」は**存在可能である。**

> _@sergeysova: 機能には、直接的にその機能を実現するコードだけが含まれるべきであり、余計な詳細や内部の解決策は含まれないべきである（理想的には）。_

> *機能のコードを開くと、**そのタスクに関連するものだけが見える**。それ以上は必要ない。*

### 4. Profit {#4-profit}

ビジネスはその方針を極めて稀にしか根本的に変えないため、**ビジネスのタスクをフロントエンドアプリケーションのコードに反映することは非常に大きな利点になれます。**

_そうすれば、チームの新しいメンバーにそのコードが何をするのか、なぜ追加されたのかを説明する必要がなくなります。**すべては、すでにコードに反映されているビジネスのタスクを通じて説明されているからです。**_

> [Domain Driven Developmentにおける「ビジネス言語」][ext-ubiq-lang]

---

## 現実に戻りましょう {#back-to-reality}

ビジネスプロセスが明確な意味を持ち、設計段階で良い名前が付けられている場合、_その理解と論理をコードに移すことはそれほど問題ではありません。_

<b>しかし実際には、</b>タスクや機能性は通常「過度に」反復的に進化し、（または）デザインを考える時間がありません。

**その結果、今日、機能は意味を持っていますが、1か月後にその機能を拡張する際には、プロジェクト全体を再構築する必要があるかもしれません。**

> *開発者は未来の要望を考慮しながら2〜3ステップ先を考えようとしますが、自分の経験に行き詰まってしまいます。*

> _経験豊富なエンジニアは通常、すぐに10ステップ先を見て、どの機能を分割するか、どの機能を他の機能と統合するかを理解しています。_

> _しかし、経験上遭遇したことのないタスクが来ることもあり、その場合、どのように機能を適切に分解し、将来的に悲惨な結果を最小限に抑えるかを理解する手段がありません。_

## FSDの役割 {#the-role-of-methodology}

**FSDは、開発者の問題を解決する手助けをし、ユーザーの問題を解決するのを容易にしています。**

開発者のためだけに課題を解決することはありません。

しかし、開発者が自分の課題を解決するためには、**ユーザーの課題を理解する必要があります**。逆は成り立ちません。

### FSDに対する要件 {#methodology-requirements}

明らかになるのは、**Feature-Sliced Design**のために少なくとも2つの要件を定義する必要があるということです。

1. FSD方法論は**フィーチャー、プロセス、エンティティを作成する方法**を説明する必要がある。
    - つまり、<i>それらの間でコードをどのように分割するか</i>を明確に説明する必要がある。これによりこれらのエンティティの命名も仕様に組み込まれるべきである。
2. FSD方法論は、アーキテクチャが<b>プロジェクトの変わりゆく要件にスムーズに対応できるようにするべき</b>である。

## 関連情報 {#see-also}

- [(記事) "How to better organize your applications"][ext-medium]

[refs-arch--adaptability]: architecture#adaptability

[ext-medium]: https://alexmngn.medium.com/how-to-better-organize-your-react-applications-2fd3ea1920f1
[ext-ubiq-lang]: https://thedomaindrivendesign.io/developing-the-ubiquitous-language