import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  WP_BASE_URI: z.string(),
  CAPTCHA_SECRET: z.string(),
  WP_USERNAME: z.string(),
  WP_PASSWORD: z.string(),
  APP_EMAIL: z.string(),
  APP_PASSWORD: z.string(),
});

const parsed = envSchema.parse(process.env);

export const env = {
  ...parsed,
  WP_GRAPHQL_URI: `${parsed.WP_BASE_URI}/graphql`,
  WP_REST_URI: `${parsed.WP_BASE_URI}/wp-json/wp/v2`,
};
