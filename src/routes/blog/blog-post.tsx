import { data } from "react-router";
import { getArticleById } from "@utils/graphql.server";
import type { Route } from "./+types/blog-post";

export async function loader({ params, request }: Route.LoaderArgs) {
  const postId = params.postSlug || new URL(request.url).pathname;
  const article = await getArticleById(postId);
  if (!article) throw data("Blog Post Not Found", { status: 404 });
  return { article };
}

export default function Post({
  loaderData: { article },
}: Route.ComponentProps) {
  const isBlogPost = article.__typename === "Post";
  const postDate = new Date(
    (isBlogPost ? article.date : article.modified) ?? Date.now(),
  );

  return (
    <article>
      <div className="container">
        <h1 className="my-3 text-3xl md:my-7 lg:text-5xl">{article.title}</h1>
        <div className="mb-3 text-sm md:mb-7 lg:text-base">
          {isBlogPost ? (
            <>
              By{" "}
              <span className="inline font-semibold">
                {article.author?.node.name}
              </span>{" "}
            </>
          ) : (
            <>Last Updated</>
          )}
          —{" "}
          <time dateTime={postDate.toISOString().split("T")[0]}>
            {postDate.toLocaleString("en-GB", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </time>
        </div>
        {isBlogPost && (
          <figure className="shadow-ax-black-d/20 mb-12 -ml-[3%] aspect-16/10 w-[106%] lg:-ml-[1%] lg:w-[102%]">
            <img
              src={article?.featuredImage?.node.sourceUrl || ""}
              alt={article?.featuredImage?.node.altText || ""}
              className="bg-ax-yellow-d h-full w-full rounded-md object-cover shadow-sm"
            />
          </figure>
        )}
        <div
          className="prose prose-stone mb-12.5 max-w-none lg:mb-30"
          dangerouslySetInnerHTML={{ __html: article?.content || "" }}
        />
      </div>
    </article>
  );
}
