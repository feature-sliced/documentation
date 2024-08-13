import React from "react";
import clsx from "clsx";
import Image from "@theme/IdealImage";
import { date } from "@site/src/shared/lib/date";
import styles from "./styles.module.scss";

export type Example = {
    title: string;
    description: string;
    preview: string;
    version: string;
    updatedAt: string;
    website?: string;
    source?: string;
    tech?: string[];
};
type Props = {
    className?: string;
    data: Example;
};

export const ExampleCard: React.FC<Props> = ({ className, data }) => {
    const isNew = date.getDiffDays(new Date(data.updatedAt), new Date()) <= 14;

    return (
        <article className={clsx("card", styles.root, className)}>
            <div className={clsx("card__image", styles.preview)}>
                <div className={clsx(styles.ribbon)}>{data.version}</div>
                <Image img={data.preview} alt={data.title} />
            </div>
            <div className={clsx("card__body", styles.content)}>
                {isNew && (
                    <span
                        title="Was updated less than 2 weeks ago"
                        className={styles.labelNew}
                    >
                        NEW:{" "}
                    </span>
                )}
                <span className={styles.title}>{data.title}</span>
                <p className={styles.description}>{data.description}</p>
                {data.tech && (
                    <div className={styles.techList}>
                        {data.tech.map((techItem) => (
                            <span
                                className={clsx(
                                    styles.techListItem,
                                    styles[`tech-${techItem}`],
                                )}
                                key={techItem}
                            >
                                {techItem}
                            </span>
                        ))}
                    </div>
                )}
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
};
