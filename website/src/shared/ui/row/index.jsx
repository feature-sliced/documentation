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
            <RowIcon Icon={Icon} />
            <div className={styles.details}>
                <span className={styles.title}>{title}</span>
                <p className={styles.description}>{description}</p>
            </div>
        </Link>
    );
};

const RowIcon = ({ Icon }) => {
    if (!Icon) {
        return null;
    }
    if (typeof Icon === "string") {
        return <span className={styles.icon}>{Icon}</span>;
    }
    return <Icon className={styles.icon} />;
};

export default Row;
