import React, { useCallback } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";

import { ga } from "@site/src/shared/lib/ga";
import styles from "./styles.module.scss";

type Props = {
    title: React.ReactNode;
    description: React.ReactNode;
    to: string;
    Icon?: string | any;
    tags?: string[];
    className?: string;
    disabled?: boolean;
    primaryColor?: "red" | "green" | "blue";
    theme?: "default" | "mini" | "primary";
};

/**
 * NavCard for linking
 * @see https://docusaurus.io/docs/next/markdown-features/react#importing-markdown
 */
export const NavCard: React.FC<Props> = (props) => {
    const {
        title,
        description,
        to,
        Icon,
        tags,
        className,
        disabled,
        theme = "default",
        primaryColor,
    } = props;
    const handleClick = useCallback(() => {
        ga.sendEvent({
            category: ga.CATEGORIES.full,
            // FIXME: get later from props
            action: "NavRow:Click",
            label: to,
        });
    }, [to]);

    return (
        <Link
            className={clsx(
                styles.root,
                className,
                disabled && styles.rootDisabled,
                styles[`${theme}Theme`],
                primaryColor && styles[`${primaryColor}Primary`],
            )}
            to={to}
            onClick={handleClick}
        >
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

export default NavCard;
