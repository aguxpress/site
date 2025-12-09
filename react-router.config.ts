import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  appDirectory: "src",
  prerender: () => [
    "/legal/cookies",
    "/legal/terms-and-conditions",
    "/legal/privacy-policy",
  ],
} satisfies Config;
