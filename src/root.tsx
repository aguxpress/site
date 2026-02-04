import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import type { Route } from "./+types/root";
import Header from "@components/shared/Header";
import Footer from "@components/shared/Footer";
import BackToTop from "@components/shared/BackToTop";
import { ScrollContext } from "src/context/ScrollContext";
import "./app.css";
import { seo } from "@data/seo.data";

export const links: Route.LinksFunction = () => [
  { rel: "shortcut icon", href: "/icon.svg", type: "image/svg+xml" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=Rubik:wght@400;500;600;700&display=swap",
  },
];

export const meta: Route.MetaFunction = ({
  location: { pathname },
}: Route.MetaArgs) =>
  seo({
    title: "AguXpress | Logistics Made Easy",
    description:
      "AguXpress delivers more than just packages — we deliver peace of mind.",
    pathname,
    isSuffix: false,
  });

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <script
          defer
          src="https://www.google.com/recaptcha/api.js?render=6Lc6Ww0sAAAAAHJkl4w6EUBB_4FZ9ks9yC6SzPvM"
        />
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-TQC9PY1W64"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TQC9PY1W64');`,
          }}
        />
      </head>
      <body className="text-ax-black-a bg-ax-white-a">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Apps() {
  const [isPastTop, setIsPastTop] = useState(false);

  return (
    <ScrollContext value={{ isPastTop, setIsPastTop }}>
      <Header />
      <Toaster />
      <main className="pt-[--spacing(var(--header-gap))]">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </ScrollContext>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
