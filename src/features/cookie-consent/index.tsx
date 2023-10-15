import React from "react";
import ReactCookieConsent from "react-cookie-consent";
import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";

import styles from "./styles.module.scss";

export const CookieConsent = () => {
    return (
        <ReactCookieConsent
            location="bottom"
            buttonText={translate({ id: "features.cookie-consent.accept" })}
            containerClasses={styles.root}
            contentClasses={styles.content}
            buttonWrapperClasses={styles.buttonWrapper}
            buttonClasses={styles.button}
            cookieName="FeatureSlicedAnalytics"
            expires={30}
        >
            {translate({ id: "features.cookie-consent.alert" })}
            <Link to="/docs/privacy">
                {" "}
                ({translate({ id: "features.cookie-consent.reason" })})
            </Link>
        </ReactCookieConsent>
    );
};
