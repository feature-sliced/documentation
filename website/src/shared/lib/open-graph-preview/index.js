import React from "react";
import Head from "@docusaurus/Head";

export function OpenGraphPreview({ imgUrl }) {
    return (
        <Head>
            <meta name="og:image" content={imgUrl} />
            <meta name="twitter:image" content={imgUrl} />
        </Head>
    );
}
