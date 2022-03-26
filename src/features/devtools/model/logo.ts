import { useState, useEffect } from "react";
import cookies from "js-cookie";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

const KEYS = ["logo-pix", "logo-lin", "logo"];

const COOKIE = "THEME_LOGO";

const defaultValue = cookies.get(COOKIE) || "logo";

/**
 * @variant "red"
 * @variant "green"
 * @variant "blue"
 */
export function useSwitch() {
    const [logo, setLogo] = useState(defaultValue);
    const { siteConfig } = useDocusaurusContext();

    const onToggle = () => {
        const idx = KEYS.indexOf(logo);
        const nextIdx = (idx + 1) % KEYS.length;
        const nextLogo = KEYS[nextIdx];
        setLogo(nextLogo);
        cookies.set(COOKIE, nextLogo);

        console.log("SWITCH", { logo: nextLogo });
    };

    useEffect(() => {
        siteConfig.themeConfig.navbar.logo.src = `img/${logo}.png`;
    }, [logo]);

    return { logo, setLogo, onToggle };
}
