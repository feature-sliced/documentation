import React from "react";
import { CookieConsent } from "@site/src/features/cookie-consent";

// Default implementation, that you can customize
// https://docusaurus.io/docs/using-themes#wrapper-your-site-with-root

function Root({ children }) {
    return (
        <>
            {children}
            {/* NOTE: exp with HotJar feedback widget (FEEDBACK-325)  */}
            {/* <Feedback /> */}
            <CookieConsent />
        </>
    );
}

export default Root;
