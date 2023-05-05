import React, { useMemo } from "react";
// It's utility, not hook =)
import getBaseUrl from "@docusaurus/useBaseUrl";
import { translate } from "@docusaurus/Translate";
import Marquee from "react-fast-marquee";
import { shuffle } from "lodash-es";
import { Section } from "@site/src/shared/ui";

import { companies } from "./_config";
import styles from "./styles.module.scss";

export const Companies = () => {
    const companiesShuffled = useMemo(() => shuffle(companies), []);

    return (
        <Section
            title={translate({ id: "pages.home.companies.using" })}
            className={styles.root}
            containerClass={styles.rootContainer}
        >
            <Marquee pauseOnHover className={styles.marquee}>
                {companiesShuffled.map(({ url, src, alt }) => (
                    <a
                        key={src}
                        className={styles.item}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            className={styles.image}
                            src={getBaseUrl(`img/companies/${src}`)}
                            title={alt}
                            alt={alt}
                        />
                    </a>
                ))}
            </Marquee>
            <span className={styles.addMe}>
                {translate({ id: "pages.home.companies.add_me" })}{" "}
                <a
                    href="https://github.com/feature-sliced/documentation/issues/131"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {translate({ id: "pages.home.companies.tell_us" })}
                </a>
            </span>
        </Section>
    );
};
