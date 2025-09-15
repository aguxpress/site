import type { Route } from "./+types/home";
import Hero from "@components/home/Hero";
import About from "@components/home/About";
import Services from "@components/home/Services";
import HomeBlog from "@components/home/HomeBlog";
import Contact from "@components/home/Contact";
import Subscribe from "@components/home/Subscribe";
import { getAllArticles } from "@utils/graphql.server";

export async function loader({}: Route.LoaderArgs) {
  const articles = await getAllArticles(2);
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
