import React from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";
import type { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon";

type Props = {
    Icon: React.FC<AntdIconProps>;
    title: string;
    description: React.ReactNode;
    size: number;
};

export const Card: React.FC<Props> = ({ Icon, title, description, size }) => {
    return (
        <div className={clsx("col", `col--${size}`)}>
            <div className="text--center">
                <Icon className={styles.icon} alt={title} />
            </div>
            <div className="text--center padding-horiz--md">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
};
