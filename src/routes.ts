import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("blog", "routes/blog/index.tsx"),
  route("blog/:postSlug", "routes/blog/post.tsx"),
  route("ship", "routes/forms/ship.tsx"),
  route("quote", "routes/forms/quote.tsx"),
  route("pickup", "routes/forms/pickup.tsx"),
  route("escrow", "routes/forms/escrow.tsx"),
] satisfies RouteConfig;
