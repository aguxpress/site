import { z } from "zod";

export type AppFetchedData<T> = T | { error: string } | null;

export const contactSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  phone: z.string(),
  message: z.string().min(1),
  recaptcha_token: z.string(),
});

export type ContactMessageData = z.infer<typeof contactSchema>;

export interface ZohoResponse {
  message: string;
  status: "success" | "error";
}
