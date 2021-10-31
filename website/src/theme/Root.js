import React from "react";
import { FeedbackBadge } from "@site/src/features/feedback/badge";
import { CookieConsent } from "@site/src/features/cookie-consent";

// Default implementation, that you can customize
// https://docusaurus.io/docs/using-themes#wrapper-your-site-with-root

function Root({ children }) {
    return (
        <>
            {children}
            <FeedbackBadge />
            <CookieConsent />
        </>
    );
}

export default Root;
