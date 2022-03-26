import { useState } from "react";
import cookies from "js-cookie";
// import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
// import { useThemeConfig } from "@docusaurus/theme-common";

const KEYS = [
    "logo-base",
    "logo-base-dot",
    "logo-base-mini",
    "logo-lift",
    "logo-lift-alt",
    "logo-node",
    "logo-ext",
    "logo-lin",
    // "logo-lin-cl",
    "logo-pix",
    // "logo-pix-cl",
    "logo-pix-ext",
    "logo-sq",
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

    const onToggle = () => {
        const nextIdx = (idx + 1) % KEYS.length;
        // const nextLogo = KEYS[nextIdx];
        setIdx(nextIdx);
        cookies.set(COOKIE, nextIdx);
        // console.log("SWITCH", { themeConfig, logo: nextLogo, prevIdx: idx, nextIdx });
        // location.reload();
        // location.href = "/";
    };

    // useEffect(() => {
    //     themeConfig.navbar.logo = {
    //         alt: "logo",
    //         src: `img/${logo}.png`,
    //     };
    //     // siteConfig.themeConfig.footer.logo.src = `img/${logo}.png`;
    //     // location.href = "/";
    //     // console.log("1");
    // });

    return { idx, logo, logoSrc, onToggle };
}
