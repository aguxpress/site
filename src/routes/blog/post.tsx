import { data } from "react-router";
import { getArticleById } from "@utils/graphql.server";
import type { Route } from "./+types/post";

export async function loader({ params }: Route.LoaderArgs) {
  const result = await getArticleById(params.postSlug);
  if (!result) throw data("Blog Post Not Found", { status: 404 });
  return { articleProps: result.post };
}

export default function Post({
  loaderData: { articleProps },
}: Route.ComponentProps) {
  return (
    <article>
      <figure className="aspect-[16/10]">
        <img
          src={articleProps?.featuredImage?.node.sourceUrl || ""}
          alt={articleProps?.featuredImage?.node.altText || ""}
          className="h-full w-full object-cover"
        />
      </figure>
      <div className="container">
        <h1 className="text-3xl">{articleProps?.title}</h1>
        <section>
          <div
            dangerouslySetInnerHTML={{ __html: articleProps?.content || "" }}
          />
        </section>
      </div>
    </article>
  );
}
