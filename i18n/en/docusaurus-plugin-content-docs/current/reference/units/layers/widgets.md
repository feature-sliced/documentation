---
sidebar_position: 5
---

# Widgets



Self-sufficient UI blocks emerged from the composition of lower-level units in order to provide a complex user experience.

> So far, no special best practices have been developed for this layer, so use it thoughtfully

## Examples

### Post Viewer

In this example, the widget uses a post template and composes it with user avatar thumbnail, also integrating certain features, which no entity is supposed to know about because of the scope of responsibility.

```tsx title=widgets/post-viewer/ui.tsx
import { SharePost } from "features/post/share";
import { LikePost } from "features/post/like";
import { PostCard } from "entities/post";
import { UserAvatar } from "entities/user";

export const PostViewer = ({ data, ... }: PostViewerProps) => (
    <PostCard
        before={<UserAvatar size="thumbnail" withPopup={true} />}

        ...

        extra={[
            <LikePost key="like" postId={data.id} ... />
            <SharePost key="share" postId={data.id} ... />
        ]}

        {...{ data }}
    />
);
```

### Application header

Some projects don't have a single header element for the entire application, so it may differ from page to page.
Also, there's also a question of the right place for application layout blocks in the project structure.

In such situations, `widgets` layer can help to solve the duplication problem.

```tsx title=widgets/app-header/ui.tsx
import { SearchBar } from "features/search";
import { Navigation } from "features/navigation";
import { Layout } from "shared/ui";

export const AppHeader = ({ theme, withSearch, withNav ...}: Props) => (
    <Layout.Header theme={theme}>
        {withSearch && <SearchBar ... />}
        {withNav && <Navigation ... />}
        ...
    <Layout.Header>
)
```

```tsx title=pages/some-page/ui.tsx
import { AppHeader } from "widgets/app-header";
import { Layout } from "shared/ui";

export const SomePage = () => (
    <Layout>
        {/* app header #1 on one page */}
        <AppHeader sticky={true} />

        <Layout.Content>
            ...
        </Layout.Content>
    </Layout>
)
```

```tsx title=pages/another-page/ui.tsx
import { AppHeader } from "widgets/app-header";
import { Layout } from "shared/ui";

export const AnotherPage = () => (
    <Layout>
        {/* app header #2 on another page */}
        <AppHeader extra={...} theme={...} />

        <Layout.Content>
            ...
        </Layout.Content>
    </Layout>
)
```
