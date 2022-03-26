import { useState } from "react";
import cookies from "js-cookie";
// import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
// import { useThemeConfig } from "@docusaurus/theme-common";

const KEYS = [
    "logo-base-mini",
    "logo-base-dot",
    "logo-base",
    "logo-ext",
    "logo-lin",
    // "logo-lin-cl",
    "logo-pix",
    // "logo-pix-cl",
    "logo-pix-ext",
    "logo-sq",
    "logo-lift-alt",
    "logo-lift",
    "logo-node",
];

const COOKIE = "THEME_LOGO";

const defaultValue = Number(cookies.get(COOKIE) ?? 0);

// console.log({ cookie: cookies.get(COOKIE), num: Number(cookies.get(COOKIE)), defaultValue });

export function useSwitch() {
    const [idx, setIdx] = useState(defaultValue);
    const logo = KEYS[idx];
    const logoSrc = `/img/${logo}.png`;

    // const { siteConfig } = useDocusaurusContext();
    // const themeConfig = useThemeConfig();

    const onNext = () => {
        const nextIdx = (idx + 1) % KEYS.length;
        setIdx(nextIdx);
        cookies.set(COOKIE, nextIdx);
    };
    const onPrev = () => {
        const nextIdx = (idx - 1 + KEYS.length) % KEYS.length;
        setIdx(nextIdx);
        cookies.set(COOKIE, nextIdx);
    };
    const onToggle = onNext;

    // useEffect(() => {
    //     themeConfig.navbar.logo = {
    //         alt: "logo",
    //         src: `img/${logo}.png`,
    //     };
    //     // siteConfig.themeConfig.footer.logo.src = `img/${logo}.png`;
    //     // location.href = "/";
    //     // console.log("1");
    // });

    return { idx, logo, logoSrc, onToggle, onNext, onPrev, total: KEYS.length };
}
