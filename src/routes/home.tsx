import { z } from "zod";
import type { Route } from "./+types/home";
import { env } from "@utils/env.server";
import Hero from "@components/home/Hero";
import About from "@components/home/About";
import Services from "@components/home/Services";
import HomeBlog from "@components/home/HomeBlog";
import Contact from "@components/home/Contact";
import Subscribe from "@components/home/Subscribe";
import { sendContactMail } from "@utils/forms.server";
import { getAllArticles } from "@utils/graphql.server";

export async function loader({}: Route.LoaderArgs) {
  const articles = await getAllArticles(2);
  return { articles };
}

export async function action({ request }: Route.ActionArgs) {
  const contactSchema = z.object({
    name: z.string().min(1),
    email: z.email(),
    phone: z.string(),
    message: z.string().min(1),
    recaptcha_token: z.string(),
  });

  try {
    const formData = await request.formData();
    const data = contactSchema.parse(Object.fromEntries(formData.entries()));

    if (!data.recaptcha_token) throw new Error("No token available");

    const url = new URL("https://www.google.com/recaptcha/api/siteverify");

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ??
      request.headers.get("cf-connecting-ip") ??
      request.headers.get("x-real-ip");

    url.searchParams.append("secret", env.CAPTCHA_SECRET);
    url.searchParams.append("response", data.recaptcha_token);
    url.searchParams.append("remoteip", ip ?? "");

    const res = await fetch(url, { method: "POST" });
    const captcha: { success: boolean; score: number } = await res.json();

    if (!captcha.success || captcha.score < 0.65)
      throw new Error("Something went wrong");
    const result = await sendContactMail(data);
    if (result.accepted.length > 0)
      return {
        success: true,
        message: "Message successfully sent",
      };
  } catch (err) {
    return { success: false, message: "Something went wrong" };
  }
}

export default function Home({}: Route.ComponentProps) {
  return (
    <article>
      <Hero />
      <About />
      <Services />
      <HomeBlog />
      <Contact />
      <Subscribe />
    </article>
  );
}
