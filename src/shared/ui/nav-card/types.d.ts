import type { ReactNode } from "react";

export type Props = {
    title: ReactNode;
    description: ReactNode;
    to: string;
    Icon: string | any;
    tags?: string;
    className?: string;
    disabled?: boolean;
    theme?: "default" | "mini" | "primary";
};
