import { useState } from "react";
import { useFetcher } from "react-router";
import type { Route } from "./+types/business";
import Wizard from "@components/start-forms/Wizard";
import PersonData, {
  type BusinessContactProps,
} from "@components/start-forms/PersonData";
import BusinessInfo, {
  type BusinessInfoOpts,
} from "@components/start-forms/BusinessInfo";
import BusinessRequest, {
  type BusinessRequestOpts,
} from "@components/start-forms/BusinessRequest";
import { sendFormDetails } from "@services/mail.services";

export type BusinessData = BusinessContactProps &
  BusinessInfoOpts &
  BusinessRequestOpts & { __formtype: "business" };

export async function action({ request }: Route.ActionArgs) {
  const body = await request.json();
  const data: BusinessData = { ...body, __formtype: "business" };
  const result = await sendFormDetails<BusinessData>({
    title: "Business Enquiry",
    submittedData: data,
  });

  return result;
}

export default function Business({ actionData }: Route.ComponentProps) {
  const fetcher = useFetcher<typeof actionData>();
  const [businessInfo, setBusinessInfo] = useState<
    Omit<BusinessData, "__formtype">
  >({
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
