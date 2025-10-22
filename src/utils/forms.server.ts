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

interface WPResponse<T> {
  id: number;
  status: "publish";
  acf: T;
}

interface ApiResponse<Data> {
  data?: WPResponse<Data>;
  message?: string;
  status: number;
  error?: string;
}

const basicAuth = `Basic ${btoa(`${env.WP_USERNAME}:${env.WP_PASSWORD}`)}`;
type AXRequest = "delivery";

export async function handleUserData<
  T extends { fullname: string; email: string },
>(service: AXRequest, userData: T, title: string): Promise<ApiResponse<T>> {
  try {
    const wpData = {
      title,
      status: "publish",
      acf: userData,
    };

    const response = await fetch(`${env.WP_REST_URI}/${service}`, {
      method: "POST",
      headers: {
        Authorization: basicAuth,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(wpData),
    });
    if (!response.ok) throw new Error(response.statusText);

    await transporter.sendMail({
      from: `"From: ${userData.fullname}" <${userData.email}>`,
      replyTo: userData.email,
      to: env.APP_EMAIL,
      subject: title,
      text: JSON.stringify(userData).replace(/[{}"]/g, "").replace(/,/g, "\n"),
    });

    const result: WPResponse<T> = await response.json();
    return {
      data: result,
      message: "Successfully Created Request!",
      status: response.status,
    };
  } catch (error: any) {
    return { status: 500, error };
  }
}
