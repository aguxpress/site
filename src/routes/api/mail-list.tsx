import { subscribeVisitor } from "@services/zoho.services";
import type { Route } from "./+types/mail-list";
import { dataError } from "@utils/helpers.server";

export const action = async ({ request }: Route.ActionArgs) => {
  const data = await request.formData();
  const email = data.get("email_address");
  if (!email) return dataError("User Email not found!", 400);
  const res = await subscribeVisitor(email as string);
  return res;
};
