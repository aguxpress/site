import { Heading, render, Html } from "@react-email/components";
import type { StartFormFields } from "@/types/start.types";
import type { QuoteData } from "src/routes/start/quote";
import type { Relocation } from "src/routes/start/relocation";
import type { BusinessData } from "src/routes/start/business";
import { startFormFieldsDesc } from "@data/start.data";
import type { DeliveryData } from "src/routes/start/delivery";

interface GroupProps<T> {
  title: string;
  fields: T;
  block?: Array<keyof T>;
}

function Group<T extends Partial<StartFormFields>>({
  title,
  fields,
  block,
}: GroupProps<T>) {
  return (
    <>
      <Heading as="h3">{title}</Heading>
      {Object.entries(fields).map(([key, value]) => {
        // const isBlock = Boolean(block?.includes(key as keyof T));
        const fieldTextName = startFormFieldsDesc[key as keyof StartFormFields];

        return (
          <>
            {/* {isBlock ? (
              <>
                <span>{fieldTextName}</span>
                <br />
                <span>{value}</span>
              </>
            ) : ( */}
            <>
              <div>
                {fieldTextName}: <strong>{value}</strong>
              </div>
            </>
            {/* )} */}
          </>
        );
      })}
    </>
  );
}

const generateHTML = async <
  T extends QuoteData | Relocation | BusinessData | DeliveryData,
>(
  data: T,
) => {
  const groups: Array<React.ReactNode> = [];
  if (data.__formtype !== "business") {
    const { fullname, email, phone, state, city } = data;
    groups.push(
      <Group
        title="Personal Details"
        fields={{
          fullname,
          email,
          phone,
          state,
          city,
        }}
      />,
    );
  } else {
    const {
      contact_fullname,
      contact_email,
      contact_phone,
      business_state,
      business_city,
      business_name,
      business_description,
    } = data;
    groups.push(
      <Group
        title="Business Details"
        fields={{
          contact_fullname,
          contact_email,
          contact_phone,
          business_state,
          business_city,
          business_name,
          business_description,
        }}
        block={["business_description"]}
      />,
    );
  }

  if (data.__formtype === "business") {
    const { service_description, frequency, comments } = data;
    groups.push(
      <Group
        title="Service Request"
        fields={{
          service_description,
          comments,
          frequency,
        }}
        block={["service_description", "comments"]}
      />,
    );
  }

  if (data.__formtype === "delivery" || data.__formtype === "quote") {
    const { category, size, weight, truck_type } = data;
    groups.push(
      <Group
        title="Package Information"
        fields={{
          category,
          size,
          ...(size === "Parcel" ? { weight } : { truck_type }),
        }}
      />,
    );
  }

  if (data.__formtype === "delivery" || data.__formtype === "quote") {
    const { pickup, pickup_address, insurance, insurance_value } = data;
    groups.push(
      <Group
        title="Additional Services"
        fields={{
          pickup,
          ...(pickup && { pickup_address }),
          insurance,
          // Eventually prettify this when you get the chance to
          insurance_value: Number(insurance_value).toLocaleString(),
        }}
        block={["pickup_address"]}
      />,
    );
  }

  if (data.__formtype === "delivery") {
    const { recipient_fullname, recipient_email, recipient_phone } = data;
    groups.push(
      <Group
        title="Recipient Information"
        fields={{
          recipient_fullname,
          recipient_email,
          recipient_phone,
        }}
      />,
    );
  }

  if (data.__formtype !== "business") {
    const { destination_state, destination_city, street_address } = data;
    groups.push(
      <Group
        title="Destination"
        fields={{
          destination_state,
          destination_city,
          street_address,
        }}
        block={["street_address"]}
      />,
    );
  }

  if (data.__formtype === "relocation") {
    const { home_size, home_floor, relocation_date, pickup_address } = data;
    groups.push(
      <Group
        title="Home Information"
        fields={{
          home_size,
          home_floor,
          relocation_date,
          pickup_address,
        }}
        block={["pickup_address"]}
      />,
    );
  }

  if (data.__formtype === "relocation") {
    const {
      beds,
      sofas,
      tables,
      fridges,
      washing_machines,
      big_drums,
      large_items,
    } = data;
    groups.push(
      <Group
        title="Items to Move"
        fields={{
          beds,
          sofas,
          tables,
          fridges,
          washing_machines,
          big_drums,
          large_items,
        }}
        block={["large_items"]}
      />,
    );
  }

  if (data.__formtype === "relocation") {
    const {
      truck_size,
      truck_type,
      insurance,
      covered_items,
      labourers,
      budget,
      comments,
    } = data;
    groups.push(
      <Group
        title="Moving Instructions"
        fields={{
          truck_size,
          truck_type,
          insurance,
          ...(insurance && { covered_items }),
          labourers,
          ...(budget && { budget }),
          comments,
        }}
        block={["covered_items", "comments"]}
      />,
    );
  }

  return await render(<Html lang="en">{groups}</Html>);
};

export { generateHTML };
