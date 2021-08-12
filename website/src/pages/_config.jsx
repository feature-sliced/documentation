import React from "react";
import {
    LoginOutlined,
    FileProtectOutlined,
    EyeOutlined,
    BlockOutlined,
    ApiOutlined,
    LikeOutlined,
    BuildOutlined,
} from "@ant-design/icons";

export const features = [
    {
        title: "Explicit business-logic",
        Icon: EyeOutlined,
        description: (
            <>
                Архитектуру <b>легко осваивать</b>, поскольку она состоит из доменных модулей
            </>
        ),
    },
    {
        title: "Adaptability",
        Icon: LoginOutlined,
        description: (
            <>
                Компоненты архитектуры можно <b>гибко заменять, добавлять под новые условия</b>
            </>
        ),
    },
    {
        title: "Tech debt & Refactoring",
        Icon: FileProtectOutlined,
        description: (
            <>
                Каждый модуль можно <b>независимо</b> модифицировать / переписать{" "}
                <b>без сайд-эффектов</b>
            </>
        ),
    },
    {
        title: "Explicit sharing",
        Icon: BuildOutlined,
        description: (
            <>
                Сохраняется баланс между <b>DRY и локальной кастомизацией</b>
            </>
        ),
    },
];

export const concepts = [
    {
        title: "Public API",
        Icon: ApiOutlined,
        description: (
            <>
                Каждый модуль должен иметь на верхнем уровне декларацию <b>своего публичного API</b>
            </>
        ),
    },
    {
        title: "Isolation",
        Icon: BlockOutlined,
        description: (
            <>
                Модуль не должен <b>зависеть напрямую</b> от других модулей того же слоя или
                вышележаших слоев
            </>
        ),
    },
    {
        title: "Needs driven",
        Icon: LikeOutlined,
        description: (
            <>
                Ориентирование <b>на потребности бизнеса и пользователя</b>
            </>
        ),
    },
];

/**
 * Companies using feature-sliced
 * @see https://github.com/feature-sliced/documentation/issues/131
 * @see website/static/img/companies
 */
export const companies = [
    {
        url: "https://redmadrobot.com/",
        src: "red_mad_robot.png",
        alt: "red_mad_robot",
    },
    {
        url: "https://kode.ru/",
        src: "kode.png",
        alt: "KODE",
    },
    {
        url: "https://uptarget.co/",
        src: "uptarget.png",
        alt: "Uptarget",
    },
    {
        url: "https://www.fxdd.com/",
        src: "fxdd.svg",
        alt: "FXDD",
    },
    {
        url: "https://foxford.ru/",
        src: "foxford.svg",
        alt: "Foxford",
    },
];
