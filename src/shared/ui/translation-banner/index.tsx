import React from "react";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import { translate } from "@docusaurus/Translate";

const languagePrefixes = /\/(ru|uz|kr|ja)\//;

export const Banner: React.FC = () => {
    const location = useLocation();
    const canonicalPath = location.pathname.replace(languagePrefixes, "/");
    return (
        <div>
            {translate({ id: "shared.translationBanner.base" })}
            <Link autoAddBaseUrl={false} to={canonicalPath}>
                {translate({ id: "shared.translationBanner.link" })}
            </Link>
            .
        </div>
    );
};

export default Banner;
