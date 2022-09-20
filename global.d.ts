declare global {
    interface Window {
        essss: string;
        ga: (eventType: string, options: {
            hitType: string,
            eventCategory: string,
            eventAction: string,
            eventLabel: string,
            eventValue: number,
        }) => void;
    }
}

export {};
