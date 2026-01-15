interface RouteSeoData {
  title: string;
  description: string;
  pathname: string;
  image?: string;
  type?: "website" | "article";
  suffix?: boolean;
}

const WEBSITE = "https://www.aguxpress.com";
const suff = (text: string) => `${text} | AguXpress`;

export const seo = ({
  title,
  description,
  pathname,
  image = `${WEBSITE}/ogimage.png`,
  type = "website",
  suffix = true,
}: RouteSeoData) => [
  { title: suffix ? title : suff(title) },
  {
    property: "og:title",
    content: suffix ? title : suff(title),
  },
  { name: "description", content: description },
  { property: "og:description", content: description },
  { property: "og:url", content: `${WEBSITE}/${pathname}` },
  { property: "og:image", content: image },
  { property: "og:site_name", content: "AguXpress" },
  { property: "og:type", content: type },
  { name: "twitter:card", content: "summary_large_image" },
];
