import { env } from "./env.server";
import nodemailer from "nodemailer";

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

type AXService = "delivery" | "business" | "quote" | "relocation";
type BaseUserData =
  | { type: "user"; fullname: string; email: string }
  | { type: "business"; contact_fullname: string; contact_email: string };

export async function handleUserData<T extends BaseUserData>(
  service: AXService,
  userData: T,
  title: string,
): Promise<ApiResponse<T>> {
  const { type, ...acfData } = userData;

  try {
    const wpData = {
      title,
      status: "publish",
      acf: acfData,
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

    const isUser = type === "user";
    const fullname = isUser ? userData.fullname : userData.contact_fullname;
    const email = isUser ? userData.email : userData.contact_email;

    await transporter.sendMail({
      from: `"From: ${fullname}" <${email}>`,
      replyTo: email,
      to: env.APP_EMAIL,
      subject: title,
      text: `The user ${fullname} just made a ${service} request. Please check the ${service} section on the WordPress dashboard to get the full details.\nHere is an admin login link: https://blog.aguxpress.com/wp-admin`,
    });

    const data: WPResponse<T> = await response.json();
    return {
      data,
      message: "Successfully Created Request!",
      status: response.status,
    };
  } catch (error: any) {
    return { status: 500, error };
  }
}
