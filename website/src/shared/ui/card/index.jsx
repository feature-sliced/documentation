import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

export function Card({ Icon, title, description, size }) {
    return (
        <div className={clsx("col", `col--${size}`)}>
            <div className="text--center">
                <Icon className={styles.icon} alt={title} />
            </div>
            <div className="text--center padding-horiz--md">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
}
