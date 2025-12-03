import { useEffect, useContext } from "react";
import { Link } from "react-router";
import { IoChevronUp } from "react-icons/io5";
import { ScrollContext } from "@utils/context.utils";
import { cn } from "@utils/display.utils";

const BackToTop = () => {
  const context = useContext(ScrollContext);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY >= 20
        ? context?.setIsPastTop(true)
        : context?.setIsPastTop(false);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Link
      to="#"
      className={cn([
        "bg-ax-black-a text-ax-white-a hover:bg-ax-black-d fixed right-5 bottom-5 z-3 p-2.5 text-xl",
        context?.isPastTop ? "visible" : "invisible",
      ])}
      aria-label="Back to top"
    >
      <IoChevronUp />
    </Link>
  );
};

export default BackToTop;
