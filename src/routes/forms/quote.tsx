import { useState } from "react";
import { useFetcher } from "react-router";
import type { Route } from "./+types/quote";
import Wizard from "@components/forms/Wizard";
import { handleUserData } from "@utils/forms.server";
import PersonData, { type UserProps } from "@components/forms/PersonData";
import SinglePackage, {
  type SinglePackageOpts,
} from "@components/forms/SinglePackage";
import Addons, { type AddonsOpts } from "@components/forms/Addons";
import Destination, {
  type DestinationOpts,
} from "@components/forms/Destination";

type QuoteData = UserProps & SinglePackageOpts & AddonsOpts & DestinationOpts;

export async function action({ request }: Route.ActionArgs) {
  const data: QuoteData = await request.json();
  const result = await handleUserData(
    "quote",
    { ...data, type: "user" },
    "Quote Request",
  );

  return result;
}

export default function Quote({ actionData }: Route.ComponentProps) {
  const fetcher = useFetcher<typeof actionData>();
  const [quoteData, setQuoteData] = useState<QuoteData>({
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
              pickup,
              pickup_address,
              insurance,
              destination_state,
              destination_city,
              street_address,
            } = formState;

            return [
              {
                title: "Personal Details",
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
                      value={{ category, weight }}
                    />
                    <Addons
                      onChange={handleChange}
                      value={{ pickup, pickup_address, insurance, city }}
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
                      city,
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
