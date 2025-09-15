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
  const postDate = articleProps?.date
    ? new Date(articleProps.date)
    : new Date();

  return (
    <article>
      <div className="container">
        <h1 className="my-3 text-3xl">{articleProps?.title}</h1>
        <div className="text-sm">
          By{" "}
          <span className="inline font-semibold">
            {articleProps?.author?.node.name}
          </span>{" "}
          —{" "}
          <time dateTime={postDate.toISOString().split("T")[0]}>
            {postDate.toLocaleString("en-GB", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </time>
        </div>
        <figure className="shadow-ax-black-d/20 mt-3 mb-12 -ml-[3%] aspect-[16/10] w-[106%] lg:-ml-[1%] lg:w-[102%]">
          <img
            src={articleProps?.featuredImage?.node.sourceUrl || ""}
            alt={articleProps?.featuredImage?.node.altText || ""}
            className="bg-ax-yellow-d h-full w-full rounded-md object-cover shadow-sm"
          />
        </figure>
        <div
          className="prose prose-stone mb-12 max-w-none"
          dangerouslySetInnerHTML={{ __html: articleProps?.content || "" }}
        />
      </div>
    </article>
  );
}
