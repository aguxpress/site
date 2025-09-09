import { Link } from "react-router";
import type { IconType } from "react-icons";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoTiktok,
  IoLogoLinkedin,
  IoLogoWhatsapp,
} from "react-icons/io5";
import alternateLogo from "@logos/alternate.png";

interface Handle {
  url: string;
  icon: IconType;
}

const socials: Handle[] = [
  { url: "https://www.facebook.com/aguxpress", icon: IoLogoFacebook },
  { url: "https://instagram.com/aguxpress", icon: IoLogoInstagram },
  { url: "https://x.com/aguxpress", icon: IoLogoTwitter },
  { url: "https://tiktok.com/@aguxpress", icon: IoLogoTiktok },
  { url: "https://www.linkedin.com/company/aguxpress/", icon: IoLogoLinkedin },
  { url: "https://wa.me/+2347087673400", icon: IoLogoWhatsapp },
];

interface FooterLinkSection {
  title: string;
  links: { name: string; url?: string }[];
}

const footerLinks: FooterLinkSection[] = [
  {
    title: "Quick Links",
    links: [
      { name: "About" },
      { name: "Services" },
      { name: "Shipping", url: "/ship" },
      { name: "Blog", url: "/blog" },
      { name: "Contact Us" },
    ],
  },
  {
    title: "Services",
    links: [
      { name: "Haulage" },
      { name: "Dispatch" },
      { name: "Pickup", url: "/pickup" },
      { name: "Insurance Coverage" },
      { name: "Escrow", url: "/escrow" },
      { name: "Quote", url: "/quote" },
    ],
  },
  {
    title: "Community",
    links: [
      { name: "FAQ" },
      { name: "Testimonials" },
      { name: "Privacy Policy" },
      { name: "Terms & Condition" },
    ],
  },
];

const Footer = () => (
  <footer>
    <div className="container">
      <div className="grid gap-10 py-12.5 md:grid-cols-[1fr_1fr] lg:grid-cols-[repeat(4,1fr)] lg:py-30">
        <div className="">
          <Link to="#" className="block">
            <img src={alternateLogo} width="200" height="200" loading="lazy" />
          </Link>

          <p className="mt-2.5 mb-7.5 leading-[1.7]">
            AguXpress delivers more than packages — we deliver peace of mind
            with fast, secure, and insured logistics across Nigeria.
          </p>

          <ul className="flex gap-2.5">
            {socials.map(({ url, icon: IoIcon }, index) => (
              <li key={index}>
                <a
                  href={url}
                  className="bg-ax-red-a block p-3 text-xl text-white"
                >
                  <IoIcon />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {footerLinks.map(({ title, links }, index) => (
          <div key={index}>
            <span className="mb-5 max-w-max text-xl">{title}</span>
            <ul>
              {links.map(({ name, url }, index) => (
                <li key={index}>
                  <Link to={url ?? "/"} className="block py-1.5">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-ax-black-a border-t py-10 text-sm lg:text-center">
        <p>&copy; {new Date().getFullYear()} AguXpress. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
