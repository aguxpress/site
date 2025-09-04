import { getAllArticles } from "@utils/graphql.server";
import type { Route } from "./+types";
import BlogItems from "@components/blog/BlogItems";

export async function loader({}: Route.LoaderArgs) {
  const articles = await getAllArticles();
  return { articles };
}

export default function Blog({ loaderData }: Route.ComponentProps) {
  return <BlogItems articles={loaderData.articles} />;
}
