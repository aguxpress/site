import nodemailer from "nodemailer";
import { env } from "@utils/env.server";
import type { ContactMessageData } from "@/types/helpers.types";
import { dataError, shortId } from "@utils/helpers.server";
import type { StartFormFields } from "@/types/start.types";
import { generateHTML } from "@components/email/startForms";
import type { QuoteData } from "src/routes/start/quote";
import type { Relocation } from "src/routes/start/relocation";
import type { BusinessData } from "src/routes/start/business";
import type { DeliveryData } from "src/routes/start/delivery";

const CONFIGURED_SENDER = `"Automated Forward >>" <${env.APP_EMAIL}>`;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.APP_EMAIL,
    pass: env.APP_PASSWORD,
  },
});

async function sendContactMessage({
  name,
  email,
  phone,
  message,
}: ContactMessageData) {
  const res = await transporter.sendMail({
    from: CONFIGURED_SENDER,
    replyTo: email,
    to: env.APP_EMAIL,
    cc: email,
    subject: `Website Inquiry #${shortId()}`,
    text: `Sender: ${name}\nEmail: ${email}\nPhone Number: ${phone}\n\nMessage:\n${message}`,
  });
  return res;
}

interface FormDetails<T> {
  title: string;
  submittedData: T;
}

async function sendFormDetails<
  T extends QuoteData | Relocation | BusinessData | DeliveryData,
>({ title, submittedData }: FormDetails<T>) {
  const userEmail =
    submittedData.__formtype === "business"
      ? submittedData.contact_email
      : submittedData.email;
  const htmlPayload = await generateHTML<T>(submittedData);

  const res = await transporter.sendMail({
    from: CONFIGURED_SENDER,
    replyTo: userEmail,
    to: env.APP_EMAIL,
    cc: userEmail,
    subject: `${title} #${shortId()}`,
    html: htmlPayload,
  });

  if (res.rejected[0] === env.APP_EMAIL) {
    return dataError("Notification Email could not be sent to admin");
  }

  return res;
}

export { sendContactMessage, sendFormDetails };
