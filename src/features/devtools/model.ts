import { useState } from "react";
import cookies from "js-cookie";

export const THEMES = {
    RED: "red",
    GREEN: "green",
    BLUE: "blue",
};

export const THEMES_KEYS = Object.values(THEMES);

const THEME_COOKIE = "COLOR_THEME";

const defaultTheme = cookies.get(THEME_COOKIE) || THEMES.BLUE;

/**
 * @variant "red"
 * @variant "green"
 * @variant "blue"
 */
export function useSwitchTheme() {
    const [theme, setTheme] = useState(defaultTheme);

    const onToggle = () => {
        const idx = THEMES_KEYS.indexOf(theme);
        const nextIdx = (idx + 1) % THEMES_KEYS.length;
        const nextTheme = THEMES_KEYS[nextIdx];
        setTheme(nextTheme);
        cookies.set(THEME_COOKIE, nextTheme);
    };

    return { theme, setTheme, onToggle };
}
