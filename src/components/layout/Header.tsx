import { useContext, useState } from "react";
import { Link, useLocation } from "react-router";
import {
  IoCloseOutline,
  IoChevronDown,
  IoCallOutline,
  IoMenuOutline,
  IoLogoWhatsapp,
} from "react-icons/io5";
import primaryLogo from "@logos/primary.png";
import { cn } from "@utils/display.utils";
import { ScrollContext } from "@utils/context.utils";

type HeaderMenu = Array<
  { item: string } & (
    | { url?: never; children?: Array<{ item: string; url?: string }> }
    | { url?: string; children?: never }
  )
>;

const headerMenu: HeaderMenu = [
  { item: "Home", url: "/#home" },
  { item: "About", url: "/#about" },
  {
    item: "Services",
    children: [
      { item: "Haulage" },
      { item: "Dispatch" },
      { item: "Pickup" },
      { item: "Insurance Coverage" },
      { item: "Escrow" },
    ],
  },
  {
    item: "Shipping",
    children: [
      { item: "Ship a Package" },
      { item: "Get a Quote" },
      { item: "Schedule a Pickup" },
      { item: "Shipping History" },
    ],
  },
  { item: "Contact", url: "/#contact" },
  { item: "Blog", url: "/blog" },
];

const Header = () => {
  const isHome = useLocation().pathname === "/";
  const context = useContext(ScrollContext);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <header
      className={cn([
        "lg:text-shadow-ax-black-d/40 fixed top-0 z-4 flex h-[--spacing(var(--header-gap))] w-full items-center justify-between gap-7.5 px-4 py-4",
        isHome && !context?.isPastTop ? "bg-transparent" : "bg-ax-red-a",
        !context?.isPastTop ? "lg:text-shadow-lg" : "lg:text-shadow-none",
      ])}
    >
      <Link to="/" className="flex h-full">
        <img
          src={primaryLogo}
          loading="lazy"
          className={cn([
            "drop-shadow-ax-black-d h-full w-auto",
            context?.isPastTop ? "drop-shadow-none" : "drop-shadow-xs",
          ])}
        />
      </Link>

      <nav
        className={cn([
          "bg-ax-white-a text-ax-black-d fixed top-0 left-0 z-3 h-full w-full max-w-[300px] overflow-y-auto lg:visible lg:[all:unset]",
          isMobileNavOpen ? "visible" : "invisible",
        ])}
      >
        <div className="align-center flex justify-between border-b border-b-gray-200 px-5 py-7.5 lg:hidden">
          <Link to="/" className="font-oswald text-3xl uppercase">
            AguXpress
          </Link>

          <button
            className="cursor-pointer text-2xl"
            aria-label="Close menu"
            onClick={() => setIsMobileNavOpen(false)}
          >
            <IoCloseOutline />
          </button>
        </div>

        <ul className="lg:flex">
          {headerMenu.map(({ item, url, children }, index) => {
            return (
              <li
                className="cursor-pointer not-last:border-b not-last:border-b-gray-200 lg:border-none lg:text-white"
                key={index}
              >
                <span className="flex items-center justify-between">
                  {url ? (
                    <Link to={url} className="p-3.75">
                      {item}
                    </Link>
                  ) : (
                    <>
                      <span className="p-3.75 lg:pe-0">{item}</span>
                      <IoChevronDown className="lg:me-3.75" />
                    </>
                  )}
                </span>
                {children && (
                  <ul className="nav-children lg:text-ax-white-a lg:hidden">
                    {children.map(({ item }, index) => (
                      <li key={index} className="py-1.25 ps-7.5">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="text-ax-yellow-a lg:text-shadow-ax-black-d/90 ms-auto hidden items-center gap-5 text-right sm:flex lg:ms-0">
        <div>
          <p className="text-sm leading-[1.2] uppercase">Reach Out Now</p>

          <a
            href="tel:+2347087673400"
            className="text-xl leading-[1.2] font-semibold tracking-[1px] lg:text-3xl"
          >
            0708 767 3400
          </a>
        </div>
        <div className="flex text-[35px] opacity-75 lg:text-5xl">
          <IoLogoWhatsapp />
          {/* <IoCallOutline /> */}
        </div>
      </div>

      <button
        className="text-ax-white-a cursor-pointer text-4xl lg:hidden"
        onClick={() => setIsMobileNavOpen(true)}
        aria-label="Open menu"
      >
        <IoMenuOutline className="ion-icon" />
      </button>

      <div
        className={cn([
          "bg-ax-black-d fixed inset-0 z-2 opacity-60",
          isMobileNavOpen ? "visible" : "invisible",
        ])}
        onClick={() => setIsMobileNavOpen(false)}
      />
    </header>
  );
};

export default Header;
