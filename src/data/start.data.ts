import type { IconType } from "react-icons";
import { FaTruckFast, FaFileInvoice, FaBriefcase } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import type { StartFormFields } from "@/types/start.types";

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

export const startFormFieldsDesc: Record<keyof StartFormFields, string> = {
  // UserProps
  fullname: "Full Name",
  email: "Email",
  phone: "Phone Number",
  state: "State",
  city: "City",

  // RecipientProps
  recipient_fullname: "Recipient Full Name",
  recipient_email: "Recipient Email",
  recipient_phone: "Recipient Phone Number",

  // BusinessContactProps
  contact_fullname: "Contact Full Name",
  contact_email: "Contact Email",
  contact_phone: "Contact Phone Number",
  business_state: "Business State",
  business_city: "Business City",

  // SinglePackageOpts
  category: "Package Category",
  weight: "Weight (in KG)",
  size: "Package Size",
  truck_type: "Truck Type",

  // AddonsOpts
  pickup: "Pickup",
  pickup_address: "Pickup Address",
  insurance: "Insurance",

  // DestinationOpts
  destination_state: "Destination State",
  destination_city: "Destination City",
  street_address: "Street Address",

  // BusinessInfoOpts
  business_name: "Business Name",
  business_description: "Business Description",

  // BusinessRequestOpts
  service_description: "Service Description",
  frequency: "Frequency",
  comments: "Comments",

  // HomeInfoOpts
  home_size: "Home Size",
  home_floor: "Home Floor",
  relocation_date: "Relocation Date",

  // HomeItemsOpts
  beds: "Beds",
  sofas: "Sofas",
  tables: "Tables",
  fridges: "Fridges",
  washing_machines: "Washing Machines",
  big_drums: "Big Drums",
  large_items: "Large Items",

  // MovingInstructionsOpts
  covered_items: "Covered Items",
  labourers: "Labourers",
  truck_size: "Truck Size",
  budget: "Budget",
};
