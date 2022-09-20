import React from "react";
import Head from "@docusaurus/Head";

type Props = {
    imgUrl: string;
};

export const OGMeta: React.FC<Props> = ({ imgUrl }) => {
    return (
        <Head>
            <meta name="og:image" content={imgUrl} />
            <meta name="twitter:image" content={imgUrl} />
        </Head>
    );
};
