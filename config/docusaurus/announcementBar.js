const NBSP = "&nbsp;";

/** @type {import('@docusaurus/types').DocusaurusConfig["themeConfig"]["announcementBar"]} */
const announcementBar = {
    id: "bar", // Any value that will identify this message.
    // content: `<b>WIP:</b> Текущая версия методологии находится на стадии разработки и некоторые детали <i>могут измениться</i>`,
    // backgroundColor: '#e6a700', // As caution by docusaurus (defaults was `#fff`)
    // FIXME: (i18n) translate by locale later (how to?)
    // content: `If you are using the methodology <a href="/versions">(v0 / v1 / v2)</a> at work or in personal projects, <a href="https://github.com/feature-sliced/documentation/issues/131" target="_blank" rel="noreferrer noopener">tell, us!</a>`,
    // content: `📚 Documentation refinements are in progress. <a href="https://github.com/feature-sliced/documentation/issues/263" target="_blank" rel="noreferrer noopener">Stay tuned for updates</a> and <a href="https://forms.gle/nsYua6bMMG5iBB3v7" target="_blank" rel="noreferrer noopener">share your feedback</a>`,
    // backgroundColor: "#5c9cb5", // As primary theme
    // backgroundColor: "#0367d2",
    content: [
        `🍰 We're <a href="/blog/rebranding-stable">rebranding!</a>`,
        `☮️ Stop the war in Ukraine! #NoWar`, // #nowar
    ].join(`${NBSP + NBSP}|${NBSP + NBSP}`),
    backgroundColor: "var(--ifm-background-color)", // #nowar
    textColor: "var(--bg-color-alt)", // Defaults to `#000`.
    isCloseable: false, // Defaults to `true`.
};

module.exports = { announcementBar };
