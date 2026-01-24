import { useState } from "react";
import { useFetcher } from "react-router";
import type { Route } from "./+types/delivery";
import Wizard from "@components/start-forms/Wizard";
import PersonData, {
  type UserProps,
  type RecipientProps,
} from "@components/start-forms/PersonData";
import SinglePackage, {
  type SinglePackageOpts,
} from "@components/start-forms/PackageInfo";
import Destination, {
  type DestinationOpts,
} from "@components/start-forms/Destination";
import Addons, { type AddonsOpts } from "@components/start-forms/Addons";
import { sendFormDetails } from "@services/mail.services";

export type DeliveryData = UserProps &
  RecipientProps &
  SinglePackageOpts &
  AddonsOpts &
  DestinationOpts & { __formtype: "delivery" };

export async function action({ request }: Route.ActionArgs) {
  const body = await request.json();
  const data: DeliveryData = { ...body, __formtype: "delivery" };
  const result = await sendFormDetails<DeliveryData>({
    title: "Delivery Request",
    submittedData: data,
  });

  return result;
}

export default function Delivery({ actionData }: Route.ComponentProps) {
  // Done here for typechecking purposes
  const fetcher = useFetcher<typeof actionData>();
  const [delivery, setDelivery] = useState<Omit<DeliveryData, "__formtype">>({
    fullname: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    category: "",
    weight: 0,
    size: "Parcel",
    truck_type: "Open",
    pickup: false,
    pickup_address: "",
    insurance: false,
    insurance_value: "",
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
              truck_type,
              pickup,
              pickup_address,
              insurance,
              insurance_value,
              recipient_fullname,
              recipient_email,
              recipient_phone,
              destination_state,
              destination_city,
              street_address,
            } = formState;

            return [
              {
                title: "Personal",
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
                      value={{ category, truck_type, weight, size }}
                    />
                    <Addons
                      onChange={handleChange}
                      value={{
                        pickup,
                        city,
                        pickup_address,
                        insurance,
                        insurance_value,
                      }}
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
