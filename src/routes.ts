import {
  type RouteConfig,
  index,
  route,
  prefix,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("track", "routes/track.tsx"),

  ...prefix("start", [
    index("routes/start/index.tsx"),
    route("delivery", "routes/start/delivery.tsx"),
    route("relocation", "routes/start/relocation.tsx"),
    route("business", "routes/start/business.tsx"),
    route("quote", "routes/start/quote.tsx"),
  ]),

  ...prefix("blog", [
    index("routes/blog/index.tsx"),
    route(":postSlug", "routes/blog/post.tsx"),
  ]),

  ...prefix("legal", [
    route("privacy-policy", "routes/blog/post.tsx", { id: "privacy" }),
    route("terms-and-conditions", "routes/blog/post.tsx", {
      id: "terms",
    }),
    route("cookies", "routes/blog/post.tsx", { id: "cookies" }),
  ]),

  ...prefix("api", [route("mail-list", "routes/api/mail-list.tsx")]),

  route("grist", "routes/grist.tsx"),
  route("g", "routes/grist.tsx", { id: "g" }),
] satisfies RouteConfig;
