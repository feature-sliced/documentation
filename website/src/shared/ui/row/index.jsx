import React, { useCallback } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";

import { ga } from "@site/src/shared/lib/ga";
import styles from "./styles.module.css";

/**
 * Row card for linking
 * @see https://docusaurus.io/docs/next/markdown-features/react#importing-markdown
 */
export const Row = (props) => {
    const { title, description, to, Icon, tags, className } = props;
    const handleClick = useCallback(() => {
        ga.sendEvent({
            category: ga.CATEGORIES.full,
            action: "NavRow:Click",
            label: to,
        });
    }, [to]);

    return (
        <Link className={clsx(styles.root, className)} to={to} onClick={handleClick}>
            <RowIcon Icon={Icon} />
            <div className={styles.details}>
                <div className={styles.detailsMain}>
                    <span className={styles.title}>{title}</span>
                    <p className={styles.description}>{description}</p>
                </div>
                {tags && <div className={styles.detailsTags}>{tags.join(" • ")}</div>}
            </div>
        </Link>
    );
};

const RowIcon = ({ Icon }) => {
    if (!Icon) {
        return null;
    }
    // For plain emojii-icons
    if (typeof Icon === "string") {
        return <span className={styles.icon}>{Icon}</span>;
    }
    return <Icon className={styles.icon} />;
};

export default Row;
