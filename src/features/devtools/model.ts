import { useState } from "react";

export const THEMES = {
    RED: "red",
    GREEN: "green",
    BLUE: "blue",
};

export const THEMES_KEYS = Object.values(THEMES);

/**
 * @variant "red"
 * @variant "green"
 * @variant "blue"
 */
export function useSwitchTheme() {
    const [theme, setTheme] = useState(THEMES.BLUE);

    const onToggle = () => {
        const idx = THEMES_KEYS.indexOf(theme);
        const nextIdx = (idx + 1) % THEMES_KEYS.length;
        const nextTheme = THEMES_KEYS[nextIdx];
        setTheme(nextTheme);
    };

    return { theme, setTheme, onToggle };
}
