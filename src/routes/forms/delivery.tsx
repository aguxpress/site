import { useState } from "react";
import { useFetcher } from "react-router";
import type { Route } from "./+types/delivery";
import Wizard from "@components/ui/Wizard";
import PersonData, {
  type UserProps,
  type RecipientProps,
} from "@components/formParts/PersonData";
import SinglePackage, {
  type SinglePackageOpts,
} from "@components/formParts/PackageInfo";
import Destination, {
  type DestinationOpts,
} from "@components/formParts/Destination";
import Addons, { type AddonsOpts } from "@components/formParts/Addons";
import { handleUserData } from "@utils/forms.server";

type DeliveryData = UserProps &
  RecipientProps &
  SinglePackageOpts &
  AddonsOpts &
  DestinationOpts;

export async function action({ request }: Route.ActionArgs) {
  const data: DeliveryData = await request.json();
  const result = await handleUserData(
    "delivery",
    { ...data, type: "user" },
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
  // Done here for typechecking purposes
  const fetcher = useFetcher<typeof actionData>();
  const [delivery, setDelivery] = useState<DeliveryData>({
    fullname: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    category: "",
    weight: 0,
    size: "Parcel",
    pickup: false,
    pickup_address: "",
    insurance: false,
    recipient_fullname: "",
    recipient_email: "",
    recipient_phone: "",
    destination_state: "",
    destination_city: "",
    street_address: "",
  });

  return (
    <section aria-label="delivery" id="delivery">
      <div className="container">
        <p className="headline">Send Request</p>
        <h2>Book a delivery</h2>
        <Wizard
          formState={delivery}
          setFormState={setDelivery}
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
              size,
              pickup,
              pickup_address,
              insurance,
              recipient_fullname,
              recipient_email,
              recipient_phone,
              destination_state,
              destination_city,
              street_address,
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
                      value={{ category, weight, size }}
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
                        destination_state,
                        destination_city,
                        street_address,
                        city,
                        state,
                        size,
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
