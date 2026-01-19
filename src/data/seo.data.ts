interface RouteSeoData {
  title: string;
  description: string;
  pathname: string;
  image?: string;
  type?: "website" | "article";
  isSuffix?: boolean;
}

const WEBSITE = "https://www.aguxpress.com";
const suff = (isSuffix: boolean, text: string) =>
  isSuffix ? `${text} | AguXpress` : text;

export const seo = ({
  title,
  description,
  pathname,
  image = `${WEBSITE}/ogimage.png`,
  type = "website",
  isSuffix = true,
}: RouteSeoData) => [
  { title: suff(isSuffix, title) },
  {
    property: "og:title",
    content: suff(isSuffix, title),
  },
  { name: "description", content: description },
  { property: "og:description", content: description },
  { property: "og:url", content: `${WEBSITE}/${pathname}` },
  { property: "og:image", content: image },
  { property: "og:site_name", content: "AguXpress" },
  { property: "og:type", content: type },
  { name: "twitter:card", content: "summary_large_image" },
];
