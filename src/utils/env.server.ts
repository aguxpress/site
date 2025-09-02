import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  WP_GRAPHQL_URI: z.string(),
});

export const env = envSchema.parse(process.env);
