import { useEffect, useState } from "react";
import Label from "@components/ui/Label";
import Input from "@components/ui/Input";
import Select from "@components/ui/Select";

interface UserProps {
  fullname: string;
  email: string;
  phone: string;
  state: string;
  city: string;
}

interface RecipientProps {
  recipient_fullname?: string;
  recipient_email?: string;
  recipient_phone?: string;
}

interface BusinessContactProps {
  contact_fullname: string;
  contact_email: string;
  contact_phone: string;
  business_state: string;
  business_city: string;
}

// So that the delivery state can contain all values
export type PersonDataOpts = UserProps & RecipientProps;

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
  const prefix =
    value.type === "user"
      ? ""
      : value.type === "business"
        ? "contact_"
        : `${value.type}_`;
  const [stateIndex, setStateIndex] = useState(0);

  const findStateIndex = (state: string) => {
    const index = locations.findIndex((item) => item.state === state);
    return Math.max(index, 0);
  };

  const stateValue = isUser ? value.state : "";

  useEffect(() => {
    if (!isRecipient) {
      onChange({
        currentTarget: {
          name: "city",
          value: locations[findStateIndex(value.state)].cities.includes(
            value.city,
          )
            ? value.city
            : locations[stateIndex].cities[0],
        },
      } as React.ChangeEvent<HTMLSelectElement>);
    }
  }, [stateIndex, stateValue]);

  return (
    <>
      <Label htmlFor={`${prefix}fullname`}>
        {prefix.slice(0, -1)} Full Name
      </Label>
      <Input
        id={`${prefix}fullname`}
        name={`${prefix}fullname`}
        value={
          value.type === "user"
            ? value.fullname
            : value.type === "business"
              ? value.contact_fullname
              : value.recipient_fullname
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
            value={isRecipient ? value.recipient_email : value.email}
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
            value={isRecipient ? value.recipient_phone : value.phone}
            type="tel"
            onChange={onChange}
            // required
          />
        </span>
      </div>

      {!isRecipient && (
        <div className="gap-5 md:grid md:grid-cols-2">
          <span>
            <Label htmlFor="state">State</Label>
            <Select
              id="state"
              name="state"
              value={value.state}
              options={locations.map(({ state }) => ({
                label: state,
                value: state,
              }))}
              onChange={(event) => {
                setStateIndex(findStateIndex(event.currentTarget.value));
                onChange(event);
              }}
            />
          </span>
          <span>
            <Label htmlFor="city">City</Label>
            <Select
              id="city"
              name="city"
              value={value.city}
              options={locations[
                stateIndex || findStateIndex(value.state)
              ].cities.map((city) => ({
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
