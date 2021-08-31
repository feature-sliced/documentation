import React from "react";
import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";

// FIXME: simplify mdx-admonition wrapping!

const EXT_TELEGRAM_CHAT = "https://t.me/feature_sliced";
const EXT_ISSUES = "https://github.com/feature-sliced/documentation/issues";
const EXT_CONTRIBUTING =
    "https://github.com/feature-sliced/documentation/blob/master/CONTRIBUTING.md";

// FIXME: simplify i18n

/**
 * @see https://docusaurus.io/docs/next/markdown-features/react#importing-markdown
 */
export const WIP = ({ ticket }) => {
    const ticketUrl = `${EXT_ISSUES}/${ticket}`;
    return (
        <div>
            <p>{translate({ id: "shared.wip.title" })}</p>
            <p>{translate({ id: "shared.wip.subtitle" })}</p>
            <ul>
                <li>
                    {translate({ id: "shared.wip.var.feedback.base" })}
                    <Link to={ticketUrl}>{translate({ id: "shared.wip.var.feedback.link" })}</Link>
                </li>
                <li>
                    {translate({ id: "shared.wip.var.material.base" })}
                    <Link to={EXT_TELEGRAM_CHAT}>
                        {translate({ id: "shared.wip.var.material.link" })}
                    </Link>
                </li>
                <li>
                    {translate({ id: "shared.wip.var.contribute.base" })}
                    <Link to={EXT_CONTRIBUTING}>
                        {translate({ id: "shared.wip.var.contribute.link" })}
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default WIP;
