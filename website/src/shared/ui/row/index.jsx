import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

/**
 * Row card for linking
 * @see https://docusaurus.io/docs/next/markdown-features/react#importing-markdown
 */
export const Row = ({ title, description, to }) => {
    return (
        <Link className={styles.root} to={to}>
            <span className={styles.title}>{title}</span>
            <p className={styles.description}>{description}</p>
        </Link>
    );
};

export default Row;
