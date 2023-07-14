import React from "react";
import clsx from "clsx";
import { EnterOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";

type Props = {
    keyIcon: React.ReactNode;
    href: string;
    isExternal?: boolean;
    isActive?: boolean;
};

type Keys = {
    Enter: React.ReactNode;
};

// FIXME: [FSDCUR] impl click by keyboard
export const KeyLink: React.FC<Props> & Keys = ({
    keyIcon,
    href,
    children,
    isExternal,
    isActive,
}) => {
    return (
        <a
            href={href}
            target={isExternal ? "blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className={clsx(styles.component, isActive && styles.active)}
        >
            <div className={styles.key}>{keyIcon}</div>
            {children}
        </a>
    );
};

KeyLink.Enter = <EnterOutlined style={{ fontWeight: 700 }} />;
