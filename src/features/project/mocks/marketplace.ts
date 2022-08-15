import { projectDecompress } from "./project-decompress";

export const marketplace = projectDecompress({
    app: {
        description: "Initializing application logic",
        dependencies: ["verification", "checkout", "onboarding"],
    },
    processes: {
        description: "Application processes running over pages",
        slices: {
            verification: {
                dependencies: ["auth", "user"],
            },
            checkout: {
                dependencies: ["cart", "user"],
            },
            onboarding: {
                dependencies: ["review-id", "profile", "cart", "user"],
            },
        },
    },
    pages: {
        description: "Application pages corresponding to a specific route",
        slices: {
            "auth": {
                dependencies: ["register-form", "login-form", "user"],
            },
            "review-id": {
                dependencies: ["profile-card", "review", "product", "ui"],
            },
            "review-post": {
                dependencies: ["create-review", "review", "ui"],
            },
            "feed": {
                dependencies: ["review-card"],
            },
            "profile": {
                dependencies: ["user", "ui"],
            },
            "cart": {
                dependencies: ["deal-banner", "product", "user"],
            },
        },
    },
    widgets: {
        description: "Independent and self-contained blocks for pages",
        slices: {
            "register-form": {
                dependencies: ["create-user", "user", "ui"],
            },
            "login-form": {
                dependencies: ["user", "ui"],
            },
            "profile-card": {
                dependencies: ["user", "ui"],
            },
            "review-card": {
                dependencies: ["review", "product", "ui"],
            },
            "deal-banner": {
                dependencies: ["product", "ui"],
            },
        },
    },
    features: {
        description: "Processing of user scenarios",
        slices: {
            "create-user": {
                dependencies: ["user", "ui"],
            },
            "create-review": {
                dependencies: ["review", "ui"],
            },
            "search-product": {
                dependencies: ["product", "ui"],
            },
        },
    },
    entities: {
        description: "Business entities that domain logic operates with",
        slices: {
            user: {
                dependencies: ["ui", "api"],
            },
            review: {
                dependencies: ["ui", "api"],
            },
            product: {
                dependencies: ["ui", "api"],
            },
        },
    },
    shared: {
        description: "Reused modules, non business specific",
        slices: {
            ui: {
                description: "Application UI kit",
            },
            api: {
                description: "Preconfigured backend API",
            },
            config: {
                description: "Application environment and configuration",
            },
        },
    },
});
