import * as z from "zod/mini";

export type AppFetchedData<T> = T | { error: string } | null;

export const contactSchema = z.object({
  name: z.string().check(z.minLength(1)),
  email: z.email(),
  phone: z.string(),
  message: z.string().check(z.minLength(1)),
  recaptcha_token: z.string(),
});

export type ContactMessageData = z.infer<typeof contactSchema>;

export interface ZohoResponse {
  message: string;
  status: "success" | "error";
}
