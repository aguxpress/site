import type { Route } from "./+types/home";
import Hero from "@components/landing/Hero";
import About from "@components/landing/About";
import Services from "@components/landing/Services";
import HomeBlog from "@components/landing/HomeBlog";
import Contact from "@components/landing/Contact";
import Subscribe from "@components/landing/Subscribe";
import { getAllArticles } from "@utils/graphql.server";

export async function loader({}: Route.LoaderArgs) {
  const articles = await getAllArticles();
  return { articles };
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
