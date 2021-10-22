import React from "react";
import { FlagOutlined } from "@ant-design/icons";
// import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.css";

export const Feedback = () => {
    // TODO: implement for both locales
    // const { siteConfig } = useDocusaurusContext();
    return (
        <div className={styles.root}>
            <a
                className={styles.button}
                href="https://forms.gle/7p4anU2shHAzmfqc8"
                target="_blank"
                rel="noreferrer noopener"
            >
                <FlagOutlined className={styles.icon} />
            </a>
        </div>
    );
};
