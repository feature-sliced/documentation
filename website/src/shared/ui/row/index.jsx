import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

/**
 * Row card for linking
 * @see https://docusaurus.io/docs/next/markdown-features/react#importing-markdown
 */
export const Row = ({ title, description, to, Icon }) => {
    return (
        <Link className={styles.root} to={to}>
            {Icon && <Icon className={styles.icon} />}
            <div className={styles.details}>
                <span className={styles.title}>{title}</span>
                <p className={styles.description}>{description}</p>
            </div>
        </Link>
    );
};

export default Row;
