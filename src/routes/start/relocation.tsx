import { useState } from "react";
import { useFetcher } from "react-router";
import type { Route } from "./+types/relocation";
import Wizard from "@components/start-forms/Wizard";
import PersonData, { type UserProps } from "@components/start-forms/PersonData";
import HomeInfo, { type HomeInfoOpts } from "@components/start-forms/HomeInfo";
import HomeItems, {
  type HomeItemsOpts,
} from "@components/start-forms/HomeItems";
import MovingInstructions, {
  type MovingInstructionsOpts,
} from "@components/start-forms/MovingInstructions";
import Destination, {
  type DestinationOpts,
} from "@components/start-forms/Destination";
import { sendFormDetails } from "@services/mail.services";
import { seo } from "@data/seo.data";

export type Relocation = DestinationOpts &
  UserProps &
  HomeInfoOpts &
  HomeItemsOpts &
  MovingInstructionsOpts & { __formtype: "relocation" };

export const meta: Route.MetaFunction = ({
  location: { pathname },
}: Route.MetaArgs) =>
  seo({
    pathname,
    title: "Relocation Service",
    description: "Secure relocation services for homes and offices",
  });

export async function action({ request }: Route.ActionArgs) {
  const body = await request.json();
  const data: Relocation = { ...body, __formtype: "relocation" };
  const result = await sendFormDetails<Relocation>({
    title: "Relocation Request",
    submittedData: data,
  });

  return result;
}

export default function Relocation({ actionData }: Route.ComponentProps) {
  const fetcher = useFetcher<typeof actionData>();
  const [relocationData, setRelocationData] = useState<
    Omit<Relocation, "__formtype">
  >({
    fullname: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    destination_state: "",
    destination_city: "",
    street_address: "",
    home_size: "",
    home_floor: "",
    pickup_address: "",
    relocation_date: "",
    beds: 0,
    fridges: 0,
    sofas: 0,
    tables: 0,
    washing_machines: 0,
    big_drums: 0,
    large_items: "",
    insurance: false,
    covered_items: "",
    labourers: false,
    truck_size: "Small",
    truck_type: "Open",
    budget: undefined,
    comments: "",
  });

  return (
    <section aria-label="relocation" id="relocation">
      <div className="container">
        <p className="headline">Send Request</p>
        <h2>Schedule your relocation</h2>
        <Wizard
          formState={relocationData}
          setFormState={setRelocationData}
          fetcher={fetcher}
          steps={(handleChange, formState) => {
            const {
              fullname,
              email,
              phone,
              city,
              state,
              destination_city,
              street_address,
              destination_state,
              home_size,
              home_floor,
              pickup_address,
              relocation_date,
              beds,
              fridges,
              sofas,
              tables,
              washing_machines,
              big_drums,
              large_items,
              insurance,
              covered_items,
              labourers,
              truck_size,
              truck_type,
              budget,
              comments,
            } = formState;

            return [
              {
                title: "Personal",
                subsection: (
                  <PersonData
                    onChange={handleChange}
                    value={{
                      type: "user",
                      fullname,
                      email,
                      phone,
                      city,
                      state,
                    }}
                  />
                ),
              },
              {
                title: "Location",
                subsection: (
                  <>
                    <HomeInfo
                      onChange={handleChange}
                      value={{
                        home_size,
                        home_floor,
                        pickup_address,
                        relocation_date,
                      }}
                    />
                    <Destination
                      onChange={handleChange}
                      value={{
                        // city,
                        destination_city,
                        street_address,
                        destination_state,
                        state,
                      }}
                    />
                  </>
                ),
              },
              {
                title: "Items",
                subsection: (
                  <HomeItems
                    onChange={handleChange}
                    value={{
                      beds,
                      fridges,
                      sofas,
                      tables,
                      washing_machines,
                      big_drums,
                      large_items,
                    }}
                  />
                ),
              },
              {
                title: "Instructions",
                subsection: (
                  <MovingInstructions
                    value={{
                      insurance,
                      covered_items,
                      labourers,
                      truck_size,
                      truck_type,
                      budget,
                      comments,
                    }}
                    onChange={handleChange}
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
