import React from "react";
import Layout from "@theme/Layout";
// import Image from "@theme/IdealImage";
// import { translate } from "@docusaurus/Translate";
// import { Card, Section } from "@site/src/shared/ui";
// import imgScheme from "@site/static/img/visual_schema.jpg";
// NOTE: Locate at index before of specific route-mapping while Node/SSR building
// "_" for excluding file from routing
// import { features, concepts } from "./_config";
import { Hero } from "./hero";
import { Companies } from "./companies";
import styles from "./styles.module.scss";

export default function HomePage() {
    // NOTE: use siteConfig for getting config
    // const {siteConfig} = useDocusaurusContext();
    return (
        // FIXME: [FSDCUR] Resolve types and OG metadata
        // @ts-ignore
        <Layout title="Welcome" description="Architectural methodology for frontend projects">
            <Hero />
            <main>
                <section className={styles.section}>
                    <span className={styles.demoText}>
                        Граф с профитами от использования: чистый гит, параллелизация работы,
                        связность и зацепленность, общая терминология итд
                    </span>
                </section>
                <section className={styles.section}>
                    <img src="/img/promo/tech.png" alt="themed--scheme" />
                </section>
                <section className={styles.cols}>
                    <div className={styles.col}>
                        <span className={styles.demoText}>
                            Краткий рассказ про тулинг, богатую доку, примеры, статьи, чаты, ивенты
                        </span>
                    </div>
                    <div className={styles.col}>
                        <span className={styles.demoText}>
                            Вертикальная карусель карточек с элементами из экосистемы (пример,
                            статья, ивент)
                        </span>
                    </div>
                </section>
                <section className={styles.section} id="scheme-limitations">
                    <img src="/img/promo/limitations.png" alt="themed--scheme" />
                </section>
                <section className={styles.section}>
                    <img src="/img/promo/example-units.jpeg" alt="themed--scheme" />
                </section>
                <Companies />
                <section className={styles.section}>
                    <span className={styles.demoText}>call-to-action</span>
                </section>
            </main>
        </Layout>
    );
}

{
    /* <Section title={translate({ id: "pages.home.features.title" })}>
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
                > */
}
{
    /**
     *  NOTE: Set fixed height for correct alignment from mobile devices
     *  @see https://t.me/c/1463227827/197935
     *  NOTE: Cannot be used as native img because of ideal-image plugin preprocessing
     */
}
{
    /* <Image
                        className={styles.schemeImg}
                        img={imgScheme}
                        alt="feature-sliced-scheme,themed--scheme"
                    />
                </Section> */
}
