import {
    LoginOutlined,
    FileProtectOutlined,
    EyeOutlined,
    BlockOutlined,
    ApiOutlined,
    LikeOutlined,
    BuildOutlined,
} from "@ant-design/icons";
import { translate } from "@docusaurus/Translate";

export const features = [
    {
        title: translate({ id: "pages.home.features.logic.title" }),
        Icon: EyeOutlined,
        description: translate({ id: "pages.home.features.logic.description" }),
    },
    {
        title: translate({ id: "pages.home.features.adaptability.title" }),
        Icon: LoginOutlined,
        description: translate({ id: "pages.home.features.adaptability.description" }),
    },
    {
        title: translate({ id: "pages.home.features.debt.title" }),
        Icon: FileProtectOutlined,
        description: translate({ id: "pages.home.features.debt.description" }),
    },
    {
        title: translate({ id: "pages.home.features.shared.title" }),
        Icon: BuildOutlined,
        description: translate({ id: "pages.home.features.shared.description" }),
    },
];

export const concepts = [
    {
        title: translate({ id: "pages.home.concepts.public.title" }),
        Icon: ApiOutlined,
        description: translate({ id: "pages.home.concepts.public.description" }),
    },
    {
        title: translate({ id: "pages.home.concepts.isolation.title" }),
        Icon: BlockOutlined,
        description: translate({ id: "pages.home.concepts.isolation.description" }),
    },
    {
        title: translate({ id: "pages.home.concepts.needs.title" }),
        Icon: LikeOutlined,
        description: translate({ id: "pages.home.concepts.needs.description" }),
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
    {
        url: "https://vigo.ru/",
        src: "vigo.png",
        alt: "Vigo",
    },
    {
        url: "https://yandex.ru/",
        src: "yandex.svg",
        alt: "Yandex",
    },
    {
        url: "https://space307.com/",
        src: "space307.svg",
        alt: "~/.space307",
    },
    {
        url: "https://pmp-tech.ru/",
        src: "pmp-tech.png",
        alt: "PMP Tech",
    },
];
