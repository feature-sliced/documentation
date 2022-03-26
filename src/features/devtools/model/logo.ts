import { useState, useEffect, useLayoutEffect } from "react";
import cookies from "js-cookie";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

const KEYS = [
    "logo-base",
    "logo-ext",
    "logo-lin",
    "logo-lin-cl",
    "logo-pix",
    "logo-pix-cl",
    "logo-pix-ext",
    "logo-sq",
];

const COOKIE = "THEME_LOGO";

const defaultValue = Number(cookies.get(COOKIE)) ?? 0;

console.log({ cookie: cookies.get(COOKIE), num: Number(cookies.get(COOKIE)), defaultValue });

/**
 * @variant "red"
 * @variant "green"
 * @variant "blue"
 */
export function useSwitch() {
    const [idx, setIdx] = useState(defaultValue);
    const logo = KEYS[idx];
    const { siteConfig } = useDocusaurusContext();

    const onToggle = () => {
        const nextIdx = (idx + 1) % KEYS.length;
        const nextLogo = KEYS[idx];
        setIdx(nextIdx);
        cookies.set(COOKIE, nextIdx);
        console.log("SWITCH", { siteConfig, logo: nextLogo, prevIdx: idx, nextIdx });
        location.reload();
        // location.href = "/";
    };

    useLayoutEffect(() => {
        siteConfig.themeConfig.navbar.logo.src = `img/${logo}.png`;
        // siteConfig.themeConfig.footer.logo.src = `img/${logo}.png`;
        // location.href = "/";
        // console.log("1");
    });

    return { idx, logo, onToggle };
}
