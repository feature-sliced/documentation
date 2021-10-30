import React from "react";
import { Feedback } from "@site/src/features/feedback";
import { CookieConsent } from "@site/src/features/cookie-consent";

// Default implementation, that you can customize
// https://docusaurus.io/docs/using-themes#wrapper-your-site-with-root

function Root({ children }) {
    return (
        <>
            {children}
            <Feedback />
            <CookieConsent />
        </>
    );
}

export default Root;
