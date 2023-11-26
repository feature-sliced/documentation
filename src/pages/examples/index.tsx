import React from "react";
import Layout from "@theme/Layout";
import { translate } from "@docusaurus/Translate";
import { ExampleCard } from "@site/src/entities/example";

import { examples } from "./_config";

const TITLE = translate({ id: "pages.examples.title" });
const DESCRIPTION = translate({ id: "pages.examples.subtitle" });
const EDIT_URL =
    "https://github.com/feature-sliced/documentation/blob/master/src/pages/examples/_config.ts";
const EXAMPLES_URL = "https://github.com/feature-sliced/examples";

function ExamplesPage() {
    return (
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
                            🙏{" "}
                            {translate({ id: "pages.examples.add_me.title" })}
                        </a>
                        <a
                            className="button button--secondary"
                            href={EXAMPLES_URL}
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            {translate({ id: "pages.examples.repo.title" })}
                        </a>
                    </div>
                    <div className="margin-top--sm">
                        <a href="/versions">
                            {translate({ id: "pages.examples.versions" })}
                        </a>
                    </div>
                </div>
                <section className="container margin-top--lg">
                    <div className="margin-top--lg">
                        <div className="row">
                            {examples.map((data) => (
                                <article
                                    key={data.title}
                                    className="col col--4 margin-bottom--lg"
                                >
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
