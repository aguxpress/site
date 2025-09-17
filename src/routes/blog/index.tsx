import { Link } from "react-router";
import { getAllArticles } from "@utils/graphql.server";
import type { Route } from "./+types";

export async function loader({}: Route.LoaderArgs) {
  const articles = await getAllArticles();
  return { articles };
}

export default function Blog({
  loaderData: { articles },
}: Route.ComponentProps) {
  const posts = articles?.posts?.nodes || [];

  return (
    <section aria-label="blog" id="blog">
      <div className="container lg:max-w-7xl">
        <h2>News, Insights, and Innovations</h2>
        <br />

        <ul className="grid gap-7.5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map(
            ({ featuredImage, title, author, date, slug, excerpt }, key) => {
              const postDate = date ? new Date(date) : new Date();

              return (
                <li key={key} className="group">
                  <Link to={`/blog/${slug}`} className="block">
                    <figure className="shadow-ax-black-d/20 aspect-[770/500] shadow-sm duration-150 group-hover:scale-102 group-active:scale-102">
                      <img
                        src={
                          featuredImage?.node.sourceUrl ||
                          /* DEFAULT IMAGE */ ""
                        }
                        loading="lazy"
                        alt={
                          featuredImage?.node.sourceUrl ||
                          `Cover Image for ${slug}`
                        }
                        className="bg-ax-yellow-d h-full w-full object-cover"
                      />
                    </figure>

                    <div className="relative">
                      <h3 className="my-3 text-[1.375rem]">{title}</h3>
                      <div
                        className="line-clamp-2 text-[hsl(0,0%,24%)] lg:line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: excerpt || "" }}
                      />
                      <span className="my-3 block text-sm text-[hsl(0,0%,24%)]">
                        By{" "}
                        <span className="inline font-semibold">
                          {author?.node?.name || "AguXpress Team"}
                        </span>{" "}
                        —{" "}
                        <time dateTime={postDate.toISOString().split("T")[0]}>
                          {postDate.toLocaleString("en-GB", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </time>
                      </span>
                    </div>
                  </Link>
                </li>
              );
            },
          )}
        </ul>
      </div>
    </section>
  );
}
