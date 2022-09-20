import React from "react";
import Footer from "@theme-original/DocItem/Footer";
import { DocFeedback } from "@site/src/features/feedback/doc";
import styles from "./styles.module.scss";

/**
 * DocItemFooter
 * @swizzled unsafe: higher breaking change risk (keep actual!)
 * @remark Couple to original DocItemFooter for more stability
 * @see https://docusaurus.io/docs/next/using-themes#for-site-owners
 */
export default function FooterWrapper(props) {
    return (
        <>
            <Footer {...props} />
            <DocFeedback className={styles.feedback} />
        </>
    );
}
