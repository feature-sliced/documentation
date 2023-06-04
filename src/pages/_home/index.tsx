import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
// import Image from "@theme/IdealImage";
// import { translate } from "@docusaurus/Translate";
// import { Card, Section } from "@site/src/shared/ui";
// import imgScheme from "@site/static/img/visual_schema.jpg";
// NOTE: Locate at index before of specific route-mapping while Node/SSR building
// "_" for excluding file from routing
// import { features, concepts } from "./_config";
import {
    GithubOutlined,
    YoutubeFilled,
    AppstoreAddOutlined,
    ReadOutlined,
    TwitterOutlined,
    ApiOutlined,
    SolutionOutlined,
    DeploymentUnitOutlined,
} from "@ant-design/icons";
import { KeyLink, NavCard } from "@site/src/shared/ui";
import { Hero } from "./hero";
// FIXME: [FSDCUR] Replace to unified IBM/Carbon icons usage
import IconNpm from "./npm.svg";
import IconTelegram from "./telegram.svg";
import IconDiscord from "./discord.svg";
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
                    <span className={styles.text}>
                        Граф с профитами от использования: чистый гит, параллелизация работы,
                        связность и зацепленность, общая терминология итд
                    </span>
                </section>
                <section className={styles.section}>
                    <img src="/img/promo/tech.png" alt="themed--scheme" />
                </section>
                <section className={styles.cols}>
                    <div className={clsx(styles.col, styles.text)}>
                        {/* FIXME: [FSDCUR] refine layout */}
                        <span>
                            🍰 <b>Feature-Sliced Design</b> is not only a methodology, but also a
                            whole <a href="/community">ecosystem</a>:
                            <br />
                            - documentation
                            <br />
                            - community platforms
                            <br />
                            - media resources
                            <br />- tooling for working in projects
                        </span>
                    </div>
                    <div className={clsx(styles.col, styles.ecosystem)}>
                        <div className={styles.ecosystemList}>
                            <NavCard
                                theme="mini"
                                Icon={ReadOutlined}
                                title="Documentation"
                                description="Completed and self-sufficient documentation with practical and theoretical aspects of FSD usage"
                                to="/docs"
                            />
                            <NavCard
                                theme="mini"
                                Icon={ApiOutlined}
                                title="Practical guides"
                                description="Practice-oriented guidelines"
                                to="/docs/guides"
                            />
                            <NavCard
                                theme="mini"
                                Icon={AppstoreAddOutlined}
                                title="Showcase"
                                description="List of realworld websites people are building with FSD"
                                to="/showcase"
                            />
                            <NavCard
                                theme="mini"
                                Icon={IconNpm}
                                title="@feature-sliced/eslint-config"
                                description="Lint FSD concepts by existing eslint plugins"
                                to="https://github.com/feature-sliced/eslint-config"
                            />
                            <NavCard
                                theme="mini"
                                Icon={SolutionOutlined}
                                title="FSD Articles"
                                description="Articles from the core-team and the community on the use of FSD in realworld projects"
                                to="/blog"
                            />
                            <NavCard
                                theme="mini"
                                Icon={GithubOutlined}
                                title="@feature-sliced/cra-template"
                                description="CRA template with FSD app structurizing"
                                to="https://github.com/feature-sliced/cra-template"
                            />
                            <NavCard
                                theme="mini"
                                Icon={YoutubeFilled}
                                title="Public Talks"
                                description="FSD YouTube channel with public talks and workshops"
                                to="https://www.youtube.com/c/FeatureSlicedDesign"
                            />
                            <NavCard
                                theme="mini"
                                Icon={TwitterOutlined}
                                title="#Media Twitter"
                                description="Twitter profile with FSD news"
                                to="https://twitter.com/feature_sliced"
                            />
                            <NavCard
                                theme="mini"
                                Icon={IconDiscord}
                                title="#Media Discord"
                                description="International discord community chat"
                                to="https://discord.gg/S8MzWTUsmp"
                            />
                            <NavCard
                                theme="mini"
                                Icon={IconTelegram}
                                title="#Media Telegram"
                                description="RU telegram chat"
                                to="https://t.me/feature_sliced"
                            />
                        </div>
                    </div>
                </section>
                <section className={styles.section} id="scheme-limitations">
                    <img src="/img/promo/limitations.png" alt="themed--scheme" />
                </section>
                <section className={styles.section}>
                    <img src="/img/promo/example-units.jpeg" alt="themed--scheme" />
                </section>
                <Companies />
                <section className={clsx(styles.section, styles.cta)}>
                    <span className={styles.text}>
                        Think FSD and you are a match? <span className="text--red">&lt;3</span>
                    </span>
                    <div className={styles.ctaActions}>
                        <KeyLink href="/docs" keyIcon={KeyLink.Enter} isActive>Dive into the docs</KeyLink>
                        <KeyLink href="/docs" keyIcon="S">Talk to someone about it</KeyLink>
                        {/* <NavCard
                            theme="primary"
                            Icon={ReadOutlined}
                            title="Documentation"
                            description="Learn the ins and outs of the Feature-Sliced Design methodology"
                            primaryColor="red"
                            to="/docs/"
                        />
                        <NavCard
                            theme="primary"
                            Icon={DeploymentUnitOutlined}
                            title="Community"
                            description="Discover a comprehensive ecosystem of tools and resources to support your frontend projects."
                            primaryColor="green"
                            to="/community"
                        />
                        <NavCard
                            theme="primary"
                            Icon={AppstoreAddOutlined}
                            title="Showcase"
                            description="Explore real-world examples and success stories using Feature-Sliced Design."
                            primaryColor="blue"
                            to="/showcase"
                        /> */}
                    </div>
                </section>
            </main>
        </Layout>
    );
}
