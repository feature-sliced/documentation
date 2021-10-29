import React from "react";
import ReactCookieConsent from "react-cookie-consent";
import { translate } from "@docusaurus/Translate";

import styles from "./styles.module.css";

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
        </ReactCookieConsent>
    );
};
