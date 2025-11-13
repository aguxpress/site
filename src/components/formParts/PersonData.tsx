import { useRef, useState } from "react";
import Label from "@components/ui/Label";
import Input from "@components/ui/Input";
import Select from "@components/ui/Select";

export interface UserProps {
  fullname: string;
  email: string;
  phone: string;
  state: string;
  city: string;
}

export interface RecipientProps {
  recipient_fullname: string;
  recipient_email: string;
  recipient_phone: string;
}

export interface BusinessContactProps {
  contact_fullname: string;
  contact_email: string;
  contact_phone: string;
  business_state: string;
  business_city: string;
}

// So that the delivery state can contain all values

interface Location {
  state: string;
  cities: string[];
}

const locations: Location[] = [
  { state: "Anambra", cities: ["Awka", "Onitsha", "Nnewi"] },
  { state: "Enugu", cities: ["Enugu"] },
  { state: "Lagos", cities: ["Lagos"] },
  { state: "FCT", cities: ["Abuja"] },
  { state: "Delta", cities: ["Asaba"] },
  { state: "Akwa Ibom", cities: ["Uyo", "Ikot Ekpene"] },
  { state: "Rivers", cities: ["Port Harcourt"] },
  { state: "Kano", cities: ["Kano"] },
  { state: "Abia", cities: ["Aba", "Umuahia"] },
];

export default function PersonData({
  value,
  onChange,
}: {
  value:
    | ({ type: "recipient" } & RecipientProps)
    | ({ type: "user" } & UserProps)
    | ({ type: "business" } & BusinessContactProps);
  onChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void;
}) {
  const isUpdated = useRef(false);
  const isRecipient = value.type === "recipient";
  const isBusiness = value.type === "business";

  const prefix = isRecipient ? `${value.type}_` : isBusiness ? "contact_" : "";
  const businessPrefix = isBusiness ? "business_" : "";
  const [stateIndex, setStateIndex] = useState(0);

  const findStateIndex = (state: string) => {
    const index = locations.findIndex((item) => item.state === state);
    return Math.max(index, 0);
  };

  const stateValue = isBusiness
    ? value.business_state
    : !isRecipient
      ? value.state
      : "";

  if (!isRecipient && !isUpdated.current && stateValue) {
    setStateIndex(findStateIndex(stateValue));
    isUpdated.current = true;
  }

  return (
    <>
      <Label htmlFor={`${prefix}fullname`}>
        {prefix.slice(0, -1)} Full Name
      </Label>
      <Input
        id={`${prefix}fullname`}
        name={`${prefix}fullname`}
        value={
          isRecipient
            ? value.recipient_fullname
            : isBusiness
              ? value.contact_fullname
              : value.fullname
        }
        type="text"
        onChange={onChange}
        // required
      />
      <div className="gap-5 md:grid md:grid-cols-2">
        <span>
          <Label htmlFor={`${prefix}email`}>{prefix.slice(0, -1)} Email</Label>
          <Input
            id={`${prefix}email`}
            name={`${prefix}email`}
            value={
              isRecipient
                ? value.recipient_email
                : isBusiness
                  ? value.contact_email
                  : value.email
            }
            type="email"
            onChange={onChange}
            // required
          />
        </span>
        <span>
          <Label info="WhatsApp Preferred" htmlFor={`${prefix}phone`}>
            {prefix.slice(0, -1)} Phone Number
          </Label>
          <Input
            id={`${prefix}phone`}
            name={`${prefix}phone`}
            value={
              isRecipient
                ? value.recipient_phone
                : isBusiness
                  ? value.contact_phone
                  : value.phone
            }
            type="tel"
            onChange={onChange}
            // required
          />
        </span>
      </div>

      {!isRecipient && (
        <div className="gap-5 md:grid md:grid-cols-2">
          <span>
            <Label
              htmlFor={`${businessPrefix}state`}
              {...(isBusiness ? { info: "Location of the business" } : {})}
            >
              State
            </Label>
            <Select
              id={`${businessPrefix}state`}
              name={`${businessPrefix}state`}
              value={stateValue}
              options={locations.map(({ state }) => ({
                label: state,
                value: state,
              }))}
              onChange={(event) => {
                const index = event.currentTarget.selectedIndex ?? 0;
                setStateIndex(index);
                onChange(event);
                onChange({
                  currentTarget: {
                    name: `${businessPrefix}city`,
                    value: locations[index].cities[0],
                  },
                } as React.ChangeEvent<HTMLSelectElement>);
              }}
            />
          </span>
          <span>
            <Label
              htmlFor={`${businessPrefix}city`}
              {...(isBusiness
                ? { info: "City where the business is located" }
                : {})}
            >
              City
            </Label>
            <Select
              id={`${businessPrefix}city`}
              name={`${businessPrefix}city`}
              value={isBusiness ? value.business_city : value.city}
              options={locations[stateIndex].cities.map((city) => ({
                label: city,
                value: city,
              }))}
              onChange={onChange}
            />
          </span>
        </div>
      )}
    </>
  );
}
