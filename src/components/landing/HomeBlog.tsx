import { Link } from "react-router";
import { IoChevronForward } from "react-icons/io5";
import type { GetArticlesQuery } from "@/types/__generated__/graphql";

interface HomeBlogProps {
  articles?: GetArticlesQuery;
}

const HomeBlog = ({ articles }: HomeBlogProps) => {
  const posts = articles?.posts?.nodes || [];

  return (
    <section aria-label="blog" id="blog">
      <div className="container">
        <p className="headline">Stay Informed. Stay Ahead.</p>

        <h2>What's New in the World of Logistics</h2>
        <br />

        <ul className="grid gap-7.5">
          {posts.map(({ featuredImage, title, date, slug, excerpt }, key) => {
            const postDate = date ? new Date(date) : new Date();

            return (
              <li key={key}>
                <div>
                  <figure className="aspect-[770/500]">
                    <img
                      src={
                        featuredImage?.node.sourceUrl || /* DEFAULT IMAGE */ ""
                      }
                      width="770"
                      height="500"
                      loading="lazy"
                      alt={
                        featuredImage?.node.sourceUrl ||
                        `Cover Image for ${slug}`
                      }
                      className="h-full w-full object-cover"
                    />
                  </figure>

                  <div className="relative">
                    <time
                      className="bg-ax-red-a font-oswald my-[--spacing(-20)_--spacing(5)] ms-auto me-5 block max-w-max px-6 py-5 text-center text-[length:--spacing(5.5)] leading-normal font-semibold text-white"
                      dateTime={postDate.toISOString().split("T")[0]}
                    >
                      <span className="text-ax-yellow-a text-4xl leading-[0.75] font-bold">
                        {postDate.getDate().toString().padStart(2, "0")}
                      </span>
                      {postDate.toLocaleString("en-US", { month: "long" })}
                    </time>

                    <h3 className="text-[1.375rem]">
                      <Link to={`/blog/${slug}`} className="block">
                        {title}
                      </Link>
                    </h3>
                    <div
                      className="my-6 text-[hsl(0,0%,24%)]"
                      dangerouslySetInnerHTML={{ __html: excerpt || "" }}
                    />

                    <Link
                      to={`/blog/${slug}`}
                      className="text-ax-yellow-a flex items-center gap-1.5 overflow-hidden text-lg uppercase"
                    >
                      <IoChevronForward aria-hidden />
                      <span className="span">Read More</span>
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default HomeBlog;
