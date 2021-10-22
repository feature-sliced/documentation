import React from "react";
import { Feedback } from "@site/src/features/feedback";

// Default implementation, that you can customize
// https://docusaurus.io/docs/using-themes#wrapper-your-site-with-root

function Root({ children }) {
    return (
        <>
            {children}
            <Feedback />
        </>
    );
}

export default Root;
