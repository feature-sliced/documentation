import React from "react";
import { FlagOutlined } from "@ant-design/icons";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.css";

const FEEDBACK_URLS = {
    ru: "https://forms.gle/7p4anU2shHAzmfqc8",
    en: "https://forms.gle/nsYua6bMMG5iBB3v7",
};

const FEEDBACK_LABEL = {
    ru: "Поделись фидбеком по документации 🤙",
    en: "Share your feedback about documentation 🤙",
};

export const Feedback = () => {
    const { i18n } = useDocusaurusContext();
    return (
        <div className={styles.root}>
            <a
                className={styles.button}
                href={FEEDBACK_URLS[i18n.currentLocale]}
                target="_blank"
                rel="noreferrer noopener"
                title={FEEDBACK_LABEL[i18n.currentLocale]}
            >
                <FlagOutlined className={styles.icon} />
            </a>
        </div>
    );
};
