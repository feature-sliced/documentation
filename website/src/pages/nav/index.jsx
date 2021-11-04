import React from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
// eslint-disable-next-line import/no-unresolved
import Layout from "@theme/Layout";
import { translate } from "@docusaurus/Translate";

import { Row } from "@site/src/shared/ui/row";
import styles from "./styles.module.css";

const NavPage = () => {
    const { legacyRoutes } = useDocusaurusContext().siteConfig.customFields;

    return (
        <Layout
            title="Versions"
            description="Feature Sliced Versions page listing all documented site versions"
        >
            <main className={clsx("container", styles.root)}>
                <h1>{translate({ id: "pages.nav.title" })}</h1>
                <section className={styles.section}>
                    <h2>{translate({ id: "pages.nav.legacy.title" })}</h2>
                    <p>{translate({ id: "pages.nav.legacy.details" })}</p>
                    {legacyRoutes.map((route) => (
                        <Row
                            key={route.from}
                            title={route.title}
                            to={route.to}
                            description={
                                <div className={styles.route}>
                                    <div>
                                        <b>old</b>: {route.from}
                                    </div>
                                    <div>
                                        <b>new</b>: {route.to}
                                    </div>
                                </div>
                            }
                        />
                    ))}
                </section>
            </main>
        </Layout>
    );
};

export default NavPage;
