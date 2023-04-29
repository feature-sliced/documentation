import React from "react";
import { ReactCompareSliderImage, ReactCompareSliderImageProps } from "react-compare-slider";
import { useColorMode } from "@docusaurus/theme-common";

interface ThemedCompareSliderImageProps extends Omit<ReactCompareSliderImageProps, "src"> {
    srcLight: string;
    srcDark: string;
}

export const ThemedCompareSliderImage = ({
    srcDark,
    srcLight,
    ...restProps
}: ThemedCompareSliderImageProps) => {
    const { colorMode } = useColorMode();

    return (
        <ReactCompareSliderImage src={colorMode === "dark" ? srcDark : srcLight} {...restProps} />
    );
};
