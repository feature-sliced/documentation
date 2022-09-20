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
