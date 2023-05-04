import React from "react";
import { DevTools, devToolsModel } from "@site/src/features/devtools";
import { CookieConsent } from "@site/src/features/cookie-consent";

// Default implementation, that you can customize
// https://docusaurus.io/docs/using-themes#wrapper-your-site-with-root

function Root({ children }) {
    const switchColor = devToolsModel.useSwitchColor();

    return (
        <div role="root" data-theme={switchColor.color}>
            {children}
            <CookieConsent />
            <DevTools onColorToggle={switchColor.onToggle} />
        </div>
    );
}

export default Root;
