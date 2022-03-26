import React from "react";
import { CookieConsent } from "@site/src/features/cookie-consent";
import { DevTools, devtoolsModel } from "@site/src/features/devtools";

// Default implementation, that you can customize
// https://docusaurus.io/docs/using-themes#wrapper-your-site-with-root

function Root({ children }) {
    const switcher = devtoolsModel.useSwitchTheme();
    console.log(switcher);
    return (
        <div data-theme={switcher.theme}>
            {children}
            {/* NOTE: exp with HotJar feedback widget (FEEDBACK-325)  */}
            {/* <Feedback /> */}
            <CookieConsent />
            <DevTools switcher={switcher} />
        </div>
    );
}

export default Root;
