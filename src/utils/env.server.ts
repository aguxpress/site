import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  WP_GRAPHQL_URI: z.string(),
  APP_EMAIL: z.string(),
  APP_PASSWORD: z.string(),
});

export const env = envSchema.parse(process.env);
