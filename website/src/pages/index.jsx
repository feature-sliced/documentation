import React from "react";
// It's utility, not hook =)
import getBaseUrl from "@docusaurus/useBaseUrl";
// eslint-disable-next-line import/no-unresolved
import Layout from "@theme/Layout";
// eslint-disable-next-line import/no-unresolved
import Image from "@theme/IdealImage";
// NOTE: import from root level, because same image is used at main README.md
import { Header } from "@site/src/features/header";
import { Card, Section } from "@site/src/shared/ui";
import imgScheme from "../../../assets/visual_schema.jpg";
// NOTE: Locate at index before of specific route-mapping while Node/SSR building
// "_" for excluding file from routing
import { features, concepts, companies } from "./_config";
import styles from "./styles.module.css";

export default function HomePage() {
    // NOTE: use siteConfig for getting config
    // const {siteConfig} = useDocusaurusContext();
    return (
        <Layout title="Welcome" description="Structural methodology for frontend projects">
            <Header />
            <main>
                <Section title="Преимущества">
                    {features.map((feature) => (
                        <Card key={feature.title} size={12 / features.length} {...feature} />
                    ))}
                </Section>
                <Section title="Концепции" withAltBg>
                    {concepts.map((concept) => (
                        <Card key={concept.title} size={12 / concepts.length} {...concept} />
                    ))}
                </Section>
                <Section title="Схема" rowClass={styles.scheme}>
                    {/* 
            NOTE: Set fixed height for correct alignment from mobile devices
            @see https://t.me/c/1463227827/197935
            NOTE: Cannot be used as native img because of ideal-image plugin preprocessing
          */}
                    <Image
                        className={styles.schemeImg}
                        img={imgScheme}
                        alt="feature-sliced-scheme"
                    />
                </Section>
                <Section
                    title="Компании, использующие методологию"
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
                        Хотите попасть в этот список?{" "}
                        <a
                            href="https://github.com/feature-sliced/documentation/issues/131"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Сообщите нам
                        </a>
                    </span>
                </Section>
            </main>
        </Layout>
    );
}
