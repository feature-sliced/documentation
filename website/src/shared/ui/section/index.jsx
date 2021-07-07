import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

export function Section({ title, withAltBg, children, rowClass, className }) {
    return (
        <section
            id={title.toLowerCase()}
            className={clsx(styles.section, withAltBg && styles.sectionAlt, className)}
        >
            <div className="container">
                <h2 className={styles.title}>{title}</h2>
                <div className={clsx("row", rowClass)}>{children}</div>
            </div>
        </section>
    );
}
