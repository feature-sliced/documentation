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
                <section className={clsx(styles.section, styles.sectionText, styles.limitations)} id="scheme-limitations">
                    <h2 className={styles.text}>Our aim is to cover the architectural needs of the <span className="text--primary">vast majority of front-end projects</span></h2>
                    <br/>
                    {/* FIXME: [FSDCUR] resolve color adaptive */}
                    <img src="/img/promo/limitations.png" alt="themed--scheme" />
                </section>
                {/* Граф с профитами от использования: чистый гит, параллелизация работы, связность и зацепленность, общая терминология итд */}
                <section className={clsx(styles.section, styles.sectionText, styles.profits)}>
                    <h2 className={styles.text}>Less <span className="text--red">pain</span>, more <span className="text--green">gain</span></h2>
                    <div className={styles.profictsList}>
                        <div className={styles.card}>
                            <div className={styles.cardImage}>
                                <img src="/img/promo/coupling.png" alt='coupling--scheme' />
                            </div>
                            <div className={styles.cardContent}>
                                <b>Low coupling, high cohesion</b>
                                <p>You don’t need to remember what that means.</p>
                                <p>Just know that it makes your code <span className="text--green">easier to unit-test</span> and refactoring is much more <span className="text--blue">predictable</span></p>
                            </div>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.cardImage}>
                                <img src="/img/promo/structure.png" alt='structure--scheme' />
                            </div>
                            <div className={styles.cardContent}>
                                <b>Rigid, standardized structure</b>
                                <p>New job where people use FSD? No stress!</p>
                                <p>You’ll <span className="text--green">feel right</span> at home in the codebase. Get <span className="text--blue">straight to business</span>, skip the reinvented wheels.</p>
                            </div>
                        </div>
                    </div>
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
                {/* <section className={styles.section}>
                    <img src="/img/promo/example-units.jpeg" alt="themed--scheme" />
                </section> */}
                <section className={clsx(styles.section, styles.sectionText, styles.companies)}>
                    <h2 className={styles.text}>It’s <span className="text--red">dangerous</span> to go alone</h2>
                    <p>But you don’t have to. These companies are already using Feature-Sliced Design:</p>
                    <Companies />
                </section>
                <section className={clsx(styles.section, styles.sectionText, styles.nowar)}>
                    <h2 className={styles.text}>The FSD team stands with Ukraine <div className={styles.flag} /></h2>
                    <p>The Feature-Sliced Design team unanimously despises the invasion into Ukraine led by the Russian government.</p>
                    <p><span className="text--primary">Can and want to help?</span> The best way is to seek out a local organization that supports Ukrainian refugees in your country and help someone directly.</p>
                </section>
                <section className={clsx(styles.section, styles.sectionText, styles.cta)}>
                    <h2 className={styles.text}>
                        Think FSD and you are a match? <span className="text--red">&lt;3</span>
                    </h2>
                    <div className={styles.ctaActions}>
                        <KeyLink href="/docs" keyIcon={KeyLink.Enter} isActive>Dive into the docs</KeyLink>
                        <KeyLink href="/docs" keyIcon="E">Discover ecosystem</KeyLink>
                        <KeyLink href="/docs" keyIcon="S">Explore realworld examples</KeyLink>
                        <KeyLink href="/docs" keyIcon="D">Talk to someone about it</KeyLink>
                    </div>
                </section>
            </main>
        </Layout>
    );
}
