import React from "react";
import OriginalDocItemFooter from "@theme-original/DocItemFooter";

/**
 * DocItemFooter
 * @swizzled unsafe: higher breaking change risk
 * @remark Keep actual!
 * TODO: describe coupling to original
 */
function DocItemFooter(props) {
    return (
        <>
            <div style={{ color: "red" }}>Was this page helpful?</div>
            <OriginalDocItemFooter {...props} />
        </>
    );
}

export default DocItemFooter;
