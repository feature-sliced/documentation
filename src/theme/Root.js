import React from "react";
import { CookieConsent } from "@site/src/features/cookie-consent";
import { DevTools, devToolsModel } from "@site/src/features/devtools";

// Default implementation, that you can customize
// https://docusaurus.io/docs/using-themes#wrapper-your-site-with-root

function Root({ children }) {
    const switchColor = devToolsModel.color.useSwitch();

    console.log(switchColor)

    return (
        <div data-theme={switchColor.color}>
            {children}
            {/* NOTE: exp with HotJar feedback widget (FEEDBACK-325)  */}
            {/* <Feedback /> */}
            <CookieConsent />
            <DevTools color={switchColor} />
        </div>
    );
}

export default Root;
