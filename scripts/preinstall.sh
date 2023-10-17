npx only-allow pnpm

pnpm install --filter ./packages/utils && pnpm build --filter ./packages/utils
pnpm install --filter ./packages/locale && pnpm build --filter ./packages/locale
pnpm install --filter ./packages/axios && pnpm build --filter ./packages/axios
pnpm install --filter ./packages/theme && pnpm build --filter ./packages/theme
pnpm install --filter ./packages/components && pnpm build --filter ./packages/components

pnpm install --filter ./apps/main && pnpm build --filter ./apps/main

