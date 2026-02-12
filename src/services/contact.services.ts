import { env } from "@utils/env.server";
import { contactSchema } from "@/types/helpers.types";
import { dataError } from "@utils/helpers.server";

interface VisitorMessage {
  headers: Headers;
  formData: FormData;
}

async function handleVisitorMessage({ headers, formData }: VisitorMessage) {
  const info = contactSchema.safeParse(Object.fromEntries(formData));
  if (info.error) return dataError("Invalid Form Input");

  const url = new URL("https://www.google.com/recaptcha/api/siteverify");
  const ip =
    headers.get("x-forwarded-for")?.split(",")[0] ??
    headers.get("cf-connecting-ip") ??
    headers.get("x-real-ip") ??
    "";
  url.searchParams.append("secret", env.CAPTCHA_SECRET);
  url.searchParams.append("response", info.data.recaptcha_token);
  url.searchParams.append("remoteip", ip);

  const res = await fetch(url, { method: "POST" });
  const captcha: { success: boolean; score: number } = await res.json();

  if (!captcha.success || captcha.score < 0.65) {
    throw new Error("Something went wrong");
  }

  return info.data;
}

export { handleVisitorMessage };
