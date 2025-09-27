import nodemailer from "nodemailer";
import { env } from "./env.server";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.APP_EMAIL,
    pass: env.APP_PASSWORD,
  },
});

interface EmailOptions {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const genId = (date = new Date()) =>
  `${date.toISOString().slice(0, 10)}-${Math.floor(1000 + Math.random() * 9000)}`;

export async function sendContactMail({
  name,
  email,
  phone,
  message,
}: EmailOptions) {
  return await transporter.sendMail({
    from: `"From: ${name}" <${env.APP_EMAIL}>`,
    replyTo: email,
    to: env.APP_EMAIL,
    cc: email,
    subject: `Website Inquiry ${genId()}`,
    text: `Sender: ${name}\nEmail: ${email}\nPhone Number: ${phone}\n\nMessage:\n${message}`,
  });
}
