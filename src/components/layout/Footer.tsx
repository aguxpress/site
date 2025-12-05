import { Link } from "react-router";
import type { IconType } from "react-icons";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoTiktok,
  IoLogoLinkedin,
  IoLogoWhatsapp,
} from "react-icons/io5";
import { RiTwitterXFill } from "react-icons/ri";
import primaryLogo from "@logos/primary.svg";
import { cn } from "@utils/display.utils";

interface Handle {
  url: string;
  icon: IconType;
  theme: `hover:bg-[#${string}]`;
}

const socials: Handle[] = [
  {
    url: "https://www.facebook.com/aguxpress",
    icon: IoLogoFacebook,
    theme: "hover:bg-[#1877F2]",
  },
  {
    url: "https://instagram.com/aguxpress",
    icon: IoLogoInstagram,
    theme: "hover:bg-[#833AB4]",
  },
  {
    url: "https://x.com/aguxpress",
    icon: RiTwitterXFill,
    theme: "hover:bg-[#000]",
  },
  {
    url: "https://tiktok.com/@aguxpress",
    icon: IoLogoTiktok,
    theme: "hover:bg-[#010101]",
  },
  {
    url: "https://www.linkedin.com/company/aguxpress/",
    icon: IoLogoLinkedin,
    theme: "hover:bg-[#0072b1]",
  },
  {
    url: "https://wa.me/+2347087673400",
    icon: IoLogoWhatsapp,
    theme: "hover:bg-[#4FCE5D]",
  },
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
      { name: "Privacy Policy", url: "/legal/privacy-policy" },
      { name: "Terms & Conditions", url: "/legal/terms-and-conditions" },
      { name: "Cookie Policy", url: "/legal/cookies" },
    ],
  },
];

const Footer = () => (
  <footer className="bg-ax-black-d text-ax-white-a">
    <div className="container">
      <div className="grid gap-10 py-12.5 md:grid-cols-[1fr_1fr] lg:grid-cols-[repeat(4,1fr)] lg:py-30">
        <div className="">
          <Link to="#" className="block">
            <img src={primaryLogo} width="200" height="200" loading="lazy" />
          </Link>

          <address className="mt-2.5 mb-7.5 leading-[1.7] not-italic">
            Ozoagu Plaza, Aroma Junction (Enugu-Onitsha Expressway), <br />
            Awka, Anambra State, Nigeria
            <br />
            {/* Reserved for official contact email */}
            {/* <a href="">contact@aguxpress.com</a>
            <br /> */}
            <a href="tel:+2347087673400">+234 708 767 3400</a>
          </address>

          <ul className="flex flex-wrap gap-2.5 md:flex-nowrap">
            {socials.map(({ url, icon: IoIcon, theme }, index) => (
              <li key={index}>
                <a
                  href={url}
                  target="_blank"
                  className={cn([
                    "bg-ax-red-a block p-3 text-xl text-white transition-colors duration-500",
                    theme,
                  ])}
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

      <div className="border-ax-white-a border-t py-10 text-sm lg:text-center">
        <p>&copy; {new Date().getFullYear()} AguXpress. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
