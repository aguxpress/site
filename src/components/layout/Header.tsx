import { useContext, useState } from "react";
import { Link, useLocation } from "react-router";
import {
  IoCloseOutline,
  IoChevronDown,
  IoMenuOutline,
  IoLogoWhatsapp,
  // IoCallOutline,
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
  { item: "Start", url: "/start" },
  { item: "Track A Shipment", url: "/track" },
  {
    item: "Services",
    children: [
      { item: "Delivery", url: "/start/delivery" },
      { item: "Get Quotes", url: "/start/quote" },
      { item: "Relocation", url: "/start/relocation" },
      { item: "For Businesses", url: "/start/business" },
    ],
  },
  { item: "Contact", url: "/#contact" },
  { item: "Blog", url: "/blog" },
];

const Header = () => {
  const isHome = useLocation().pathname === "/";
  const context = useContext(ScrollContext);
  const isShadow = !context?.isPastTop && isHome;

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState<number | null>(null);

  const closeMobileMenu = () => {
    setIsMobileNavOpen(false);
    setOpenSubmenuIndex(null);
  };

  const handleSubmenuClick = (index: number) => {
    if (isMobileNavOpen) {
      setOpenSubmenuIndex(openSubmenuIndex === index ? null : index);
    }
  };

  return (
    <header
      className={cn([
        "drop-shadow-ax-black-d fixed top-0 z-4 flex h-[--spacing(var(--header-gap))] w-full items-center justify-between gap-6 px-4 py-4 transition-colors duration-300 sm:gap-7.5",
        isShadow ? "bg-transparent" : "bg-ax-red-a",
      ])}
    >
      <Link to="/" className="flex h-full drop-shadow-inherit">
        <img
          src={primaryLogo}
          loading="lazy"
          className={cn([
            "h-full w-auto drop-shadow-inherit",
            isShadow ? "drop-shadow-xs" : "drop-shadow-none",
          ])}
        />
      </Link>

      <nav
        className={cn([
          "bg-ax-white-a text-ax-black-d lg:text-shadow-ax-black-d/40 fixed top-0 -left-[300px] z-3 h-full w-full max-w-[300px] overflow-y-auto duration-500 ease-[cubic-bezier(0.33,0.85,0.4,0.96)] lg:visible lg:[all:unset]",
          isMobileNavOpen
            ? "visible translate-x-[300px]"
            : "invisible translate-x-0",
          isShadow ? "lg:text-shadow-lg" : "lg:text-shadow-none",
        ])}
      >
        <div className="align-center flex justify-between border-b border-b-gray-200 px-5 py-7.5 lg:hidden">
          <Link to="/" className="font-oswald text-3xl uppercase">
            AguXpress
          </Link>

          <button
            className="cursor-pointer text-2xl"
            aria-label="Close menu"
            onClick={closeMobileMenu}
          >
            <IoCloseOutline />
          </button>
        </div>

        <ul className="lg:flex">
          {headerMenu.map(({ item, url, children }, index) => {
            return (
              <li
                className="group relative text-nowrap not-last:border-b not-last:border-b-gray-200 lg:border-none lg:text-white"
                key={index}
                {...(children && { onClick: () => handleSubmenuClick(index) })}
              >
                <span
                  className={cn([
                    "cursor-pointer items-center justify-between hover:bg-gray-200 lg:hover:bg-[unset]",
                    children ? "flex" : "block",
                  ])}
                  {...(children && { tabIndex: 0 })}
                >
                  {url ? (
                    <Link
                      to={url}
                      className="block p-3.25"
                      onClick={closeMobileMenu}
                      prefetch="viewport"
                    >
                      {item}
                    </Link>
                  ) : (
                    <>
                      <span className="p-3.25 lg:pe-0">{item}</span>
                      <IoChevronDown
                        className={cn([
                          "lg:drop-shadow-ax-black-d/40 me-3.25",
                          isShadow
                            ? "lg:drop-shadow-lg"
                            : "lg:drop-shadow-none",
                        ])}
                      />
                    </>
                  )}
                </span>
                {children && (
                  <ul
                    className={cn([
                      "lg:text-ax-black-d overflow-hidden duration-250 lg:absolute lg:left-1/2 lg:hidden lg:max-h-[unset] lg:-translate-x-1/2 lg:rounded-sm lg:bg-white lg:text-center lg:text-shadow-none lg:group-focus-within:block lg:group-hover:block",
                      openSubmenuIndex === index
                        ? children.length <= 4
                          ? "max-h-40"
                          : "max-h-52"
                        : "max-h-0",
                    ])}
                  >
                    {children.map(({ item, url }, id) => (
                      <li
                        key={id}
                        className="lg:border-ax-black-d/10 hover:bg-gray-200 lg:not-last:border-b"
                      >
                        <Link
                          className="block py-1.25 ps-7.5 lg:px-4 lg:py-2.25"
                          to={url || "#"}
                          onClick={closeMobileMenu}
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <div
        className={cn([
          "lg:text-shadow-ax-black-d/50 ms-auto flex items-center gap-5 text-right lg:ms-0",
          isShadow
            ? "text-white lg:text-shadow-2xs"
            : "text-ax-yellow-a lg:text-shadow-none",
        ])}
      >
        <div className="hidden flex-col justify-center sm:flex">
          <p className="text-sm leading-[1.2] uppercase">Reach Out Now</p>

          <a
            href="tel:+2347087673400"
            className="text-xl leading-[1.2] font-semibold tracking-[1px] text-nowrap"
          >
            +234 708 767 3400
            {/* <IoCallOutline className="inline" /> */}
          </a>
        </div>
        <a
          href="https://wa.me/2347087673400"
          target="_blank"
          className={cn([
            "block p-0 text-[35px] duration-200 lg:text-4xl",
            isShadow &&
              "rounded-md bg-[#4FCE5D] p-1.5 text-2xl shadow-xs hover:bg-[#128C7E]",
          ])}
        >
          <IoLogoWhatsapp />
        </a>
      </div>

      <button
        className="text-ax-white-a cursor-pointer text-4xl drop-shadow-inherit lg:hidden"
        onClick={() => setIsMobileNavOpen(true)}
        aria-label="Open menu"
      >
        <IoMenuOutline
          className={cn([
            "ion-icon drop-shadow-inherit",
            isShadow ? "drop-shadow-xs" : "drop-shadow-none",
          ])}
        />
      </button>

      <div
        className={cn([
          "bg-ax-black-d fixed inset-0 z-2 duration-250 lg:invisible",
          isMobileNavOpen ? "visible opacity-60" : "invisible opacity-0",
        ])}
        onClick={closeMobileMenu}
      />
    </header>
  );
};

export default Header;
