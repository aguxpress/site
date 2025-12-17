import { redirect } from "react-router";
import type { Route } from "./+types/grist";

// Route redirects to admin grist platform

export async function loader({}: Route.LoaderArgs) {
  throw redirect("https://aguxpress.getgrist.com");
}
