import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Concepts, Features, Scheme } from '../components';
import styles from './styles.module.css';

function Header() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Get Started
          </Link>
        </div>
        <div className="margin-top--md">
          <Link
              className={styles.link}
              to="https://featureslices.dev/">
              Предыдущая версия (feature-slices@v1)
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Welcome"
      description="Structural pattern and methodology for frontend projects"
    >
      <Header />
      <main>
        <Features />
        <Concepts />
        <Scheme />
      </main>
    </Layout>
  );
}
