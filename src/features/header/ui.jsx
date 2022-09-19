import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { translate } from "@docusaurus/Translate";
import styles from "./styles.module.scss";

// FIXME: rename to `Hero`, because its not header
export function Header() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <header className={clsx("hero hero--primary", styles.heroBanner)}>
            <div className="container">
                <h1 className="hero__title">{siteConfig.title}</h1>
                <p className="hero__subtitle">{translate({ id: "features.hero.tagline" })}</p>
                <div className="button-group">
                    <Link className="button button--primary button--lg" to="/docs">
                        {translate({ id: "features.hero.get_started" })}
                    </Link>
                    <Link className="button button--secondary button--lg" to="/examples">
                        {translate({ id: "features.hero.examples" })}
                    </Link>
                </div>
                <div className="margin-top--md">
                    <Link className={styles.link} to="https://featureslices.dev/">
                        {translate({ id: "features.hero.previous" })} (feature-slices@v1)
                    </Link>
                </div>
            </div>
        </header>
    );
}
