import { z } from "zod";
import type { Route } from "./+types/home";
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
  const formData = await request.formData();
  const contactSchema = z.object({
    name: z.string().min(1),
    email: z.email(),
    phone: z.string(),
    message: z.string().min(1),
  });

  const data = contactSchema.parse(Object.fromEntries(formData.entries()));
  const result = await sendContactMail(data);
  return result;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <article>
      <Hero />
      <About />
      <Services />
      <HomeBlog articles={loaderData.articles} />
      <Contact />
      <Subscribe />
    </article>
  );
}
