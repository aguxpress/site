import * as z from "zod/mini";
import "dotenv/config";

const envSchema = z.object({
  WP_BASE_URI: z.string(),
  WP_USERNAME: z.string(),
  WP_PASSWORD: z.string(),
  APP_EMAIL: z.string(),
  APP_PASSWORD: z.string(),
  CAPTCHA_SECRET: z.string(),
  VITE_RECAPTCHA_SITEKEY: z.string(),
  GRIST_URL: z.string(),
  GRIST_KEY: z.string(),
  ZOHO_REFRESH_TOKEN: z.string(),
  ZOHO_CLIENT: z.string(),
  ZOHO_SECRET: z.string(),
  ZOHO_LISTKEY: z.string(),
});

const parsed = envSchema.parse(process.env);

export const env = {
  ...parsed,
  WP_GRAPHQL_URI: `${parsed.WP_BASE_URI}/graphql`,
  WP_REST_URI: `${parsed.WP_BASE_URI}/wp-json/wp/v2`,
};
