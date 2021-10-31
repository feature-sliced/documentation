import React from "react";
import OriginalDocItemFooter from "@theme-original/DocItemFooter";
import { DocFeedback } from "@site/src/features/feedback/doc";
import styles from "./styles.module.css";

/**
 * DocItemFooter
 * @swizzled unsafe: higher breaking change risk
 * @remark Keep actual!
 * TODO: describe coupling to original
 */
function DocItemFooter(props) {
    return (
        <>
            <OriginalDocItemFooter {...props} />
            <DocFeedback className={styles.feedback} />
        </>
    );
}

export default DocItemFooter;
