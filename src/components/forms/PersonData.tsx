import { useState } from "react";
import Label from "@components/ui/Label";
import Input from "@components/ui/Input";
import Select from "@components/ui/Select";

interface Location {
  label: string;
  value: string;
  cities: { label: string; value: string }[];
}

const locations: Location[] = [
  {
    label: "Anambra",
    value: "anambra",
    cities: [
      { label: "Awka", value: "awka" },
      { label: "Onitsha", value: "onitsha" },
      { label: "Nnewi", value: "nnewi" },
    ],
  },
  {
    label: "Enugu",
    value: "enugu",
    cities: [{ label: "Enugu", value: "enugu" }],
  },
  {
    label: "Lagos",
    value: "lagos",
    cities: [
      {
        label: "Lagos",
        value: "lagos",
      },
    ],
  },
  {
    label: "FCT",
    value: "fct",
    cities: [{ label: "Abuja", value: "abuja" }],
  },
  {
    label: "Delta",
    value: "delta",
    cities: [{ label: "Asaba", value: "asaba" }],
  },
  {
    label: "Akwa Ibom",
    value: "akwa_ibom",
    cities: [
      { label: "Uyo", value: "uyo" },
      { label: "Ikot Ekpene", value: "ikot_ekpene" },
    ],
  },
];

export default function PersonData({
  type,
  onChange,
}: {
  type?: "user" | "recipient";
  onChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void;
}) {
  const prefix = type === "recipient" ? "Recipient" : "";
  const idPrefix = prefix ? prefix + "-" : "";
  const [stateIndex, setStateIndex] = useState(0);

  return (
    <>
      <Label htmlFor={`${idPrefix}fullname`}>{prefix} Full Name</Label>
      <Input
        id={`${idPrefix}fullname`}
        name={`${idPrefix}fullname`}
        type="text"
        onChange={onChange}
        required
      />
      <div className="gap-5 md:grid md:grid-cols-2">
        <span>
          <Label htmlFor={`${idPrefix}email`}>{prefix} Email</Label>
          <Input
            id={`${idPrefix}email`}
            name={`${idPrefix}email`}
            type="email"
            onChange={onChange}
            required
          />
        </span>
        <span>
          <Label info="WhatsApp Preferred" htmlFor={`${idPrefix}phone`}>
            {prefix} Phone Number
          </Label>
          <Input
            id={`${idPrefix}phone`}
            name={`${idPrefix}phone`}
            type="tel"
            onChange={onChange}
            required
          />
        </span>
      </div>

      {!prefix && (
        <div className="gap-5 md:grid md:grid-cols-2">
          <span>
            <Label>State</Label>
            <Select
              options={locations}
              onChange={(event) => {
                setStateIndex(
                  locations.findIndex(
                    ({ value }) => value === event.currentTarget.value || 0,
                  ),
                );
                onChange(event);
              }}
            />
          </span>
          <span>
            <Label>City</Label>
            {/* If Nigeria display Options */}
            <Select
              options={locations[stateIndex].cities}
              onChange={onChange}
            />
          </span>
        </div>
      )}
    </>
  );
}
