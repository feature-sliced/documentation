import { mocks } from "./mocks";
import { scheme } from "./ui/scheme";
import { createProjectController, ProjectStatefulProvider, useProjectStateful } from "./model";

export const project = {
    mocks,
    scheme,
    model: {
        createProjectController,
        ProjectStatefulProvider,
        useProjectStateful,
    },
};
