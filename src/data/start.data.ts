import type { IconType } from "react-icons";
import { FaTruckFast, FaFileInvoice, FaBriefcase } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";

interface Service {
  title: string;
  description: string;
  icon: IconType;
  url: string;
}

export const services: Service[] = [
  {
    title: "Delivery",
    description: "Fast and reliable parcel/haulage delivery to any location",
    icon: FaTruckFast,
    url: "delivery",
  },
  {
    title: "Relocation",
    description: "Secure relocation for homes",
    icon: FaHome,
    url: "relocation",
  },
  {
    title: "Quotes",
    description: "Get instant price estimates tailored to your needs",
    icon: FaFileInvoice,
    url: "quote",
  },
  {
    title: "Business",
    description: "Partner solutions and logistics support for businesses",
    icon: FaBriefcase,
    url: "business",
  },
];
