import { useState } from "react";
import { useFetcher } from "react-router";
import type { Route } from "./+types/quote";
import Wizard from "@components/start-forms/Wizard";
import { sendFormDetails } from "@services/mail.services";
import PersonData, { type UserProps } from "@components/start-forms/PersonData";
import SinglePackage, {
  type SinglePackageOpts,
} from "@components/start-forms/PackageInfo";
import Addons, { type AddonsOpts } from "@components/start-forms/Addons";
import Destination, {
  type DestinationOpts,
} from "@components/start-forms/Destination";
import { seo } from "@data/seo.data";

export type QuoteData = UserProps &
  SinglePackageOpts &
  AddonsOpts &
  DestinationOpts & { __formtype: "quote" };

export const meta: Route.MetaFunction = ({
  location: { pathname },
}: Route.MetaArgs) =>
  seo({
    pathname,
    title: "Get A Quote",
    description: "Get instant price estimates for your delivery needs.",
  });

export async function action({ request }: Route.ActionArgs) {
  const body = await request.json();
  const data: QuoteData = { ...body, __formtype: "quote" };
  const result = await sendFormDetails<QuoteData>({
    title: "Quote Request",
    submittedData: data,
  });

  return result;
}

export default function Quote({ actionData }: Route.ComponentProps) {
  const fetcher = useFetcher<typeof actionData>();
  const [quoteData, setQuoteData] = useState<Omit<QuoteData, "__formtype">>({
    fullname: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    category: "",
    weight: 0,
    size: "Parcel",
    pickup: false,
    truck_type: "Open",
    pickup_address: "",
    insurance: false,
    insurance_value: "",
    destination_state: "",
    destination_city: "",
    street_address: "",
  });

  return (
    <section aria-label="quote" id="quote">
      <div className="container">
        <p className="headline">Send Request</p>
        <h2>Get A Quote</h2>
        <Wizard
          formState={quoteData}
          setFormState={setQuoteData}
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
              destination_state,
              destination_city,
              street_address,
            } = formState;

            return [
              {
                title: "Personal",
                subsection: (
                  <PersonData
                    value={{
                      type: "user",
                      fullname,
                      email,
                      phone,
                      city,
                      state,
                    }}
                    onChange={handleChange}
                  />
                ),
              },
              {
                title: "Package",
                subsection: (
                  <>
                    <SinglePackage
                      onChange={handleChange}
                      value={{ category, weight, size, truck_type }}
                    />
                    <Addons
                      onChange={handleChange}
                      value={{
                        pickup,
                        pickup_address,
                        insurance,
                        insurance_value,
                        city,
                      }}
                    />
                  </>
                ),
              },
              {
                title: "Destination",
                subsection: (
                  <Destination
                    onChange={handleChange}
                    value={{
                      destination_state,
                      destination_city,
                      street_address,
                      state,
                    }}
                  />
                ),
              },
            ];
          }}
        />
      </div>
    </section>
  );
}
