import { useState } from "react";
import { useFetcher } from "react-router";
import Wizard from "@components/ui/Wizard";
import PersonData, { type PersonDataOpts } from "@components/forms/PersonData";
import SinglePackage, {
  type SinglePackageOpts,
} from "@components/forms/SinglePackage";
import Destination, {
  type DestinationOpts,
} from "@components/forms/Destination";
import Addons, { type AddonsOpts } from "@components/forms/Addons";
import type { Route } from "./+types/delivery";
import { handleUserData } from "@utils/forms.server";

type DeliveryData = PersonDataOpts &
  SinglePackageOpts &
  AddonsOpts &
  DestinationOpts;

export async function action({ request }: Route.ActionArgs) {
  const data: DeliveryData = await request.json();
  const result = await handleUserData(
    "delivery",
    data,
    `Delivery Request from ${data.fullname} on ${new Date().toLocaleDateString(
      "en-GB",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      },
    )}`,
  );
  return result;
}

export default function Delivery({ actionData }: Route.ComponentProps) {
  const fetcher = useFetcher<typeof actionData>();
  const [delivery, setDelivery] = useState<DeliveryData>({
    fullname: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    category: "",
    weight: 0,
    pickup: false,
    pickup_address: "",
    insurance: false,
    recipient_fullname: "",
    recipient_email: "",
    recipient_phone: "",
    destination_city: "",
    delivery_address: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.currentTarget;
    const finalValue =
      type === "checkbox" ? checked : type === "number" ? Number(value) : value;
    return setDelivery((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  };

  async function handleSubmit(formState: DeliveryData) {
    await fetcher.submit(
      { ...formState },
      {
        method: "post",
        encType: "application/json",
      },
    );
  }

  return (
    <section aria-label="delivery" id="delivery">
      <div className="container">
        <p className="headline">Send Request</p>
        <h2>Book a delivery</h2>
        <Wizard
          onChange={handleChange}
          onSubmit={handleSubmit}
          formState={delivery}
          fetcher={fetcher}
          steps={(handleChange, formState) => {
            const {
              fullname,
              email,
              phone,
              state,
              city,
              category,
              weight,
              pickup,
              pickup_address,
              insurance,
              recipient_fullname,
              recipient_email,
              recipient_phone,
              destination_city,
              delivery_address,
            } = formState;

            return [
              {
                title: "Personal Details",
                // To validate, give each forms-component a validation function, import and pass it into the steps that the button eventually calls. Use toaster to tell user problems arising
                subsection: (
                  <PersonData
                    onChange={handleChange}
                    value={{
                      type: "user",
                      fullname,
                      email,
                      phone,
                      state,
                      city,
                    }}
                  />
                ),
              },
              {
                title: "Package",
                subsection: (
                  <>
                    <SinglePackage
                      onChange={handleChange}
                      value={{ category, weight }}
                    />
                    <Addons
                      onChange={handleChange}
                      value={{ pickup, city, pickup_address, insurance }}
                    />
                  </>
                ),
              },
              {
                title: "Destination",
                subsection: (
                  <>
                    <PersonData
                      value={{
                        type: "recipient",
                        recipient_fullname,
                        recipient_email,
                        recipient_phone,
                      }}
                      onChange={handleChange}
                    />
                    <Destination
                      onChange={handleChange}
                      value={{
                        destination_city,
                        delivery_address,
                        city,
                        state,
                      }}
                    />
                  </>
                ),
              },
            ];
          }}
        />
      </div>
    </section>
  );
}
