import { Link } from "react-router";
import type { Route } from "./+types/start";
import type { IconType } from "react-icons";
import { FaTruckFast, FaFileInvoice, FaBriefcase } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";

interface Service {
  title: string;
  description: string;
  icon: IconType;
  url: string;
}

const services: Service[] = [
  {
    title: "Delivery",
    description: "Fast and reliable package delivery to any location",
    icon: FaTruckFast,
    url: "delivery",
  },
  // {
  //   title: "Relocation",
  //   description: "Secure relocation for homes",
  //   icon: FaHome,
  //   url: "relocation",
  // },
  // {
  //   title: "Quotes",
  //   description: "Get instant price estimates tailored to your needs",
  //   icon: FaFileInvoice,
  //   url: "quote",
  // },
  // {
  //   title: "Business",
  //   description: "Partner solutions and logistics support for businesses",
  //   icon: FaBriefcase,
  //   url: "business",
  // },
];

export default function Start({}: Route.ComponentProps) {
  return (
    <section aria-label="Get Started">
      <div className="container">
        <span className="headline">Getting Started</span>
        <h2>How can we help you today?</h2>
        <div className="grid grid-cols-2 gap-5 pt-8 lg:grid-cols-4">
          {services.map(({ title, description, icon: IoIcon, url }, index) => (
            <Link
              to={url}
              className="group rounded-lg bg-white px-4 py-8 shadow transition hover:scale-102 hover:shadow-lg"
              key={index}
            >
              <IoIcon className="group-hover:text-ax-yellow-a mx-auto text-7xl text-gray-300 transition" />
              <h3 className="font-rubik text-ax-black-d my-3 text-center text-lg">
                {title}
              </h3>
              <p className="text-center text-sm">{description}</p>
            </Link>
          ))}
        </div>
        <span className="font-oswald text-ax-black-d my-12 text-center text-3xl font-bold">
          OR
        </span>
        <Link
          to="/#contact"
          className="hover:bg-ax-yellow-a border-ax-yellow-a bg-ax-yellow-a/10 mx-auto block max-w-max border px-5 py-2 text-sm font-medium uppercase shadow transition-colors duration-400 md:px-10 md:py-4 md:text-base"
        >
          Custom Request
        </Link>
      </div>
    </section>
  );
}
