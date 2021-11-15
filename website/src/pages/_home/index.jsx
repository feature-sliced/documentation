import React from "react";
// It's utility, not hook =)
import getBaseUrl from "@docusaurus/useBaseUrl";
// eslint-disable-next-line import/no-unresolved
import Layout from "@theme/Layout";
// eslint-disable-next-line import/no-unresolved
import Image from "@theme/IdealImage";
import { translate } from "@docusaurus/Translate";
import { Header } from "@site/src/features/header";
import { Card, Section } from "@site/src/shared/ui";
import imgScheme from "@site/static/img/visual_schema.jpg";
// NOTE: Locate at index before of specific route-mapping while Node/SSR building
// "_" for excluding file from routing
import { features, concepts, companies } from "./_config";
import styles from "./styles.module.scss";

export default function HomePage() {
    // NOTE: use siteConfig for getting config
    // const {siteConfig} = useDocusaurusContext();
    return (
        <Layout title="Welcome" description="Structural methodology for frontend projects">
            <Header />
            <main>
                <Section title={translate({ id: "pages.home.features.title" })}>
                    {features.map((feature) => (
                        <Card key={feature.title} size={12 / features.length} {...feature} />
                    ))}
                </Section>
                <Section title={translate({ id: "pages.home.concepts.title" })} withAltBg>
                    {concepts.map((concept) => (
                        <Card key={concept.title} size={12 / concepts.length} {...concept} />
                    ))}
                </Section>
                <Section
                    title={translate({ id: "pages.home.scheme.title" })}
                    rowClass={styles.scheme}
                >
                    {/**
                     *  NOTE: Set fixed height for correct alignment from mobile devices
                     *  @see https://t.me/c/1463227827/197935
                     *  NOTE: Cannot be used as native img because of ideal-image plugin preprocessing
                     */}
                    <Image
                        className={styles.schemeImg}
                        img={imgScheme}
                        alt="feature-sliced-scheme,themed--scheme"
                    />
                </Section>
                <Section
                    title={translate({ id: "pages.home.companies.using" })}
                    className={styles.companiesContainer}
                >
                    <div className={styles.companies}>
                        {companies.map(({ url, src, alt }) => (
                            <a
                                key={src}
                                className={styles.companiesItem}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    className={styles.companiesItemImg}
                                    // It's utility, not hook =)
                                    src={getBaseUrl(`img/companies/${src}`)}
                                    title={alt}
                                    alt={alt}
                                />
                            </a>
                        ))}
                    </div>
                    <span className={styles.companiesSubtitle}>
                        {translate({ id: "pages.home.companies.add_me" })}{" "}
                        <a
                            href="https://github.com/feature-sliced/documentation/issues/131"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {translate({ id: "pages.home.companies.tell_us" })}
                        </a>
                    </span>
                </Section>
            </main>
        </Layout>
    );
}
