import type { Route } from "./+types/home";
import Hero from "@components/home/Hero";
import About from "@components/home/About";
import Services from "@components/home/Services";
import HomeBlog from "@components/home/HomeBlog";
import Contact from "@components/home/Contact";
import Subscribe from "@components/shared/Subscribe";
import { getPublishedArticles } from "@services/blog.services";
import { handleVisitorMessage } from "@services/contact.services";
import { sendContactMessage } from "@services/mail.services";

export async function loader({}: Route.LoaderArgs) {
  const articles = getPublishedArticles(2);
  return { articles };
}

export async function action({ request }: Route.ActionArgs) {
  const headers = request.headers;
  const formData = await request.formData();
  const result = await handleVisitorMessage({ headers, formData });
  const mailRes = await sendContactMessage(result);
  return mailRes;
}

export default function Home() {
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
