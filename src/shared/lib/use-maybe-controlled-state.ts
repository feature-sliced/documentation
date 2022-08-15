import { useCallback, useEffect, useState } from "react";

export const useMaybeControlledState = <T = undefined>(
    defaultValue?: T,
    propsValue?: T,
    onValueChange?: (value: T) => void,
): [T | undefined, (value: T) => void] => {
    const [innerValue, setInnerValue] = useState(defaultValue);
    useEffect(() => {
        if (propsValue !== undefined) setInnerValue(propsValue);
    }, [propsValue]);

    const setter = useCallback(
        (value: T) => {
            onValueChange?.(value);
            if (propsValue === undefined) setInnerValue(value);
        },
        [propsValue, onValueChange],
    );

    return [innerValue, setter];
};
