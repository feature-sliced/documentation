export const sendEvent = ({ category, action, label, value }) => {
    if (typeof window === undefined) return;
    if (!window.ga) return;

    return window.ga("send", {
        hitType: "event",
        eventCategory: category,
        eventAction: action,
        eventLabel: label,
        eventValue: value,
    });
};

export const CATEGORIES = {
    full: "Feedback 1.2 (full)",
    mixed: "Feedback 1.2 (mixed)",
    short: "Feedback 1.2 (short)",
};
