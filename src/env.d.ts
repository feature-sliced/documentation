/* `remark-heading-id` ships no type declarations. It reaches TypeScript only
   because `tsconfig.astro.json` includes `astro.config.mjs`, the file that loads
   Starlight's `App.Locals` augmentation. */
declare module "remark-heading-id";
