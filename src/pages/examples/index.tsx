import React from "react";
import Layout from "@theme/Layout";
import { translate } from "@docusaurus/Translate";
import { ExampleCard } from "@site/src/entities/example";

import { examples } from "./_config";

const TITLE = translate({ id: "pages.examples.title" });
const DESCRIPTION = translate({ id: "pages.examples.subtitle" });

function ExamplesPage() {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <main className="container margin-vert--lg">
        <div className="text--center">
          <h1>{TITLE}</h1>
          <p>{DESCRIPTION}</p>
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
