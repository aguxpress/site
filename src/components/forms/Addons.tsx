import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import Label from "@components/ui/Label";
import Input from "@components/ui/Input";
import { cn } from "@utils/display.utils";

export interface AddonsOpts {
  pickup: boolean;
  pickup_address: string;
  insurance: boolean;
  city: string;
}

interface ToggleProps {
  children: React.ReactNode;
  name: string;
  info?: string;
  id: string;
  isOpen: boolean;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

const Toggle = ({
  children,
  name,
  info,
  id,
  isOpen,
  onChange,
}: ToggleProps) => {
  return (
    <div className="mb-5 bg-gray-300 shadow-sm">
      <span
        className="flex cursor-pointer justify-between rounded-md p-4"
        onClick={() => {
          onChange({
            currentTarget: { name: id, type: "checkbox", checked: !isOpen },
          } as React.ChangeEvent<HTMLInputElement>);
        }}
      >
        <span className="flex gap-2">
          <input
            type="checkbox"
            id={id}
            name={id}
            checked={isOpen}
            className="w-6 cursor-pointer"
            onChange={onChange}
          />
          <span className="inline" onClick={(event) => event.stopPropagation()}>
            <Label info={info} htmlFor={id} className="cursor-pointer">
              {name}
            </Label>
          </span>
        </span>
        <span>
          <FaAngleDown className="text-2xl" />
        </span>
      </span>
      <div
        className={cn([
          "border-l-10 border-gray-300 bg-gray-100 p-4",
          isOpen ? "block" : "hidden",
        ])}
      >
        {children}
      </div>
    </div>
  );
};

export default function Addons({
  value,
  onChange,
}: {
  value: AddonsOpts;
  onChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void;
}) {
  return (
    <>
      <Toggle
        name="Pickup"
        info="Would you like AguXpress to come pick up the package?"
        id="pickup"
        isOpen={value.pickup}
        onChange={onChange}
      >
        <Label
          htmlFor="pickup_address"
          info={`Make sure this address is in ${value.city}`}
        >
          Pickup Address
        </Label>
        <Input
          id="pickup_address"
          name="pickup_address"
          variant="textarea"
          value={value.pickup_address}
          onChange={onChange}
        />
      </Toggle>
      <Toggle
        name="Insurance"
        info="Recommended"
        id="insurance"
        isOpen={value.insurance}
        onChange={onChange}
      >
        Thank you for insuring your package
      </Toggle>
    </>
  );
}
