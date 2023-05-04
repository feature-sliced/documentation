import React from "react";
import Layout from "@theme/Layout";
import { translate } from "@docusaurus/Translate";
import { ExampleCard } from "@site/src/entities/example";

import { examples } from "./_config";

const TITLE = translate({ id: "pages.showcase.title" });
const DESCRIPTION = translate({ id: "pages.showcase.subtitle" });
const EDIT_URL =
    "https://github.com/feature-sliced/documentation/blob/master/src/pages/examples/_config.ts";
const EXAMPLES_URL = "https://github.com/feature-sliced/examples";

function ExamplesPage() {
    return (
        // FIXME: [FSDCUR] Resolve types and OG metadata
        // @ts-ignore
        <Layout title={TITLE} description={DESCRIPTION}>
            <main className="container margin-vert--lg">
                <div className="text--center">
                    <h1>{TITLE}</h1>
                    <p>{DESCRIPTION}</p>
                    <div className="button-group">
                        <a
                            className="button button--primary"
                            href={EDIT_URL}
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            🙏 {translate({ id: "pages.showcase.add_me.title" })}
                        </a>
                        <a
                            className="button button--secondary"
                            href={EXAMPLES_URL}
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            {translate({ id: "pages.showcase.repo.title" })}
                        </a>
                    </div>
                    <div className="margin-top--sm">
                        <a href="/versions">{translate({ id: "pages.showcase.versions" })}</a>
                    </div>
                </div>
                <section className="container margin-top--lg">
                    <div className="margin-top--lg">
                        <div className="row">
                            {examples.map((data) => (
                                <article key={data.title} className="col col--4 margin-bottom--lg">
                                    <ExampleCard data={data} />
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </Layout>
    );
}

export default ExamplesPage;
