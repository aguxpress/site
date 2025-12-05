import {
  type RouteConfig,
  index,
  route,
  prefix,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  ...prefix("start", [
    index("routes/start.tsx"),
    route("delivery", "routes/forms/delivery.tsx"),
    route("relocation", "routes/forms/relocation.tsx"),
    route("business", "routes/forms/business.tsx"),
    route("quote", "routes/forms/quote.tsx"),
  ]),

  ...prefix("blog", [
    index("routes/blog/blog-list.tsx"),
    route(":postSlug", "routes/blog/blog-post.tsx"),
  ]),

  ...prefix("legal", [
    route("privacy-policy", "routes/blog/blog-post.tsx", { id: "privacy" }),
    route("terms-and-conditions", "routes/blog/blog-post.tsx", {
      id: "terms",
    }),
    route("cookies", "routes/blog/blog-post.tsx", { id: "cookies" }),
  ]),

  ...prefix("api", [route("contact", "routes/api/contact.ts")]),
] satisfies RouteConfig;
