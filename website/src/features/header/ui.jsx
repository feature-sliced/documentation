import React from "react";
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from "./styles.module.css";

export function Header() {
    const {siteConfig} = useDocusaurusContext();
    return (
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className="button-group">
            <Link
              className="button button--primary button--lg text--secondary"
              to="/docs/intro"
            >
              Get Started
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="/examples"
            >
              Examples
            </Link>
          </div>
          <div className="margin-top--md">
            <Link
                className={styles.link}
                to="https://featureslices.dev/"
            >
                Предыдущая версия (feature-slices@v1)
            </Link>
          </div>
        </div>
      </header>
    );
}