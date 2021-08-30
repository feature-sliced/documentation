import React from "react";
import Link from "@docusaurus/Link";

// FIXME: simplify mdx-admonition wrapping!

const EXT_TELEGRAM_CHAT = "https://t.me/feature_sliced";
const EXT_ISSUES = "https://github.com/feature-sliced/documentation/issues";
const EXT_CONTRIBUTING =
    "https://github.com/feature-sliced/documentation/blob/master/CONTRIBUTING.md";

// TODO: add i18n

/**
 * @see https://docusaurus.io/docs/next/markdown-features/react#importing-markdown
 */
export const WIP = ({ ticket }) => {
    const ticketUrl = `${EXT_ISSUES}/${ticket}`;
    return (
        <div>
            <p>Статья находится в процессе написания</p>
            <p>Чтобы помочь, можно:</p>
            <ul>
                <li>
                    📢 Поделиться обратной связью{" "}
                    <Link to={ticketUrl}>в тикете (комментарии/эмодзи)</Link>
                </li>
                <li>
                    💬 Собрать в тикет накопленный по теме{" "}
                    <Link to={EXT_TELEGRAM_CHAT}>материал из чата</Link>
                </li>
                <li>
                    ⚒️ Посодействовать <Link to={EXT_CONTRIBUTING}>любым другим способом</Link>
                </li>
            </ul>
        </div>
    );
};

export default WIP;
