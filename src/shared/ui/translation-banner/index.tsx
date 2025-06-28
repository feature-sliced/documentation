import React from "react";
import { useLocation } from "@docusaurus/router";
import { translate } from "@docusaurus/Translate";

const languagePrefixes = /\/(ru|uz|kr|ja)\//;

export const Banner: React.FC = () => {
    const location = useLocation();
    const canonicalPath = location.pathname.replace(languagePrefixes, "/");
    return (
        <div>
            {translate({ id: "shared.translationBanner.base" })}
            <a href={canonicalPath}>
                {translate({ id: "shared.translationBanner.link" })}
            </a>
            .
        </div>
    );
};

export default Banner;
