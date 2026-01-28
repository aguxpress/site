import { data, redirect } from "react-router";
import type { Route } from "./+types/catchall";

const pages: Record<string, string> = {
  g: "https://aguxpress.getgrist.com",
  wp: "https://blog.aguxpress.com/wp-admin",
};

export async function loader({ params }: Route.LoaderArgs) {
  const { "*": splat } = params;
  if (pages[splat]) throw redirect(pages[splat]);
  throw data("Page Not Found", { status: 404 });
}

export default function CatchAll() {
  return null;
}
