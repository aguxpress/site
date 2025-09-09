import { IoChevronForward } from "react-icons/io5";
import homeGarden from "@assets/icons/home-garden.svg";
import building from "@assets/icons/building.svg";
import delivery from "@assets/icons/delivery.svg";
import medicals from "@assets/icons/medicals.svg";
import shield from "@assets/icons/shield.svg";
import inventory from "@assets/icons/inventory.svg";

interface ServiceItem {
  title: string;
  icon: string;
  imgAlt: string;
  description: string;
}

const list: ServiceItem[] = [
  {
    title: "Haulage",
    icon: homeGarden,
    imgAlt: "Truck",
    description:
      "Our Haulage Service supports individuals and businesses with large-scale transportation needs — including relocation of household or office items.",
  },
  {
    title: "Dispatch",
    icon: building,
    imgAlt: "Ship",
    description:
      "With our Dispatch Service, we help individuals and businesses send out packages, documents, or products to their desired destinations efficiently.",
  },
  {
    title: "Pickup",
    icon: delivery,
    imgAlt: "Airplane",
    description:
      "Our Pickup Service offers convenient item collection on behalf of individuals and businesses.",
  },
  {
    title: "Insurance Coverage",
    icon: medicals,
    imgAlt: "Train",
    description:
      "Our Goods Insurance Coverage service offers protection to customer's items against damage, loss, or theft during transit.",
  },
  {
    title: "Escrow",
    icon: shield,
    imgAlt: "Trolley",
    description:
      "Our Escrow Service provides a secure and trusted transaction process between buyers and sellers.",
  },
  {
    title: "Other",
    icon: inventory,
    imgAlt: "Trolley",
    description: "Do you have a special request? Let us know here.",
  },
];

const Services = () => (
  <section id="services" aria-label="services">
    <div className="container">
      <h4 className="headline">OUR SERVICES</h4>

      <h2>Solutions That Move With You</h2>

      <ul className="grid gap-7.5 md:grid-cols-2 lg:grid-cols-3">
        {list.map(({ title, icon, imgAlt, description }, index) => (
          <li key={index}>
            <div className="border-[length:--spacing(5)] border-[hsl(0,0%,95%)] bg-white p-7.5">
              <div className="mb-7.5">
                <img width={70} loading="lazy" src={icon} alt={imgAlt} />
              </div>

              <h3 className="text-2xl">
                <span className="text-ax-yellow-a me-3.5 inline-block text-4xl">
                  {(index + 1).toString().padStart(2, "0")}
                </span>{" "}
                {title}
              </h3>

              <p className="my-[--spacing(2.5)_--spacing(5)] text-base text-gray-800">
                {description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Services;
