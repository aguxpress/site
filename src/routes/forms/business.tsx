import { useState } from "react";
import { useFetcher } from "react-router";
import type { Route } from "./+types/business";
import Wizard from "@components/ui/Wizard";
import PersonData, {
  type BusinessContactProps,
} from "@components/formParts/PersonData";
import BusinessInfo, {
  type BusinessInfoOpts,
} from "@components/formParts/BusinessInfo";
import BusinessRequest, {
  type BusinessRequestOpts,
} from "@components/formParts/BusinessRequest";
import { handleUserData } from "@utils/forms.server";

type BusinessData = BusinessContactProps &
  BusinessInfoOpts &
  BusinessRequestOpts;

export async function action({ request }: Route.ActionArgs) {
  const data: BusinessData = await request.json();
  const result = await handleUserData(
    "business",
    { ...data, type: "business" },
    "Business Partnership Enquiry",
  );

  return result;
}

export default function Business({ actionData }: Route.ComponentProps) {
  const fetcher = useFetcher<typeof actionData>();
  const [businessInfo, setBusinessInfo] = useState<BusinessData>({
    contact_fullname: "",
    contact_email: "",
    contact_phone: "",
    business_state: "",
    business_city: "",
    business_name: "",
    business_description: "",
    service_description: "",
    frequency: "",
    comments: "",
  });

  return (
    <section aria-label="business" id="business">
      <div className="container">
        <p className="headline">Send Request</p>
        <h2>Business Partnership</h2>
        <Wizard
          fetcher={fetcher}
          formState={businessInfo}
          setFormState={setBusinessInfo}
          steps={(handleChange, formState) => {
            const {
              contact_fullname,
              contact_email,
              contact_phone,
              business_state,
              business_city,
              business_name,
              business_description,
              service_description,
              frequency,
              comments,
            } = formState;
            return [
              {
                title: "Contact Info",
                subsection: (
                  <PersonData
                    onChange={handleChange}
                    value={{
                      type: "business",
                      contact_fullname,
                      contact_email,
                      contact_phone,
                      business_state,
                      business_city,
                    }}
                  />
                ),
              },
              {
                title: "Business Info",
                subsection: (
                  <BusinessInfo
                    onChange={handleChange}
                    value={{ business_name, business_description }}
                  />
                ),
              },
              {
                title: "Request",
                subsection: (
                  <BusinessRequest
                    onChange={handleChange}
                    value={{ service_description, frequency, comments }}
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
