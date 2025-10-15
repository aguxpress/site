import type { Route } from "./+types/contact";
import { z } from "zod";
import { sendContactMail } from "@utils/forms.server";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const contactSchema = z.object({
    name: z.string().min(1),
    email: z.email(),
    phone: z.string(),
    message: z.string().min(1),
  });

  const data = contactSchema.parse(Object.fromEntries(formData.entries()));
  const result = await sendContactMail(data);
  return result;
}
