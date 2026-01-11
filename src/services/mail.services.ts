import { env } from "@utils/env.server";
import nodemailer from "nodemailer";
import type { ContactMessageData } from "@/types/contact.types";
import { shortId } from "@utils/helpers.server";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.APP_EMAIL,
    pass: env.APP_PASSWORD,
  },
});

export async function sendContactMessage({
  name,
  email,
  phone,
  message,
}: ContactMessageData) {
  const res = await transporter.sendMail({
    from: `"Automated Forward >>" <${env.APP_EMAIL}>`,
    replyTo: email,
    to: env.APP_EMAIL,
    cc: email,
    subject: `Website Inquiry #${shortId()}`,
    text: `Sender: ${name}\nEmail: ${email}\nPhone Number: ${phone}\n\nMessage:\n${message}`,
  });
  return res;
}
