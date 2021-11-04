import React from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
// eslint-disable-next-line import/no-unresolved
import Layout from "@theme/Layout";
import { translate } from "@docusaurus/Translate";

import { Row } from "@site/src/shared/ui/row";
import styles from "./styles.module.css";

const NavPage = () => {
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
                    <GroupItems />
                </section>
            </main>
        </Layout>
    );
};

const GroupItems = () => {
    const { legacyRoutes } = useDocusaurusContext().siteConfig.customFields;

    return (
        <div>
            {legacyRoutes.map((routesBatch) => (
                <div key={routesBatch.group} className={styles.group}>
                    <h3>{routesBatch.group}</h3>
                    <p className={styles.groupDetails}>⚡️ {routesBatch.details}</p>
                    <div className={styles.groupItems}>
                        {routesBatch.children.map((route) => (
                            <Row
                                key={route.from}
                                className={styles.groupItemsRow}
                                title={route.title}
                                to={route.to}
                                description={
                                    <div className={styles.route}>
                                        <div>
                                            <b>old</b>: {flattenFrom(route.from)}
                                        </div>
                                        <div>
                                            <b>new</b>: {route.to}
                                        </div>
                                    </div>
                                }
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

const flattenFrom = (value) => {
    if (typeof value === "string") return value;
    // => isArray
    return value.join("; ");
};

export default NavPage;
