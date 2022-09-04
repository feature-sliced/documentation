import React from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";

export function Section({
    title,
    withAltBg,
    children,
    rowClass,
    className,
    containerClass = "container",
}) {
    return (
        <section
            id={title.toLowerCase()}
            className={clsx(styles.section, withAltBg && styles.sectionAlt, className)}
        >
            <div className={containerClass}>
                <h2 className={styles.title}>{title}</h2>
                <div className={clsx("row", rowClass)}>{children}</div>
            </div>
        </section>
    );
}
