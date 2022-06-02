import React from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
// eslint-disable-next-line import/no-unresolved
import Layout from "@theme/Layout";
import { translate } from "@docusaurus/Translate";

import { Row } from "@site/src/shared/ui/row";
import styles from "./styles.module.scss";

// TODO: Add i18n
// <h1>{translate({ id: "pages.nav.title" })}</h1>

const BrandingPage = () => {
    return (
        <Layout
            title="Branding Guidelines"
            description="Feature Sliced Branding Guidelins help page"
        >
            <main className={clsx("container", styles.root)}>
                <h1>Branding Guidelines</h1>
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat repudiandae
                    repellat itaque! Architecto dolore alias nisi delectus aliquid facere nemo,
                    molestiae iure. Vero exercitationem totam autem? Error nihil voluptate cum.
                </p>
                <p>
                    <b>Few examples:</b> Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolor magnam debitis architecto fuga dignissimos veritatis in labore
                    consequuntur accusantium et dolorem, repudiandae, quas at earum reiciendis
                    mollitia eligendi dolorum quod.
                </p>
                <section className={styles.section}>
                    <h2>Logo</h2>
                    <p>Primary * Monogram * PressKit * Scale</p>
                </section>
                <section className={styles.section}>
                    <h2>Emojii</h2>
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem
                        officiis inventore neque, ea ipsam doloremque assumenda illo illum at
                        mollitia harum repellendus, eaque maiores veniam molestiae rerum facilis
                        voluptates. At!
                    </p>
                </section>
                <section className={styles.section}>
                    <h2>Palette</h2>
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem
                        officiis inventore neque, ea ipsam doloremque assumenda illo illum at
                        mollitia harum repellendus, eaque maiores veniam molestiae rerum facilis
                        voluptates. At!
                    </p>
                </section>
                <section className={styles.section}>
                    <h2>Font</h2>
                    <p>Font + Title</p>
                </section>
                <section className={styles.section}>
                    <h2>Do and Don't</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, explicabo
                        officia ratione tenetur voluptatem laboriosam amet rerum sint quibusdam
                        corporis!
                    </p>
                </section>
            </main>
        </Layout>
    );
};

export default BrandingPage;
