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
    index("routes/blog/index.tsx"),
    route(":postSlug", "routes/blog/post.tsx"),
  ]),

  // ...prefix("", [
  //   route("ship", "routes/forms/ship.tsx"),
  //   route("quote", "routes/forms/quote.tsx"),
  //   route("escrow", "routes/forms/escrow.tsx"),
  // ]),

  ...prefix("api", [route("contact", "routes/api/contact.ts")]),
] satisfies RouteConfig;
