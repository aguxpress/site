import { Link } from "react-router";
import { IoChevronForward } from "react-icons/io5";
import deliveryMan from "@images/delivery-man.png";
import blogTruck from "@images/blog-truck.jpg";

interface Article {
  coverImg: string;
  imgAlt: string;
  title: string;
  date: Date;
  excerpt: string;
}

const articles: Article[] = [
  {
    coverImg: blogTruck,
    imgAlt: "Truck",
    title: "How Logistics Insurance Saves you from unexpected Loss",
    date: new Date("2025-08-07"),
    excerpt:
      "Accidents happen — but you shouldn't have to bear the loss alone. This blog post explains how goods insurance protects you during transit. From valuable electronics to fragile furniture, coverage matters. Find out how to secure peace of mind on every shipment.",
  },
  {
    coverImg: deliveryMan,
    imgAlt: "Delivery Man",
    title: "5 Common Delivery Mistakes and How to Avoid Them",
    date: new Date("2025-06-15"),
    excerpt:
      "Late packages, missing items, and poor communication — these are mistakes no customer wants to deal with. This article breaks down the most common logistics pitfalls and how to fix them. Whether you're a sender or receiver, these tips will save you stress. Stay ahead of the game with smarter delivery choices.",
  },
];

const HomeBlog = () => (
  <section aria-label="blog" id="blog">
    <div className="container">
      <p className="headline">Stay Informed. Stay Ahead.</p>

      <h2>What's New in the World of Logistics</h2>
      <br />

      <ul className="grid gap-7.5">
        {articles.map(({ coverImg, title, date, excerpt }, key) => (
          <li key={key}>
            <div>
              <figure className="aspect-[770/500]">
                <img
                  src={coverImg}
                  width="770"
                  height="500"
                  loading="lazy"
                  alt="lorem ipsum"
                  className="h-full w-full object-cover"
                />
              </figure>

              <div className="relative">
                <time
                  className="bg-ax-red-a font-oswald my-[--spacing(-20)_--spacing(5)] ms-auto me-5 block max-w-max px-6 py-5 text-center text-[length:--spacing(5.5)] leading-normal font-semibold text-white"
                  dateTime={date.toISOString().split("T")[0]}
                >
                  <span className="text-ax-yellow-a text-4xl leading-[0.75] font-bold">
                    {date.getDate().toString().padStart(2, "0")}
                  </span>
                  {date.toLocaleString("en-US", { month: "long" })}
                </time>

                <h3 className="text-[1.375rem]">
                  <Link to="#" className="block">
                    {title}
                  </Link>
                </h3>

                <p className="my-6 text-[hsl(0,0%,24%)]">{excerpt}</p>

                <Link
                  to="#"
                  className="text-ax-yellow-a flex items-center gap-1.5 overflow-hidden text-lg uppercase"
                >
                  <IoChevronForward aria-hidden />
                  <span className="span">Read More</span>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default HomeBlog;
