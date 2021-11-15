import React from "react";

import clsx from "clsx";
// eslint-disable-next-line import/no-unresolved
import Image from "@theme/IdealImage";
import styles from "./styles.module.scss";

export function ExampleCard({ className, data }) {
    return (
        <article className={clsx("card", styles.root, className)}>
            <div className={clsx("card__image", styles.preview)}>
                <div className={clsx(styles.ribbon)}>{data.version}</div>
                <Image img={data.preview} alt={data.title} />
            </div>
            <div className={clsx("card__body", styles.content)}>
                <span className={styles.title}>{data.title}</span>
                <p className={styles.description}>{data.description}</p>
            </div>
            <div className={clsx("card__footer", styles.actions)}>
                <div className="button-group button-group--block">
                    {data.website && (
                        <a
                            className="button button--small button--secondary button--block"
                            href={data.website}
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            Website
                        </a>
                    )}
                    {data.source && (
                        <a
                            className="button button--small button--secondary button--block"
                            href={data.source}
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            Source
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
}
