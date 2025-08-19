import { Link } from "react-router";
import { IoChevronUp } from "react-icons/io5";

const BackToTop = () => (
  <Link
    to="#"
    className="bg-ax-black-a text-ax-white-a hover:bg-ax-black-d fixed right-5 bottom-5 z-3 p-2.5 text-xl"
    aria-label="Back to top"
  >
    <IoChevronUp />
  </Link>
);

export default BackToTop;
