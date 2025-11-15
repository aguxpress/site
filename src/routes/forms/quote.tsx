import { useState } from "react";
import { useFetcher } from "react-router";
import type { Route } from "./+types/quote";
import Wizard from "@components/ui/Wizard";
import { handleUserData } from "@utils/forms.server";
import PersonData, { type UserProps } from "@components/formParts/PersonData";
import SinglePackage, {
  type SinglePackageOpts,
} from "@components/formParts/PackageInfo";
import Addons, { type AddonsOpts } from "@components/formParts/Addons";
import Destination, {
  type DestinationOpts,
} from "@components/formParts/Destination";

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
    size: "Parcel",
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
              size,
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
                      value={{ category, weight, size }}
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
